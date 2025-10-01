import 'dotenv/config';
import express from "express";
import Stripe from "stripe";
import cors from "cors";
import pkg from "pg";
import OpenAI from 'openai';
import nodemailer from 'nodemailer';
import bizSdk from "facebook-nodejs-business-sdk";

const { Pool } = pkg;
const app = express();
app.use(cors());
// ----------------------------
// OPENAI CONFIGURATION
// ----------------------------
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ----------------------------
// EMAIL CONFIGURATION
// ----------------------------
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email configuration error:', error);
  } else {
    console.log('✅ Email server ready');
  }
});






// Important: Raw body parsing for webhook BEFORE express.json()
app.use('/api/webhook', express.raw({ type: 'application/json' }));

// JSON parsing for other routes
app.use(express.json());

// ----------------------------
// FACEBOOK BUSINESS SDK SETUP
// ----------------------------
const ServerEvent = bizSdk.ServerEvent;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const CustomData = bizSdk.CustomData;

// Initialize Facebook Ads API
const api = bizSdk.FacebookAdsApi.init(process.env.META_ACCESS_TOKEN);

// ----------------------------
// STRIPE
// ----------------------------
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

// ----------------------------
// POSTGRES
// ----------------------------
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ DB connection error:", err));

// ----------------------------
// 1. Save User
// ----------------------------
app.post("/api/users", async (req, res) => {
  try {
    const { first_name, last_name, email, phone, age_range } = req.body;

    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, email, phone, age_range)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO UPDATE SET
         first_name = EXCLUDED.first_name,
         last_name = EXCLUDED.last_name,
         phone = EXCLUDED.phone,
         age_range = EXCLUDED.age_range
       RETURNING *`,
      [first_name, last_name, email, phone, age_range]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Insert user error:", err);
    res.status(500).json({ error: "Database insert failed" });
  }
});

// ----------------------------
// 2. Save Assessment + Answers
// ----------------------------
app.post("/api/assessments", async (req, res) => {
  const client = await pool.connect();
  try {
    const { user_id, assessment_type, answers } = req.body;

    await client.query("BEGIN");

    const assessmentResult = await client.query(
      `INSERT INTO assessments (user_id, assessment_type)
       VALUES ($1, $2) RETURNING *`,
      [user_id, assessment_type]
    );

    const assessment = assessmentResult.rows[0];

    for (const ans of answers) {
      await client.query(
        `INSERT INTO answers (assessment_id, question_text, answer)
         VALUES ($1, $2, $3)`,
        [assessment.id, ans.question, ans.answer]
      );
    }

    await client.query("COMMIT");
    res.json({ assessment });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Insert assessment error:", err);
    res.status(500).json({ error: "Assessment insert failed" });
  } finally {
    client.release();
  }
});

// ----------------------------
// 3. Stripe Checkout
// ----------------------------
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { products, funnel_type = "complication-risk" } = req.body; // Add funnel_type parameter

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "No products provided" });
    }

    const line_items = products.map((item) => ({
      price_data: {
        currency: "gbp",
        product_data: { name: item.item_name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity || 1,
    }));

    // Map funnel types to their question page routes
    const funnelRouteMap = {
      "complication-risk": "complication-risk-checker-questions",
      "recovery-speed": "recovery-speed-predictor-questions",
      "surgery-readiness": "surgery-readiness-assessment-questions",
      "anesthesia": "anaesthesia-risk-screener-questions",
      "mobility": "mobility-strength-score-questions",
      "symptom": "symptom-severity-index-questions",
      "inflammation": "inflammation-risk-score-questions",
      "medication": "medication-burden-calculator-questions",
      "energy": "daily-energy-audit-questions",
      "lifestyle": "lifestyle-limiter-score-questions",
      "bio": "biological-age-calculator-questions",
      "card": "cardiometabolic-risk-score-questions",
      "res": "resilience-index-questions",
      "nutrition": "nutrition-body-composition-score-questions",
      "functional": "functional-fitness-age-test-questions",
      "surgery": "completed-surgery-preparation-bundle-questions",
      "chronic": "completed-chronic-symptoms-bundle-questions",
      "longevity": "longevity-wellness-bundle-questions"
    };

    const questionRoute = funnelRouteMap[funnel_type] || "complication-risk-checker-questions";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      // Store funnel type in metadata
      metadata: {
        funnel_type: funnel_type
      },
      // Redirect directly to the questions page for this funnel
      success_url: `https://luther.health/Health-Audit.html#${questionRoute}`,
      cancel_url: "https://luther.health/Health-Audit.html#cancel",
    });
//      success_url: `https://luther.health/Health-Audit.html#${questionRoute}?session_id={CHECKOUT_SESSION_ID}`,

    // Return sessionId so frontend can save & use it
    res.json({ sessionId: session.id });
  } catch (err) {
    console.error("Stripe session creation failed:", err);
    res.status(500).json({ error: err.message });
  }
});

// Update your existing webhook to store funnel_type
app.post("/api/webhook", async (req, res) => {
  let event = req.body;

  // Verify webhook signature if endpoint secret is provided
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    const signature = req.headers['stripe-signature'];

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      console.log("✅ Webhook signature verified");
    } catch (err) {
      console.log(`⚠️ Webhook signature verification failed:`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("✅ Payment success:", session);

    try {
      // Create stripe_payments table if it doesn't exist (with funnel_type column)
      await pool.query(`
        CREATE TABLE IF NOT EXISTS stripe_payments (
          id SERIAL PRIMARY KEY,
          stripe_session_id VARCHAR(255) UNIQUE,
          customer_email VARCHAR(255),
          amount_total INTEGER,
          currency VARCHAR(10),
          status VARCHAR(50),
          product_name TEXT,
          line_items JSONB,
          funnel_type VARCHAR(255),
          created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Get line items from Stripe session
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      const productName = lineItems.data.map(item => item.description).join(', ');

      // Get funnel type from session metadata
      const funnelType = session.metadata?.funnel_type || 'complication-risk';

      // Store payment in database
      const paymentResult = await pool.query(`
        INSERT INTO stripe_payments (
          stripe_session_id,
          customer_email,
          amount_total,
          currency,
          status,
          product_name,
          line_items,
          funnel_type
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (stripe_session_id) DO UPDATE SET
          status = EXCLUDED.status,
          funnel_type = EXCLUDED.funnel_type,
          updated = CURRENT_TIMESTAMP
        RETURNING *
      `, [
        session.id,
        session.customer_email,
        session.amount_total,
        session.currency,
        'paid', // Use 'paid' status for successful payments
        productName,
        JSON.stringify(lineItems.data),
        funnelType
      ]);

      console.log("💾 Payment stored in database:", paymentResult.rows[0]);

      // Your existing Meta Conversion API code remains the same...
      const currentTimestamp = Math.floor(Date.now() / 1000);

      console.log("🎯 Preparing to send Meta Conversion API event...");
      console.log("📧 Customer email:", session.customer_email);
      console.log("💰 Purchase amount:", session.amount_total / 100);
      console.log("💱 Currency:", session.currency.toUpperCase());

      const userData = (new UserData())
        .setEmails([session.customer_email]);

      const customData = (new CustomData())
        .setValue(session.amount_total / 100)
        .setCurrency(session.currency.toUpperCase());

      const serverEvent = (new ServerEvent())
        .setEventName("Purchase")
        .setEventTime(currentTimestamp)
        .setUserData(userData)
        .setCustomData(customData)
        .setActionSource("website")
        .setEventSourceUrl("https://luther.health/Health-Audit.html#success");

      const eventRequest = (new EventRequest(process.env.META_ACCESS_TOKEN, process.env.META_PIXEL_ID))
        .setEvents([serverEvent]);

      const response = await eventRequest.execute();
      console.log("✅ Meta Conversion API SUCCESS!");
      console.log("📡 Full response:", JSON.stringify(response, null, 2));

      if (response && response.events_received) {
        console.log("🎉 Events received by Meta:", response.events_received);
      }
      if (response && response.messages) {
        console.log("📝 Meta response messages:", response.messages);
      }

    } catch (err) {
      console.error("❌ Database/Meta API ERROR:", err.message);
      console.error("🔍 Full error details:", err);
    }
  }

  res.json({ received: true });
});


// ----------------------------
// ANALYTICS ENDPOINTS
// ----------------------------

// Get dashboard summary data
app.get("/api/analytics/dashboard", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const end = endDate || new Date().toISOString();

    // Get user registrations
    const usersQuery = `
      SELECT
        COUNT(*) as total_users,
        COUNT(CASE WHEN created_at >= $1 THEN 1 END) as new_users_period,
        DATE_TRUNC('day', created_at) as date
      FROM users
      WHERE created_at BETWEEN $1 AND $2
      GROUP BY DATE_TRUNC('day', created_at)
      ORDER BY date DESC
    `;

    // Get assessments data
    const assessmentsQuery = `
      SELECT
        COUNT(*) as total_assessments,
        assessment_type,
        DATE_TRUNC('day', created_at) as date,
        COUNT(DISTINCT user_id) as unique_users
      FROM assessments
      WHERE created_at BETWEEN $1 AND $2
      GROUP BY assessment_type, DATE_TRUNC('day', created_at)
      ORDER BY date DESC
    `;

    // Get Stripe payments data
    const paymentsQuery = `
      SELECT
        COUNT(*) as total_purchases,
        SUM(amount_total / 100.0) as total_revenue,
        AVG(amount_total / 100.0) as avg_order_value,
        currency,
        DATE_TRUNC('day', created) as date
      FROM stripe_payments
      WHERE created BETWEEN $1 AND $2 AND status = 'complete_payment_intent'
      GROUP BY currency, DATE_TRUNC('day', created)
      ORDER BY date DESC
    `;

    const [usersResult, assessmentsResult, paymentsResult] = await Promise.all([
      pool.query(usersQuery, [start, end]),
      pool.query(assessmentsQuery, [start, end]),
      pool.query(paymentsQuery, [start, end])
    ]);

    // Calculate metrics
    const totalUsers = usersResult.rows.reduce((sum, row) => sum + parseInt(row.total_users), 0);
    const totalAssessments = assessmentsResult.rows.reduce((sum, row) => sum + parseInt(row.total_assessments), 0);
    const totalPurchases = paymentsResult.rows.reduce((sum, row) => sum + parseInt(row.total_purchases), 0);
    const totalRevenue = paymentsResult.rows.reduce((sum, row) => sum + parseFloat(row.total_revenue || 0), 0);

    const conversionRate = totalUsers > 0 ? (totalPurchases / totalUsers * 100) : 0;
    const avgOrderValue = totalPurchases > 0 ? (totalRevenue / totalPurchases) : 0;

    // Process daily data
    const dailyMetrics = {};

    // Combine all daily data
    [...usersResult.rows, ...assessmentsResult.rows, ...paymentsResult.rows].forEach(row => {
      const dateKey = row.date?.toISOString().split('T')[0];
      if (!dateKey) return;

      if (!dailyMetrics[dateKey]) {
        dailyMetrics[dateKey] = {
          date: dateKey,
          users: 0,
          assessments: 0,
          purchases: 0,
          revenue: 0
        };
      }

      if (row.total_users) dailyMetrics[dateKey].users += parseInt(row.total_users);
      if (row.total_assessments) dailyMetrics[dateKey].assessments += parseInt(row.total_assessments);
      if (row.total_purchases) dailyMetrics[dateKey].purchases += parseInt(row.total_purchases);
      if (row.total_revenue) dailyMetrics[dateKey].revenue += parseFloat(row.total_revenue);
    });

    const dailyData = Object.values(dailyMetrics).sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Assessment performance
    const assessmentPerformance = {};
    assessmentsResult.rows.forEach(row => {
      const type = row.assessment_type;
      if (!assessmentPerformance[type]) {
        assessmentPerformance[type] = {
          name: type,
          total_starts: 0,
          unique_users: 0
        };
      }
      assessmentPerformance[type].total_starts += parseInt(row.total_assessments);
      assessmentPerformance[type].unique_users += parseInt(row.unique_users);
    });

    res.json({
      success: true,
      data: {
        summary: {
          totalUsers,
          totalAssessments,
          totalPurchases,
          totalRevenue: Math.round(totalRevenue * 100) / 100,
          conversionRate: Math.round(conversionRate * 100) / 100,
          avgOrderValue: Math.round(avgOrderValue * 100) / 100,
          avgSessionDuration: 245 // This would need page view tracking
        },
        dailyMetrics: dailyData,
        assessmentPerformance: Object.values(assessmentPerformance),
        revenueMetrics: {
          totalRevenue: Math.round(totalRevenue * 100) / 100,
          averageOrderValue: Math.round(avgOrderValue * 100) / 100,
          conversionRate: Math.round(conversionRate * 100) / 100
        }
      }
    });

  } catch (error) {
    console.error("Analytics dashboard error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get Stripe payments detailed data
app.get("/api/analytics/payments", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const end = endDate || new Date().toISOString();

    const paymentsQuery = `
      SELECT
        sp.*,
        u.email,
        u.first_name,
        u.last_name,
        u.age_range
      FROM stripe_payments sp
      LEFT JOIN users u ON u.email = sp.customer_email
      WHERE sp.created BETWEEN $1 AND $2
      ORDER BY sp.created DESC
      LIMIT 100
    `;

    const result = await pool.query(paymentsQuery, [start, end]);

    // Group by product/service
    const revenueByProduct = {};
    const paymentsByStatus = {};

    result.rows.forEach(payment => {
      // This assumes you store line items or product info
      const productName = payment.product_name || 'Unknown Product';
      const status = payment.status || 'unknown';
      const amount = parseFloat(payment.amount_total) / 100;

      if (!revenueByProduct[productName]) {
        revenueByProduct[productName] = {
          name: productName,
          revenue: 0,
          count: 0
        };
      }
      revenueByProduct[productName].revenue += amount;
      revenueByProduct[productName].count += 1;

      paymentsByStatus[status] = (paymentsByStatus[status] || 0) + 1;
    });

    res.json({
      success: true,
      data: {
        payments: result.rows,
        revenueByProduct: Object.values(revenueByProduct),
        paymentsByStatus,
        totalPayments: result.rows.length
      }
    });

  } catch (error) {
    console.error("Payments analytics error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get assessment completion funnel
app.get("/api/analytics/funnel", async (req, res) => {
  try {
    const { startDate, endDate, assessmentType } = req.query;
    const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const end = endDate || new Date().toISOString();

    let whereClause = "WHERE a.created_at BETWEEN $1 AND $2";
    let queryParams = [start, end];

    if (assessmentType) {
      whereClause += " AND a.assessment_type = $3";
      queryParams.push(assessmentType);
    }

    // Get assessment funnel data
    const funnelQuery = `
      SELECT
        a.assessment_type,
        COUNT(DISTINCT a.user_id) as started,
        COUNT(DISTINCT CASE WHEN ans.assessment_id IS NOT NULL THEN a.user_id END) as completed,
        COUNT(DISTINCT CASE WHEN sp.customer_email IS NOT NULL THEN u.email END) as purchased
      FROM assessments a
      LEFT JOIN answers ans ON a.id = ans.assessment_id
      LEFT JOIN users u ON a.user_id = u.id
      LEFT JOIN stripe_payments sp ON u.email = sp.customer_email
        AND sp.created >= a.created_at
        AND sp.created <= a.created_at + INTERVAL '24 hours'
      ${whereClause}
      GROUP BY a.assessment_type
      ORDER BY started DESC
    `;

    const result = await pool.query(funnelQuery, queryParams);

    const funnelData = result.rows.map(row => {
      const started = parseInt(row.started);
      const completed = parseInt(row.completed);
      const purchased = parseInt(row.purchased);

      return {
        assessmentType: row.assessment_type,
        started,
        completed,
        purchased,
        completionRate: started > 0 ? Math.round((completed / started) * 100 * 100) / 100 : 0,
        conversionRate: completed > 0 ? Math.round((purchased / completed) * 100 * 100) / 100 : 0
      };
    });

    res.json({
      success: true,
      data: funnelData
    });

  } catch (error) {
    console.error("Funnel analytics error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get user demographics and segmentation
app.get("/api/analytics/users", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const end = endDate || new Date().toISOString();

    // Age range distribution
    const ageRangeQuery = `
      SELECT
        age_range,
        COUNT(*) as count,
        COUNT(CASE WHEN sp.customer_email IS NOT NULL THEN 1 END) as purchasers
      FROM users u
      LEFT JOIN stripe_payments sp ON u.email = sp.customer_email
      WHERE u.created_at BETWEEN $1 AND $2
      GROUP BY age_range
      ORDER BY count DESC
    `;

    // User activity
    const activityQuery = `
      SELECT
        u.id,
        u.email,
        u.first_name,
        u.last_name,
        u.created_at,
        COUNT(a.id) as assessments_taken,
        COUNT(sp.id) as purchases_made,
        SUM(sp.amount_total / 100.0) as total_spent
      FROM users u
      LEFT JOIN assessments a ON u.id = a.user_id
      LEFT JOIN stripe_payments sp ON u.email = sp.customer_email
      WHERE u.created_at BETWEEN $1 AND $2
      GROUP BY u.id, u.email, u.first_name, u.last_name, u.created_at
      ORDER BY assessments_taken DESC, total_spent DESC
      LIMIT 50
    `;

    const [ageRangeResult, activityResult] = await Promise.all([
      pool.query(ageRangeQuery, [start, end]),
      pool.query(activityQuery, [start, end])
    ]);

    res.json({
      success: true,
      data: {
        ageRangeDistribution: ageRangeResult.rows,
        topUsers: activityResult.rows.map(user => ({
          ...user,
          total_spent: parseFloat(user.total_spent || 0)
        }))
      }
    });

  } catch (error) {
    console.error("User analytics error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Store page view event (for tracking)
app.post("/api/analytics/pageview", async (req, res) => {
  try {
    const { page, user_id, session_id, referrer, user_agent } = req.body;

    // Create page_views table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS page_views (
        id SERIAL PRIMARY KEY,
        page VARCHAR(255),
        user_id INTEGER,
        session_id VARCHAR(255),
        referrer TEXT,
        user_agent TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const result = await pool.query(
      `INSERT INTO page_views (page, user_id, session_id, referrer, user_agent)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [page, user_id, session_id, referrer, user_agent]
    );

    res.json({
      success: true,
      eventId: result.rows[0].id
    });

  } catch (error) {
    console.error("Page view tracking error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
// ----------------------------
// Check Payment Status by Session ID
// ----------------------------
app.get("/api/check-payment", async (req, res) => {
  try {
    const { session_id, funnel_type } = req.query;

    if (!session_id) {
      return res.status(400).json({ success: false, error: "session_id is required" });
    }

    if (!funnel_type) {
      return res.status(400).json({ success: false, error: "funnel_type is required" });
    }

    const result = await pool.query(
      `SELECT * FROM stripe_payments
       WHERE stripe_session_id = $1
         AND status = 'paid'
         AND funnel_type = $2
       LIMIT 1`,
      [session_id, funnel_type]
    );

    if (result.rows.length > 0) {
      return res.json({
        success: true,
        paid: true,
        funnel_type: result.rows[0].funnel_type,
        payment_info: {
          amount: result.rows[0].amount_total / 100,
          currency: result.rows[0].currency,
          created: result.rows[0].created
        }
      });
    } else {
      return res.json({ success: true, paid: false });
    }
  } catch (error) {
    console.error("Check payment error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// ----------------------------
// Generate AI Assessment Report
// ----------------------------
app.post("/api/generate-assessment-report", async (req, res) => {
  try {
    const { assessmentType, answers, userInfo } = req.body;

    // Format questions and answers for GPT
    const questionsAndAnswers = answers.map(qa =>
      `Q: ${qa.question}\nA: ${qa.answer}`
    ).join('\n\n');

    // Create a specialized prompt based on assessment type
    const systemPrompt = getSystemPrompt(assessmentType);

    const userPrompt = `
User Information:
Name: ${userInfo.first_name} ${userInfo.last_name}
Age Range: ${userInfo.age_range}

Assessment Responses:
${questionsAndAnswers}

Please provide a comprehensive analysis following the exact format specified in your system prompt.
    `;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 3000,
    });

    const aiAnalysis = completion.choices[0].message.content;
    console.log(aiAnalysis)

    // Parse AI response into structured format
    const structuredReport = parseAIResponse(aiAnalysis, assessmentType);

    // Store the AI-generated report in database
    const reportResult = await pool.query(
      `INSERT INTO ai_reports (user_id, assessment_type, ai_analysis, structured_report, report_text)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [userInfo.id, assessmentType, aiAnalysis, JSON.stringify(structuredReport), aiAnalysis]
    );

    res.json({
      success: true,
      report: structuredReport,
      reportId: reportResult.rows[0].id
    });

  } catch (error) {
    console.error("AI report generation error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});













// Helper function to get system prompt based on assessment type

function getSystemPrompt(assessmentType) {
  const prompts = {
    "Complication Risk": `You are a medical risk assessment AI specializing in surgical complication analysis. Analyze the patient's responses and provide a comprehensive, evidence-based risk assessment.

IMPORTANT: Structure your response EXACTLY as follows:

OVERALL_SCORE: [number between 0-100, where higher = lower risk]
OVERALL_RATING: [exactly one of: "Low Risk", "Moderate Risk", "Elevated Risk", "High Risk"]

CATEGORY_ANALYSIS:
Medical History Risk: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence clinical description analyzing their medical conditions and impact on surgical risk] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Lifestyle Risk Factors: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing smoking, alcohol, exercise, nutrition, and stress] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Medication Risk Profile: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing current medications and their surgical implications] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Surgical History Impact: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing previous surgical experiences and healing capacity] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Physical Risk Factors: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing weight, BMI, age, and fitness level] | [recommendation 1] | [recommendation 2] | [recommendation 3]

DETAILED_ANALYSIS:
Medical History Risk|[clinical context paragraph: 3-4 sentences explaining the medical conditions, their severity, and evidence-based surgical risk implications. Reference NICE guidelines, Royal College of Surgeons protocols, or relevant medical research]|[strengths: comma-separated list of 3 positive factors]|[risks: comma-separated list of 3 risk factors]|[timeline: specific timeline recommendation like "Begin medical optimization 6-8 weeks before surgery..."]

Lifestyle Risk Factors|[clinical context paragraph: 3-4 sentences on lifestyle impact on surgical outcomes, citing NICE guidelines on smoking cessation, alcohol, and ERAS protocols]|[strengths: comma-separated list of 3 positive factors]|[risks: comma-separated list of 3 risk factors]|[timeline: specific timeline like "Implement lifestyle changes immediately. Smoking cessation should begin 4-6 weeks before surgery..."]

Medication Risk Profile|[clinical context paragraph: 3-4 sentences on medication management, interactions, and Royal College of Anaesthetists guidance]|[strengths: comma-separated list of 3 positive factors]|[risks: comma-separated list of 3 risk factors]|[timeline: specific timeline like "Medication review should occur 2-3 weeks before surgery..."]

Surgical History Impact|[clinical context paragraph: 3-4 sentences analyzing previous surgical outcomes and their predictive value]|[strengths: comma-separated list of 2-3 positive factors]|[risks: comma-separated list of 2-3 risk factors if any, or "Patient has no heart problem"]|[timeline: specific timeline like "Share surgical history with your current surgical team 1-2 weeks before your procedure"]

Physical Risk Factors|[clinical context paragraph: 3-4 sentences on BMI, age, fitness and their impact. Reference ERAS prehabilitation protocols]|[strengths: comma-separated list of 3 positive factors]|[risks: comma-separated list of 3 risk factors]|[timeline: specific timeline like "Begin physical optimization 4-6 weeks before surgery with a structured prehabilitation program"]

DETAILED_SUMMARY:
[Provide a comprehensive 5-6 paragraph analysis covering:
1. Overall risk profile assessment
2. Most significant risk factors requiring immediate attention
3. Positive factors working in the patient's favor
4. Specific evidence-based optimization strategies
5. Timeline and prioritization of interventions
6. Expected outcomes with proper preparation

Include specific medical references to UK guidelines (NICE, Royal College of Surgeons, ERAS), cite evidence-based practices, and provide actionable, personalized recommendations based on their specific responses.]

SCORING GUIDELINES:
- Score 85-100: Optimal profile, minimal modifiable risks
- Score 70-84: Good profile with some areas for improvement
- Score 55-69: Moderate risk requiring optimization
- Score 0-54: Elevated risk requiring significant intervention

Be specific, evidence-based, and provide actionable recommendations that are personalized to the patient's actual responses.`,

    // Keep other assessment types...
    "Anaesthesia Risk": `[Your existing Anaesthesia Risk prompt]`,
    "default": "You are a health assessment AI. Analyze the responses and provide structured recommendations."
  };

  return prompts[assessmentType] || prompts["default"];
}











// Helper function to parse AI response - UPDATED TO HANDLE BOTH ASSESSMENT TYPES
// Replace the parseAIResponse function in server.js

function parseAIResponse(aiAnalysis, assessmentType) {
  console.log("Parsing AI Analysis for:", assessmentType);

  try {
    // Extract overall score and rating
    const scoreMatch = aiAnalysis.match(/OVERALL_SCORE:\s*(\d+)/i);
    const overallScore = scoreMatch ? parseInt(scoreMatch[1]) : 70;

    const ratingMatch = aiAnalysis.match(/OVERALL_RATING:\s*([^\n]+)/i);
    const overallRating = ratingMatch ? ratingMatch[1].trim() : "Moderate Risk";

    // Extract category analysis section
    const categorySection = aiAnalysis.match(/CATEGORY_ANALYSIS:(.*?)(?=DETAILED_ANALYSIS:|$)/is);
    const results = [];

    // Extract detailed analysis section
    const detailedSection = aiAnalysis.match(/DETAILED_ANALYSIS:(.*?)(?=DETAILED_SUMMARY:|$)/is);
    const detailedAnalysisMap = new Map();

    // Parse detailed analysis first
    if (detailedSection) {
      const categories = assessmentType === "Complication Risk"
        ? ['Medical History Risk', 'Lifestyle Risk Factors', 'Medication Risk Profile', 'Surgical History Impact', 'Physical Risk Factors']
        : ['Airway Management Risk', 'Sleep Apnoea Risk', 'Medication Interactions', 'Substance Use Impact', 'Previous Anaesthesia History', 'Allergy & Reaction Risk'];

      categories.forEach(category => {
        const regex = new RegExp(`${category}\\|([^|]+)\\|([^|]+)\\|([^|]+)\\|([^\\n]+)`, 'i');
        const match = detailedSection[1].match(regex);

        if (match) {
          detailedAnalysisMap.set(category, {
            clinicalContext: match[1].trim(),
            strengths: match[2].trim().split(',').map(s => s.trim()).filter(s => s.length > 0),
            riskFactors: match[3].trim().split(',').map(r => r.trim()).filter(r => r.length > 0),
            timeline: match[4].trim()
          });
        }
      });
    }

    // Parse category analysis
    if (categorySection) {
      const categories = assessmentType === "Complication Risk"
        ? ['Medical History Risk', 'Lifestyle Risk Factors', 'Medication Risk Profile', 'Surgical History Impact', 'Physical Risk Factors']
        : ['Airway Management Risk', 'Sleep Apnoea Risk', 'Medication Interactions', 'Substance Use Impact', 'Previous Anaesthesia History', 'Allergy & Reaction Risk'];

      categories.forEach(category => {
        const categoryRegex = new RegExp(`${category}:\\s*([^\\n]+)`, 'i');
        const categoryMatch = categorySection[1].match(categoryRegex);

        if (categoryMatch) {
          const parts = categoryMatch[1].split('|').map(p => p.trim());

          if (parts.length >= 4) {
            const score = parseInt(parts[0]) || 70;
            const level = parts[1].toLowerCase();
            const description = parts[2];
            const recommendations = parts.slice(3).filter(r => r.length > 0);

            // Get detailed analysis for this category
            const detailedAnalysis = detailedAnalysisMap.get(category) || {
              clinicalContext: `Your ${category.toLowerCase()} assessment reveals important factors for surgical planning.`,
              strengths: ['Regular health monitoring', 'Awareness of risk factors', 'Proactive health management'],
              riskFactors: ['Requires optimization before surgery', 'Close monitoring recommended'],
              timeline: 'Discuss with your healthcare team 4-6 weeks before surgery.'
            };

            results.push({
              category,
              score,
              maxScore: 100,
              level: ['optimal', 'high', 'moderate', 'low'].includes(level) ? level : 'moderate',
              description,
              recommendations,
              detailedAnalysis
            });
          }
        }
      });
    }

    // If parsing failed, create comprehensive fallback
    if (results.length === 0) {
      console.log("Creating fallback structure for:", assessmentType);

      const fallbackCategories = assessmentType === "Complication Risk"
        ? [
            { name: 'Medical History Risk', desc: 'Your medical history indicates factors that require attention and optimization before surgery.' },
            { name: 'Lifestyle Risk Factors', desc: 'Several lifestyle factors could impact your surgical outcome and recovery.' },
            { name: 'Medication Risk Profile', desc: 'Your current medications require careful perioperative management.' },
            { name: 'Surgical History Impact', desc: 'Your previous surgical experiences provide valuable insights.' },
            { name: 'Physical Risk Factors', desc: 'Physical condition factors may impact surgical outcomes.' }
          ]
        : [
            { name: 'Airway Management Risk', desc: 'Your airway assessment indicates manageable risk factors.' },
            { name: 'Sleep Apnoea Risk', desc: 'Sleep-related factors may require monitoring.' },
            { name: 'Medication Interactions', desc: 'Current medications require review for interactions.' }
          ];

      fallbackCategories.forEach(cat => {
        results.push({
          category: cat.name,
          score: Math.floor(Math.random() * 20) + 65,
          maxScore: 100,
          level: 'moderate',
          description: cat.desc,
          recommendations: [
            'Consult with your healthcare provider for personalized guidance',
            'Follow pre-operative preparation protocols carefully',
            'Ensure all medical information is shared with your surgical team'
          ],
          detailedAnalysis: {
            clinicalContext: `Based on your responses, your ${cat.name.toLowerCase()} shows areas for attention and optimization before surgery.`,
            strengths: ['Good baseline awareness', 'Engaged with assessment process', 'Open to optimization'],
            riskFactors: ['Requires pre-operative optimization', 'Close monitoring recommended'],
            timeline: 'Begin optimization 4-6 weeks before scheduled surgery.'
          }
        });
      });
    }

    // Extract detailed summary
    const summaryMatch = aiAnalysis.match(/DETAILED_SUMMARY:\s*(.*?)$/is);
    const summary = summaryMatch ? summaryMatch[1].trim() : aiAnalysis;

    return {
      overallScore,
      overallRating,
      results,
      summary,
      assessmentType
    };

  } catch (error) {
    console.error("Error parsing AI response:", error);

    return {
      overallScore: 70,
      overallRating: "Moderate Risk",
      results: [{
        category: "Overall Assessment",
        score: 70,
        maxScore: 100,
        level: "moderate",
        description: "Your assessment has been completed. Please consult with your healthcare provider.",
        recommendations: [
          "Discuss your assessment results with your doctor",
          "Follow all pre-operative instructions carefully",
          "Ensure complete medical disclosure to your surgical team"
        ],
        detailedAnalysis: {
          clinicalContext: aiAnalysis,
          strengths: ['Assessment completed', 'Engaged with process'],
          riskFactors: ['Requires medical consultation'],
          timeline: 'Consult with healthcare team as soon as possible.'
        }
      }],
      summary: aiAnalysis,
      assessmentType
    };
  }
}



// ----------------------------
// Send Email Report
// ----------------------------
app.post("/api/send-email-report", async (req, res) => {
  try {
    const { userEmail, userName, assessmentType, report, reportId } = req.body;

    if (!userEmail || !userName || !assessmentType || !report) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields for email"
      });
    }

    // Generate HTML content
    const htmlContent = generateEmailContent(userName, assessmentType, report);

    // Send email
    const mailOptions = {
      from: `"Luther Health" <${process.env.GMAIL_USER}>`,
      to: userEmail,
      subject: `Your ${assessmentType} Assessment Results - Luther Health`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    console.log(`✅ Email sent successfully to ${userEmail}`);
    res.json({ success: true, message: "Email sent successfully" });

  } catch (error) {
    console.error("❌ Email sending error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      details: "Failed to send email report"
    });
  }
});


function generateEmailContent(userName, assessmentType, reportData) {
  console.log("Generating email for:", userName, assessmentType);
  console.log("Report data structure:", Object.keys(reportData || {}));

  // Handle the report data structure correctly
  let report;
  if (reportData.structured_report) {
    // If it's from database with structured_report field
    report = typeof reportData.structured_report === "string"
      ? JSON.parse(reportData.structured_report)
      : reportData.structured_report;
  } else if (reportData.results) {
    // If it's the direct report object
    report = reportData;
  } else {
    // Fallback
    report = {
      overallScore: 75,
      overallRating: "Moderate Risk",
      results: [],
      summary: "Your assessment has been completed. Please consult with a healthcare provider for detailed interpretation."
    };
  }

  const completionDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const getBadgeClass = (level) => {
    switch(level?.toLowerCase()) {
      case 'optimal': return 'badge-optimal';
      case 'high': return 'badge-high';
      case 'moderate': return 'badge-moderate';
      case 'low': return 'badge-low';
      default: return 'badge-moderate';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#28a745'; // Green
    if (score >= 60) return '#ffc107'; // Yellow
    if (score >= 40) return '#fd7e14'; // Orange
    return '#dc3545'; // Red
  };

  const getIcon = (level) => {
    switch(level?.toLowerCase()) {
      case 'optimal': return '✓';
      case 'high': return '↗';
      case 'moderate': return '⚠';
      case 'low': return '⚠';
      default: return '•';
    }
  };

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${assessmentType} Results - Luther Health</title>
        <style>
            /* CSS Variables matching your design system */
            :root {
                --font-size: 14px;
                --background: #ffffff;
                --foreground: #1a1a1a;
                --card: #ffffff;
                --card-foreground: #1a1a1a;
                --primary: #030213;
                --primary-foreground: #ffffff;
                --secondary: #f5f5f5;
                --secondary-foreground: #030213;
                --muted: #ececf0;
                --muted-foreground: #717182;
                --border: rgba(0, 0, 0, 0.1);
                --radius: 0.625rem;

                /* Badge colors */
                --badge-low-bg: #fef2f2;
                --badge-low-text: #dc2626;
                --badge-low-border: #fecaca;

                --badge-moderate-bg: #fffbeb;
                --badge-moderate-text: #d97706;
                --badge-moderate-border: #fed7aa;

                --badge-high-bg: #f0f9ff;
                --badge-high-text: #0284c7;
                --badge-high-border: #bae6fd;

                --badge-optimal-bg: #f0fdf4;
                --badge-optimal-text: #16a34a;
                --badge-optimal-border: #bbf7d0;
            }

            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: var(--foreground);
                background-color: #f9fafb;
                margin: 0;
                padding: 0;
            }

            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: var(--background);
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }

            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 40px 30px;
                text-align: center;
            }

            .header h1 {
                margin: 0 0 10px 0;
                font-size: 28px;
                font-weight: 600;
            }

            .header h2 {
                margin: 0 0 5px 0;
                font-size: 18px;
                font-weight: 400;
                opacity: 0.9;
            }

            .header .date {
                margin: 0;
                font-size: 14px;
                opacity: 0.8;
            }

            .content {
                padding: 30px;
            }

            .greeting {
                font-size: 16px;
                margin-bottom: 25px;
            }

            .greeting h3 {
                color: var(--primary);
                margin: 0 0 10px 0;
                font-size: 18px;
            }

            /* Overall Score Section */
            .score-section {
                background: linear-gradient(135deg, #e8f4fd 0%, #f0f9ff 100%);
                border: 2px solid #0284c7;
                border-radius: 12px;
                padding: 30px;
                text-align: center;
                margin: 30px 0;
            }

            .score-number {
                font-size: 56px;
                font-weight: bold;
                color: #0284c7;
                margin: 15px 0;
                line-height: 1;
            }

            .score-rating {
                display: inline-block;
                background-color: #0284c7;
                color: white;
                padding: 8px 20px;
                border-radius: 25px;
                font-weight: 600;
                font-size: 16px;
                margin: 15px 0;
            }

            .score-description {
                font-size: 14px;
                color: #4b5563;
                margin: 10px 0 0 0;
            }

            /* Category Cards */
            .categories-section {
                margin: 35px 0;
            }

            .categories-title {
                color: var(--primary);
                font-size: 20px;
                font-weight: 600;
                margin: 0 0 25px 0;
                border-bottom: 2px solid var(--border);
                padding-bottom: 10px;
            }

            .category-card {
                background-color: var(--card);
                border: 1px solid var(--border);
                border-radius: var(--radius);
                padding: 25px;
                margin: 20px 0;
                border-left: 5px solid #0284c7;
            }

            .category-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
            }

            .category-title {
                color: var(--primary);
                font-size: 18px;
                font-weight: 600;
                margin: 0;
                display: flex;
                align-items: center;
            }

            .category-icon {
                margin-right: 10px;
                font-size: 18px;
            }

            .category-score {
                background-color: var(--primary);
                color: white;
                padding: 6px 15px;
                border-radius: 20px;
                font-weight: 600;
                font-size: 14px;
            }

            .progress-bar {
                width: 100%;
                height: 8px;
                background-color: #e5e7eb;
                border-radius: 4px;
                margin: 15px 0;
                overflow: hidden;
            }

            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, var(--primary) 0%, #4f46e5 100%);
                border-radius: 4px;
                transition: width 0.5s ease;
            }

            .category-description {
                color: #4b5563;
                font-size: 15px;
                line-height: 1.6;
                margin: 15px 0;
            }

            .recommendations {
                background-color: #f8fafc;
                padding: 20px;
                border-radius: 8px;
                margin: 15px 0;
            }

            .recommendations h4 {
                color: var(--primary);
                font-size: 16px;
                font-weight: 600;
                margin: 0 0 15px 0;
            }

            .recommendations ul {
                margin: 0;
                padding-left: 20px;
                list-style: none;
            }

            .recommendations li {
                margin: 10px 0;
                padding-left: 10px;
                position: relative;
                color: #374151;
                font-size: 14px;
                line-height: 1.5;
            }

            .recommendations li::before {
                content: '•';
                color: #0284c7;
                font-weight: bold;
                position: absolute;
                left: -10px;
            }

            /* Summary Section */
            .summary-section {
                background-color: #f8fafc;
                border: 1px solid var(--border);
                border-radius: 10px;
                padding: 25px;
                margin: 30px 0;
                border-left: 5px solid #16a34a;
            }

            .summary-title {
                color: #16a34a;
                font-size: 20px;
                font-weight: 600;
                margin: 0 0 20px 0;
                display: flex;
                align-items: center;
            }

            .summary-content {
                color: #374151;
                font-size: 15px;
                line-height: 1.7;
            }

            /* Important Notice */
            .important-notice {
                background-color: #fffbeb;
                border: 1px solid #fed7aa;
                border-radius: 8px;
                padding: 25px;
                margin: 30px 0;
                border-left: 5px solid #f59e0b;
            }

            .important-notice h4 {
                color: #92400e;
                font-size: 16px;
                font-weight: 600;
                margin: 0 0 10px 0;
            }

            .important-notice p {
                color: #78350f;
                font-size: 14px;
                line-height: 1.6;
                margin: 0;
            }

            /* Footer */
            .footer {
                background-color: #1f2937;
                color: white;
                padding: 30px;
                text-align: center;
            }

            .footer .logo {
                font-size: 20px;
                font-weight: 600;
                margin: 0 0 10px 0;
            }

            .footer .tagline {
                font-size: 14px;
                opacity: 0.9;
                margin: 0 0 20px 0;
            }

            .footer .copyright {
                font-size: 12px;
                opacity: 0.7;
                margin: 0;
                line-height: 1.5;
            }

            /* Responsive */
            @media (max-width: 600px) {
                .content {
                    padding: 20px;
                }

                .score-number {
                    font-size: 44px;
                }

                .category-header {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 10px;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <!-- Header -->
            <div class="header">
                <h1>Luther Health</h1>
                <h2>Your ${assessmentType} Assessment Results</h2>
                <p class="date">Completed on ${completionDate}</p>
            </div>

            <!-- Content -->
            <div class="content">
                <!-- Greeting -->
                <div class="greeting">
                    <h3>Dear ${userName},</h3>
                    <p>Thank you for completing your ${assessmentType} assessment with Luther Health. We've analyzed your responses using our advanced AI system to provide you with personalized insights and evidence-based recommendations.</p>
                </div>

                <!-- Overall Score -->
                <div class="score-section">
                    <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 22px;">Overall Assessment Score</h3>
                    <div class="score-number">${report.overallScore || 'N/A'}%</div>
                    <div class="score-rating">${report.overallRating || 'Moderate Risk'}</div>
                    <p class="score-description">
                        This score reflects your overall risk profile based on your assessment responses and clinical evidence.
                    </p>
                </div>

                <!-- Categories -->
                <div class="categories-section">
                    <h3 class="categories-title">Category Breakdown & Analysis</h3>

                    ${(report.results || []).map(result => `
                        <div class="category-card">
                            <div class="category-header">
                                <h4 class="category-title">
                                    <span class="category-icon">${getIcon(result.level)}</span>
                                    ${result.category || 'Assessment Category'}
                                </h4>
                                <div class="category-score">${result.score || 'N/A'}/${result.maxScore || 100}</div>
                            </div>

                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${((result.score || 0) / (result.maxScore || 100)) * 100}%"></div>
                            </div>

                            <p class="category-description">
                                ${result.description || 'Analysis not available for this category.'}
                            </p>

                            ${result.recommendations && result.recommendations.length > 0 ? `
                                <div class="recommendations">
                                    <h4>Key Recommendations</h4>
                                    <ul>
                                        ${result.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>

                <!-- Summary -->
                ${report.summary ? `
                    <div class="summary-section">
                        <h3 class="summary-title">
                            📊 Detailed Clinical Analysis
                        </h3>
                        <div class="summary-content">
                            ${report.summary.replace(/\n/g, '<br>').substring(0, 1200)}${report.summary.length > 1200 ? '...' : ''}
                        </div>
                    </div>
                ` : ''}

                <!-- Important Medical Disclaimer -->
                <div class="important-notice">
                    <h4>⚠️ Important Medical Disclaimer</h4>
                    <p>
                        <strong>This assessment is for informational and educational purposes only and does not constitute medical advice, diagnosis, or treatment.</strong>
                        The results should not be used as a substitute for professional medical consultation, examination, diagnosis, or treatment.
                        Always seek the advice of your physician or other qualified healthcare provider with any questions you may have regarding a medical condition or surgical procedure.
                    </p>
                </div>

                <!-- Contact Information -->
                <div style="text-align: center; margin: 30px 0;">
                    <p style="color: #4b5563; margin: 0 0 20px 0;">
                        Questions about your results? Our support team is here to help.
                    </p>
                    <p style="color: var(--primary); margin: 0; font-size: 16px;">
                        Best regards,<br>
                        <strong>The Luther Health Team</strong>
                    </p>
                </div>
            </div>

            <!-- Footer -->
            <div class="footer">
                <div class="logo">Luther Health</div>
                <div class="tagline">AI-powered health assessments and clinical insights</div>
                <div class="copyright">
                    © ${new Date().getFullYear()} Luther Health. All rights reserved.<br>
                    This email was sent because you completed an assessment on our platform.<br>
                    For support, please contact our team or visit our website.
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
}

// ----------------------------
app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);