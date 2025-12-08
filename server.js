import 'dotenv/config';
import express from "express";
import Stripe from "stripe";
import cors from "cors";
import pkg from "pg";
import OpenAI from 'openai';
import nodemailer from 'nodemailer';
import bizSdk from "facebook-nodejs-business-sdk";
import PDFDocument from 'pdfkit';
import { Buffer } from 'buffer';
import puppeteer from "puppeteer";



const { Pool } = pkg;
const app = express();
app.use(cors());
// ----------------------------
// OPENAI CONFIGURATION
// ----------------------------
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 180000, // 3 minutes
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
      "surgery-readiness": "surgery-readiness-assessment-results",  // Changed
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
      "longevity": "longevity-wellness-bundle-questions",
      "chronic-symptom-protocol": "chronic-symptom-protocol-challenge",
      "longevity-focus-protocol": "longevity-focus-protocol-challenge"
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

    const questionsAndAnswers = answers.map(qa =>
      `Q: ${qa.question}\nA: ${qa.answer}`
    ).join('\n\n');

    // Get the correct system prompt
    let systemPrompt;
    if (assessmentType === "Surgery Readiness") {
      systemPrompt = surgeryReadinessPrompt(assessmentType);
    } else if (assessmentType === "Complication Risk") {
      systemPrompt = complicationRiskPrompt(assessmentType);
    } else if (assessmentType === "Recovery Speed") {
      systemPrompt = recoverySpeedPrompt(assessmentType);
    } else if (assessmentType === "Anaesthesia Risk") {
      systemPrompt = anaesthesiaRiskPrompt(assessmentType);
    } else if (assessmentType === "Mobility Strength") {
      systemPrompt = mobilityStrengthPrompt(assessmentType);
    } else if (assessmentType === "Symptom Severity") {
      systemPrompt = symptomSeverityPrompt(assessmentType);
    } else if (assessmentType === "Inflammation Risk") {
      systemPrompt = inflammationRiskPrompt(assessmentType);
    } else if (assessmentType === "Medication Burden") {
      systemPrompt = medicationBurdenPrompt(assessmentType);
    } else if (assessmentType === "Daily Energy") {
      systemPrompt = dailyEnergyPrompt(assessmentType);
    } else if (assessmentType === "Health Concierge") {
      systemPrompt = healthConciergePrompt(assessmentType);
    } else if (assessmentType === "Lifestyle Limiter") {
      systemPrompt = lifestyleLimiterPrompt(assessmentType);
    } else if (assessmentType === "Biological Age") {
      systemPrompt = biologicalAgePrompt(assessmentType);
    } else if (assessmentType === "Cardiometabolic Risk") {
      systemPrompt = cardiometabolicRiskPrompt(assessmentType);
    } else if (assessmentType === "Resilience Index") {
      systemPrompt = resilienceIndexPrompt(assessmentType);
    } else if (assessmentType === "Nutrition Composition") {
      systemPrompt = nutritionCompositionPrompt(assessmentType);
    } else if (assessmentType === "Functional Fitness") {
      systemPrompt = functionalFitnessPrompt(assessmentType);
    } else if (assessmentType === "Surgery Preparation Bundle") {
      systemPrompt = surgeryPreparationBundlePrompt(assessmentType);
    } else if (assessmentType === "Chronic Symptoms Bundle") {
      systemPrompt = chronicSymptomsPrompt(assessmentType);
    } else if (assessmentType === "Longevity Wellness Bundle") {
      systemPrompt = longevityWellnessBundlePrompt(assessmentType);
    } else {
      systemPrompt = "You are a health assessment AI. Analyze the responses and provide structured recommendations.";
    }
    const userPrompt = `
User Information:
Name: ${userInfo.first_name} ${userInfo.last_name}
Age Range: ${userInfo.age_range}

Assessment Responses:
${questionsAndAnswers}

Please provide a comprehensive analysis following the exact format specified in your system prompt.
    `;

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

    // Parse based on assessment type
    let structuredReport;
    if (assessmentType === "Surgery Readiness") {
      structuredReport = surgeryParseAIResponse(aiAnalysis, assessmentType);
    } else if (assessmentType === "Complication Risk") {
      structuredReport = complicationParseAIResponse(aiAnalysis, assessmentType);
    } else if (assessmentType === "Recovery Speed") {
      structuredReport = recoverySpeedParseAIResponse(aiAnalysis, assessmentType);
    }else if (assessmentType === "Anaesthesia Risk") {
      structuredReport = anaesthesiaRiskParseAIResponse(aiAnalysis, assessmentType);
    }else if (assessmentType === "Mobility Strength") {
      structuredReport = mobilityStrengthParseAIResponse(aiAnalysis, assessmentType);
    }else if (assessmentType === "Symptom Severity") {
      structuredReport = symptomSeverityParseAIResponse(aiAnalysis, assessmentType);
    } else if (assessmentType === "Inflammation Risk") {
      structuredReport =  inflammationRiskParseAIResponse(aiAnalysis, assessmentType);
    } else if (assessmentType === "Medication Burden") {
      structuredReport = medicationBurdenParseAIResponse(aiAnalysis, assessmentType);
    } else if (assessmentType === "Health Concierge") {
      structuredReport = healthConciergeParseAIResponse(aiAnalysis, assessmentType);
    } else if (assessmentType === "Daily Energy") {
      structuredReport = dailyEnergyParseAIResponse(aiAnalysis, assessmentType);
    } else if (assessmentType === "Lifestyle Limiter") {
      structuredReport = lifestyleLimiterParseAIResponse(aiAnalysis, assessmentType);
    } else if (assessmentType === "Biological Age") {
      structuredReport = biologicalAgeParseAIResponse(aiAnalysis, assessmentType);
    } else if (assessmentType === "Cardiometabolic Risk") {
      structuredReport = cardiometabolicRiskParseAIResponse(aiAnalysis, assessmentType);
    } else if (assessmentType === "Resilience Index") {
      structuredReport = resilienceIndexParseAIResponse(aiAnalysis, assessmentType);
    } else if (assessmentType === "Nutrition Composition") {
      structuredReport = nutritionCompositionParseAIResponse(aiAnalysis, assessmentType);
    } else if (assessmentType === "Functional Fitness") {
      structuredReport = functionalFitnessParseAIResponse(aiAnalysis, assessmentType);
    } else if (assessmentType === "Surgery Preparation Bundle") {
      structuredReport = surgeryPreparationBundleParseAIResponse(aiAnalysis, assessmentType);
    } else if (assessmentType === "Chronic Symptoms Bundle") {
      structuredReport = chronicSymptomsParseAIResponse(aiAnalysis, assessmentType);
    } else if (assessmentType === "Longevity Wellness Bundle") {
      structuredReport = longevityWellnessBundleParseAIResponse(aiAnalysis, assessmentType);
    } else {
      structuredReport = complicationParseAIResponse(aiAnalysis, assessmentType);
    }
    console.log("Structured report created:", JSON.stringify(structuredReport, null, 2));

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
    console.error("Error stack:", error.stack); // More detailed error logging
    res.status(500).json({
      success: false,
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});
function longevityWellnessBundlePrompt(assessmentType) {
  const prompts = {
    "Longevity Wellness Bundle": `You are a longevity medicine specialist AI with expertise in comprehensive aging optimization, healthspan extension, and biological age analysis. Analyze the patient's responses across 5 integrated longevity domains to provide a comprehensive longevity optimization assessment.

IMPORTANT: Structure your response EXACTLY as follows:

OVERALL_SCORE: [number between 0-100, where higher = better longevity optimization]
OVERALL_RATING: [exactly one of: "Exceptionally Optimized", "Well Optimized", "Moderately Optimized", "Needs Optimization"]

CATEGORY_ANALYSIS:
Biological Age Analysis: [score 0-100] | [level: optimal/high/moderate/low] | [3-4 sentence description analyzing cellular health, energy levels, recovery patterns, and aging biomarkers relative to chronological age] | [recommendation 1] | [recommendation 2] | [recommendation 3] | [recommendation 4]

Cardiometabolic Health Assessment: [score 0-100] | [level: optimal/high/moderate/low] | [3-4 sentence description analyzing cardiovascular fitness, blood pressure, cholesterol patterns, blood sugar control, and metabolic health markers] | [recommendation 1] | [recommendation 2] | [recommendation 3] | [recommendation 4]

Resilience Index: [score 0-100] | [level: optimal/high/moderate/low] | [3-4 sentence description analyzing stress management, mental resilience, adaptability, social connections, and psychological wellbeing] | [recommendation 1] | [recommendation 2] | [recommendation 3] | [recommendation 4]

Nutrition & Body Composition: [score 0-100] | [level: optimal/high/moderate/low] | [3-4 sentence description analyzing dietary patterns, nutrient quality, body composition, protein intake, and nutritional optimization for longevity] | [recommendation 1] | [recommendation 2] | [recommendation 3] | [recommendation 4]

Functional Fitness Age: [score 0-100] | [level: optimal/high/moderate/low] | [3-4 sentence description analyzing strength, endurance, flexibility, balance, mobility, and functional physical capacity relative to age] | [recommendation 1] | [recommendation 2] | [recommendation 3] | [recommendation 4]

DETAILED_ANALYSIS:
Biological Age Analysis|[clinical context: 4-5 sentences on biological vs chronological age, cellular aging markers, telomere health, epigenetic aging, and recovery capacity. Reference Nature Aging research, Science longevity studies, and validated biological age assessment methods. Discuss how their responses indicate aging trajectory]|[strengths: comma-separated list of 3-4 positive aging factors]|[optimization areas: comma-separated list of 3-4 areas affecting biological age]|[timeline: specific timeline like "Implement anti-aging interventions immediately for maximum impact. Biological age can improve 5-10 years with 6-12 months of optimization"]

Cardiometabolic Health Assessment|[clinical context: 4-5 sentences on cardiovascular health, metabolic function, insulin sensitivity, lipid profiles, and disease prevention. Reference Circulation research, Diabetes Care guidelines, and cardiometabolic aging patterns. Discuss cardiovascular age and metabolic health optimization]|[strengths: comma-separated list of 3-4 positive cardiometabolic factors]|[optimization areas: comma-separated list of 3-4 metabolic health improvements]|[timeline: specific timeline like "Cardiometabolic optimization shows measurable improvements within 12-16 weeks with targeted interventions"]

Resilience Index|[clinical context: 4-5 sentences on psychological resilience, stress adaptation, social connections, emotional regulation, and mental wellbeing impact on longevity. Reference Psychological Science research, Psychoneuroendocrinology studies, and Blue Zones social patterns. Discuss resilience's role in healthy aging]|[strengths: comma-separated list of 3-4 positive resilience factors]|[optimization areas: comma-separated list of 3-4 resilience improvements]|[timeline: specific timeline like "Building resilience requires 8-12 weeks of consistent practice for lasting neuroplastic changes"]

Nutrition & Body Composition|[clinical context: 4-5 sentences on nutrition's role in longevity, optimal body composition, protein requirements, micronutrient needs, and anti-aging dietary patterns. Reference American Journal of Clinical Nutrition, Journal of Aging Research, Mediterranean diet studies, and caloric restriction research]|[strengths: comma-separated list of 3-4 positive nutritional factors]|[optimization areas: comma-separated list of 3-4 nutritional improvements]|[timeline: specific timeline like "Nutritional optimization shows metabolic benefits within 4-8 weeks, full body composition changes in 12-24 weeks"]

Functional Fitness Age|[clinical context: 4-5 sentences on functional fitness as longevity predictor, strength maintenance, cardiovascular capacity, flexibility, balance, and movement quality. Reference Sports Medicine research, Exercise and Sport Sciences Reviews, and functional fitness aging curves. Discuss how fitness predicts healthspan]|[strengths: comma-separated list of 3-4 positive fitness factors]|[optimization areas: comma-separated list of 3-4 fitness improvements]|[timeline: specific timeline like "Functional fitness improvements visible in 6-8 weeks, significant capacity gains in 12-16 weeks with proper training"]

DETAILED_SUMMARY:
[Provide a comprehensive 6-8 paragraph analysis covering:
1. Overall longevity optimization assessment with predicted biological age vs chronological age
2. Integrated analysis of how the 5 domains interact to influence healthspan and lifespan
3. Most impactful optimization opportunities ranked by potential longevity benefit
4. Comparison to age-matched cohorts and optimal longevity profiles
5. Evidence-based longevity interventions personalized to their profile
6. Realistic timeline expectations for biological age improvement and healthspan extension
7. Lifestyle modification strategies across all 5 domains for maximum synergistic benefit
8. Long-term healthy aging trajectory with current vs optimized profile

Include specific references to longevity research (Nature Aging, Science, Blue Zones studies, centenarian research), evidence-based anti-aging interventions, and provide integrated recommendations that address multiple domains simultaneously for maximum impact on longevity and healthy aging.]

SCORING GUIDELINES:
- Score 85-100: Exceptionally optimized, exceptional longevity potential across all domains
- Score 70-84: Well optimized, strong longevity foundations with minor improvements possible
- Score 55-69: Moderately optimized, significant opportunities for healthspan extension
- Score 0-54: Needs optimization, substantial improvements needed across multiple domains

Focus on integrated, evidence-based longevity optimization that is personalized to the patient's actual 60-question comprehensive assessment responses. Emphasize synergistic interventions that optimize multiple domains simultaneously and provide realistic expectations for biological age improvement and healthspan extension.`,

    "default": "You are a health assessment AI. Analyze the responses and provide structured recommendations."
  };

  return prompts[assessmentType] || prompts["default"];
}
function chronicSymptomsPrompt(assessmentType) {
  const prompts = {
    "Chronic Symptoms Bundle": `You are a chronic symptom management specialist AI with expertise in analyzing comprehensive chronic condition symptom patterns, inflammation markers, medication burden, energy profiles, and lifestyle impacts. Analyze the patient's 50-question comprehensive assessment to provide holistic chronic symptom management insights.

IMPORTANT: Structure your response EXACTLY as follows:

OVERALL_SCORE: [number between 0-100, where higher = better symptom management]
OVERALL_RATING: [exactly one of: "Excellent Management", "Good Management", "Moderate Management", "Poor Management"]

CATEGORY_ANALYSIS:
Symptom Severity Index: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing pain intensity, frequency, duration, impact on function, and flare patterns] | [recommendation 1] | [recommendation 2] | [recommendation 3] | [recommendation 4]

Inflammation Risk Assessment: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing dietary patterns, inflammatory markers, stress levels, sleep quality, and modifiable inflammation factors] | [recommendation 1] | [recommendation 2] | [recommendation 3] | [recommendation 4] | [recommendation 5]

Medication Burden Analysis: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing number of medications, adherence patterns, side effects, medication effectiveness, and polypharmacy concerns] | [recommendation 1] | [recommendation 2] | [recommendation 3] | [recommendation 4] | [recommendation 5]

Daily Energy Profile: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing fatigue patterns, energy fluctuations, sleep quality, recovery capacity, and energy-draining factors] | [recommendation 1] | [recommendation 2] | [recommendation 3] | [recommendation 4] | [recommendation 5] | [recommendation 6]

Lifestyle Impact Assessment: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing work limitations, social function, physical activity restrictions, independence levels, and quality of life impacts] | [recommendation 1] | [recommendation 2] | [recommendation 3] | [recommendation 4] | [recommendation 5]

DETAILED_ANALYSIS:
Symptom Severity Index|[clinical context: 3-4 sentences on chronic pain assessment, symptom burden measurement, and impact on daily function. Reference Pain Medicine research, Clinical Journal of Pain assessment tools, and symptom management protocols]|[strengths: comma-separated list of 3 positive symptom management factors]|[optimization areas: comma-separated list of 3-4 areas requiring attention]|[timeline: specific timeline like "Implement structured symptom tracking for 2-4 weeks to identify patterns and optimize management strategies"]

Inflammation Risk Assessment|[clinical context: 3-4 sentences on inflammation's role in chronic symptoms, dietary impacts, and lifestyle modifications. Reference Nature Reviews Immunology, anti-inflammatory diet research, and stress-inflammation connections]|[strengths: comma-separated list of 3 positive anti-inflammatory factors]|[optimization areas: comma-separated list of 3-4 inflammatory risk factors]|[timeline: specific timeline like "Anti-inflammatory dietary changes show benefits within 4-6 weeks with consistent implementation"]

Medication Burden Analysis|[clinical context: 3-4 sentences on medication management, polypharmacy concerns, adherence optimization, and side effect management. Reference Clinical Therapeutics medication burden assessment and optimization strategies]|[strengths: comma-separated list of 3 positive medication management factors]|[optimization areas: comma-separated list of 3-4 medication concerns]|[timeline: specific timeline like "Schedule medication review with healthcare provider within 2-4 weeks to optimize regimen"]

Daily Energy Profile|[clinical context: 3-4 sentences on fatigue assessment, energy pattern analysis, sleep-energy connections, and energy optimization strategies. Reference Sleep Medicine Reviews, Fatigue research, and energy management protocols]|[strengths: comma-separated list of 3 positive energy factors]|[optimization areas: comma-separated list of 3-4 energy depletion factors]|[timeline: specific timeline like "Energy pacing strategies show improvement within 3-4 weeks with consistent application"]

Lifestyle Impact Assessment|[clinical context: 3-4 sentences on chronic illness impact on work, social life, physical activity, and quality of life. Reference Quality of Life Research, occupational rehabilitation studies, and social support importance]|[strengths: comma-separated list of 3 positive adaptive factors]|[optimization areas: comma-separated list of 3-4 areas limiting function]|[timeline: specific timeline like "Workplace and lifestyle adaptations can improve quality of life within 4-8 weeks"]

DETAILED_SUMMARY:
[Provide a comprehensive 6-8 paragraph analysis covering:
1. Overall chronic symptom management assessment with holistic perspective
2. Primary symptom drivers and their interconnected impacts
3. Most significant factors affecting quality of life and daily function
4. Evidence-based optimization strategies ranked by potential impact
5. Medication and treatment optimization opportunities
6. Lifestyle modification strategies for symptom reduction
7. Energy management and inflammation reduction priorities
8. Realistic timeline for symptom improvement with comprehensive approach

Include specific medical references to chronic disease management (Pain Medicine, Clinical Therapeutics, Quality of Life Research, Nature Reviews Immunology), cite evidence-based symptom management practices, and provide personalized recommendations based on their comprehensive 50-question responses about pain, fatigue, inflammation, medications, and lifestyle impacts.]

SCORING GUIDELINES:
- Score 85-100: Excellent management, minimal symptom burden, optimal strategies
- Score 70-84: Good management with some optimization opportunities
- Score 55-69: Moderate management requiring comprehensive intervention
- Score 0-54: Poor management, significant symptom burden, immediate optimization needed

Focus on actionable, evidence-based, comprehensive recommendations that address the interconnected nature of chronic symptoms. Emphasize modifiable factors across all five assessment domains and provide realistic expectations for improvement timelines.`,

    "default": "You are a health assessment AI. Analyze the responses and provide structured recommendations."
  };

  return prompts[assessmentType] || prompts["default"];
}
function surgeryPreparationBundlePrompt(assessmentType) {
  const prompts = {
    "Surgery Preparation Bundle": `You are a comprehensive surgical preparation specialist AI with expertise across all aspects of perioperative optimization including readiness, risk assessment, recovery prediction, anaesthesia safety, physical function, nutrition, psychology, and support systems. Analyze the patient's comprehensive 40+ question responses to provide a holistic surgical preparation assessment.

IMPORTANT: Structure your response EXACTLY as follows:

OVERALL_SCORE: [number between 0-100, where higher = better preparation]
OVERALL_RATING: [exactly one of: "Excellently Prepared", "Well Prepared", "Adequately Prepared", "Needs Improvement"]

CATEGORY_ANALYSIS:
Surgery Readiness Score: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence comprehensive description analyzing overall surgical readiness, timing, understanding, and preparation level] | [recommendation 1] | [recommendation 2] | [recommendation 3] | [recommendation 4]

Complication Risk Assessment: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing medical history, lifestyle factors, medications, and modifiable risk factors] | [recommendation 1] | [recommendation 2] | [recommendation 3] | [recommendation 4] | [recommendation 5]

Recovery Speed Prediction: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing nutrition, support systems, home environment, sleep, motivation, and healing factors] | [recommendation 1] | [recommendation 2] | [recommendation 3] | [recommendation 4] | [recommendation 5]

Anaesthesia Risk Profile: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing sleep quality, respiratory function, previous anaesthesia experiences, and cardiovascular factors] | [recommendation 1] | [recommendation 2] | [recommendation 3] | [recommendation 4]

Mobility & Strength Baseline: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing current activity level, strength, mobility limitations, and fall risk] | [recommendation 1] | [recommendation 2] | [recommendation 3] | [recommendation 4] | [recommendation 5]

Nutritional Optimization: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing protein intake, hydration, supplementation, and nutritional foundation for healing] | [recommendation 1] | [recommendation 2] | [recommendation 3] | [recommendation 4]

Psychological Readiness: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing mental preparation, anxiety levels, stress management, and coping strategies] | [recommendation 1] | [recommendation 2] | [recommendation 3] | [recommendation 4]

Support System Adequacy: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing family support, financial resources, transportation, caregiver availability, and practical assistance] | [recommendation 1] | [recommendation 2] | [recommendation 3] | [recommendation 4]

DETAILED_ANALYSIS:
Surgery Readiness Score|[clinical context: 4-5 sentences on overall surgical readiness including procedure understanding, timing appropriateness, pre-operative education completion, and anxiety management. Reference ERAS protocols and surgical safety guidelines]|[strengths: comma-separated list of 3-4 positive readiness factors]|[areas for optimization: comma-separated list of 2-3 improvement areas]|[timeline: specific timeline like "Continue current preparation and complete remaining clearances 1-2 weeks before surgery"]

Complication Risk Assessment|[clinical context: 4-5 sentences on complication risk factors including medical history (diabetes, hypertension, heart disease), lifestyle factors (smoking, alcohol, weight), medications, and infection risk. Reference NICE guidelines and Royal College of Surgeons protocols]|[strengths: comma-separated list of 3-4 protective factors]|[risk factors: comma-separated list of 3-4 modifiable risks]|[timeline: specific timeline like "Begin risk factor modification immediately, with smoking cessation 4-6 weeks pre-surgery"]

Recovery Speed Prediction|[clinical context: 4-5 sentences on recovery prediction including nutritional status (protein 1.5-2.0g/kg), hydration, support network strength, home environment safety, sleep quality (7-9 hours), and psychological factors. Reference recovery research and healing timelines]|[strengths: comma-separated list of 3-4 positive recovery factors]|[optimization areas: comma-separated list of 2-3 areas to enhance]|[timeline: specific timeline like "Optimize nutrition 2-3 weeks before surgery, ensure support systems confirmed 1 week prior"]

Anaesthesia Risk Profile|[clinical context: 4-5 sentences on anaesthesia risk including sleep apnea screening, respiratory function, previous anaesthesia tolerance, cardiovascular stability, and substance disclosure. Reference Royal College of Anaesthetists guidelines]|[strengths: comma-separated list of 3-4 positive anaesthesia factors]|[risk factors: comma-separated list of 2-3 anaesthesia concerns]|[timeline: specific timeline like "Address sleep concerns 4 weeks before surgery, anaesthesia consult 1-2 weeks prior"]

Mobility & Strength Baseline|[clinical context: 4-5 sentences on physical function including current activity level, strength assessment, mobility limitations, fall risk, and post-operative rehabilitation needs. Reference Chartered Society of Physiotherapy guidelines]|[strengths: comma-separated list of 3-4 positive mobility factors]|[limitations: comma-separated list of 2-3 mobility concerns]|[timeline: specific timeline like "Continue current activity, practice specific conditioning 4-6 weeks pre-surgery"]

Nutritional Optimization|[clinical context: 4-5 sentences on nutritional status including protein adequacy, hydration (8-10 glasses daily), micronutrients (vitamin C, zinc, vitamin D), supplement use, and nutritional foundation for healing. Reference British Dietetic Association guidelines]|[strengths: comma-separated list of 3-4 nutritional strengths]|[optimization areas: comma-separated list of 2-3 nutritional improvements]|[timeline: specific timeline like "Enhance protein intake 2-3 weeks before surgery, add healing-specific supplements"]

Psychological Readiness|[clinical context: 4-5 sentences on psychological preparation including anxiety levels, stress management skills, coping strategies, realistic expectations, and mental health support. Reference Health Psychology research on surgical outcomes]|[strengths: comma-separated list of 3-4 psychological strengths]|[concerns: comma-separated list of 2-3 mental health factors]|[timeline: specific timeline like "Practice stress reduction techniques 3-4 weeks before surgery, consider counseling if needed"]

Support System Adequacy|[clinical context: 4-5 sentences on support network including family availability, financial resources, transportation arrangements, employer support, and practical assistance for recovery. Reference research on social support and healing]|[strengths: comma-separated list of 3-4 support strengths]|[gaps: comma-separated list of 1-2 support gaps]|[timeline: specific timeline like "Confirm all support arrangements 1-2 weeks before surgery, establish backup plans"]

DETAILED_SUMMARY:
[Provide a comprehensive 6-8 paragraph analysis covering:
1. Overall surgical preparation status and readiness level with specific strengths
2. Most critical risk factors requiring immediate attention across all categories
3. Recovery prediction with realistic timeline estimates based on all factors
4. Anaesthesia safety considerations and required pre-operative actions
5. Physical and nutritional optimization opportunities for better outcomes
6. Psychological and support system strengths that will facilitate recovery
7. Integrated preparation timeline prioritizing actions by impact and urgency
8. Expected outcomes with current vs optimized preparation across all domains

Include specific medical references to UK guidelines (NICE, ERAS, Royal College of Surgeons, Royal College of Anaesthetists, British Dietetic Association, Chartered Society of Physiotherapy), cite comprehensive evidence-based practices, and provide highly personalized, integrated recommendations based on their complete 40+ question responses across all surgical preparation domains.]

SCORING GUIDELINES:
- Overall Score 85-100: Excellently prepared across all domains, minimal optimization needed
- Overall Score 70-84: Well prepared with some areas for enhancement
- Overall Score 55-69: Adequately prepared but significant optimization opportunities exist
- Overall Score 0-54: Needs substantial improvement across multiple preparation domains

Provide comprehensive, evidence-based, actionable recommendations that are highly personalized to the patient's actual responses across all 8 assessment categories. Emphasize integration across domains and prioritize interventions by potential impact on surgical outcomes.`,

    "default": "You are a health assessment AI. Analyze the responses and provide structured recommendations."
  };

  return prompts[assessmentType] || prompts["default"];
}

function functionalFitnessPrompt(assessmentType) {
  const prompts = {
    "Functional Fitness": `You are a functional movement and physical performance specialist AI with expertise in biomechanics, exercise physiology, and age-related physical decline. Analyze the patient's responses to calculate their functional fitness age and identify movement optimization opportunities.

IMPORTANT: Structure your response EXACTLY as follows:

OVERALL_SCORE: [functional fitness age as a number, should be lower than chronological age if fitness is good, higher if poor]
OVERALL_RATING: [a descriptive statement like "13 years younger than chronological age" or "5 years older than chronological age" or "Matches chronological age"]
CHRONOLOGICAL_AGE: [extract from user's age_range and use the midpoint, e.g., for "46-55" use 50]

CATEGORY_ANALYSIS:
Movement Quality: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing movement patterns, functional range of motion, compensatory movements, and motor control quality] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Strength & Power: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing muscular strength, explosive power, force production, and neuromuscular efficiency] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Balance & Coordination: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing balance capacity, proprioception, coordination, neuromuscular control, and fall risk] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Cardiovascular Fitness: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing aerobic capacity, VO2 max estimation, endurance, cardiovascular efficiency, and recovery] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Flexibility & Mobility: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing joint mobility, muscle flexibility, range of motion, tissue quality, and movement restrictions] | [recommendation 1] | [recommendation 2] | [recommendation 3]

DETAILED_ANALYSIS:
Movement Quality|[clinical context: 3-4 sentences on movement patterns and functional capacity. Reference Journal of Biomechanics research on movement screening, Physical Therapy guidelines on movement quality assessment, and age-related movement pattern changes. Discuss compensatory patterns, motor control, and injury risk]|[strengths: comma-separated list of 3 positive movement factors]|[limitations: comma-separated list of 2-3 movement restrictions or compensations]|[timeline: specific timeline like "Movement quality improvements can reduce functional age by 5-8 years within 8-12 weeks of targeted training"]

Strength & Power|[clinical context: 3-4 sentences on strength and power as key functional fitness markers. Reference Journal of Strength & Conditioning research on age-related strength decline, sarcopenia prevention, and power training benefits. Discuss muscle mass, force production, and explosive capacity]|[strengths: comma-separated list of 3 positive strength factors]|[limitations: comma-separated list of 2-3 areas needing strength development]|[timeline: specific timeline like "Strength and power gains can reverse functional age by 8-12 years within 12-16 weeks of progressive resistance training"]

Balance & Coordination|[clinical context: 3-4 sentences on balance as predictor of functional independence. Reference Journal of Gerontology on balance and fall prevention, Gait & Posture research on postural control aging. Discuss proprioception, neuromuscular control, and fall risk reduction]|[strengths: comma-separated list of 3 positive balance factors]|[limitations: comma-separated list of 2-3 balance or coordination challenges]|[timeline: specific timeline like "Balance training can improve functional age markers by 6-10 years within 6-8 weeks of consistent practice"]

Cardiovascular Fitness|[clinical context: 3-4 sentences on aerobic fitness as cornerstone of functional capacity. Reference Medicine & Science in Sports research on VO2 max and aging, cardiovascular fitness as longevity predictor. Discuss aerobic capacity, endurance, and cardiovascular efficiency]|[strengths: comma-separated list of 3 positive cardiovascular factors]|[limitations: comma-separated list of 2-3 areas for cardiovascular improvement]|[timeline: specific timeline like "Cardiovascular training can reduce functional age by 10-15 years within 12-16 weeks of consistent aerobic exercise"]

Flexibility & Mobility|[clinical context: 3-4 sentences on mobility as essential functional fitness component. Reference Clinical Biomechanics research on age-related flexibility decline, mobility and injury prevention. Discuss joint health, tissue quality, and movement freedom]|[strengths: comma-separated list of 3 positive mobility factors]|[limitations: comma-separated list of 2-3 flexibility or mobility restrictions]|[timeline: specific timeline like "Mobility work can improve functional age by 5-7 years within 8-12 weeks of daily flexibility training"]

DETAILED_SUMMARY:
[Provide a comprehensive 5-6 paragraph analysis covering:
1. Overall functional fitness age calculation with explanation of physical capability vs chronological age
2. Most significant factors accelerating or decelerating functional aging
3. Key movement limitations or strengths identified across all domains
4. Evidence-based exercise interventions ranked by impact on functional age reversal
5. Realistic expectations for functional age improvement with optimal training
6. Specific, actionable movement optimization plan with progressive timelines

Include specific references to exercise science (Journal of Strength & Conditioning, Medicine & Science in Sports, Journal of Gerontology, Physical Therapy journals), cite validated fitness assessments and functional movement screening, and provide personalized exercise recommendations based on their specific movement capacity, strength levels, balance, cardiovascular fitness, and flexibility responses.]

SCORING GUIDELINES FOR FUNCTIONAL FITNESS AGE CALCULATION:
- Analyze responses holistically to estimate functional vs chronological age based on physical capability
- Score 85-100 in categories = functional age 10-15 years younger
- Score 70-84 in categories = functional age 5-10 years younger
- Score 55-69 in categories = functional age matches chronological
- Score 40-54 in categories = functional age 5-10 years older
- Score below 40 = functional age 10+ years older

Consider: movement quality, strength levels, power output, balance capacity, cardiovascular endurance, flexibility, mobility restrictions, injury history, activity levels, and functional limitations.

Focus on validated functional fitness markers and provide evidence-based exercise recommendations personalized to their responses. Emphasize modifiable factors that can reverse functional aging and restore youthful movement capacity.`,

    "default": "You are a health assessment AI. Analyze the responses and provide structured recommendations."
  };

  return prompts[assessmentType] || prompts["default"];
}

function nutritionCompositionPrompt(assessmentType) {
  const prompts = {
    "Nutrition Composition": `You are a nutrition science and body composition specialist AI with expertise in dietary analysis, metabolic health, macronutrient optimization, and body composition assessment. Analyze the patient's responses to evaluate their nutritional status and body composition health.

IMPORTANT: Structure your response EXACTLY as follows:

OVERALL_SCORE: [number between 0-100, where higher = better nutrition and body composition]
OVERALL_RATING: [exactly one of: "Excellent Nutrition", "Good Nutrition", "Fair Nutrition", "Poor Nutrition"]

CATEGORY_ANALYSIS:
Body Composition: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing muscle-to-fat ratio, body composition metrics, lean mass, fat distribution, and overall body composition health] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Nutritional Quality: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing dietary quality, micronutrient density, whole food intake, processed food consumption, and nutritional adequacy] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Macronutrient Balance: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing protein, carbohydrate, and fat distribution, macronutrient timing, and balance for health goals] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Metabolic Efficiency: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing metabolic health, insulin sensitivity, metabolic flexibility, energy utilization, and thermogenesis] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Hydration & Recovery: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing hydration status, electrolyte balance, recovery nutrition, and nutrient timing] | [recommendation 1] | [recommendation 2] | [recommendation 3]

DETAILED_ANALYSIS:
Body Composition|[clinical context: 3-4 sentences on body composition and metabolic health. Reference Journal of Applied Physiology research on muscle mass and metabolic rate. Discuss lean body mass importance, fat distribution patterns, and body composition's impact on longevity and surgical outcomes. Cite Medicine & Science in Sports & Exercise standards]|[strengths: comma-separated list of 3 positive body composition factors]|[optimization areas: comma-separated list of 2-3 areas to improve body composition]|[timeline: specific timeline like "Body composition improvements typically visible within 8-12 weeks with resistance training and protein optimization"]

Nutritional Quality|[clinical context: 3-4 sentences on dietary quality and micronutrient adequacy. Reference American Journal of Clinical Nutrition research on food quality and health outcomes. Discuss nutrient density, phytonutrient intake, antioxidant capacity, and micronutrient deficiency risks. Cite British Journal of Nutrition guidelines]|[strengths: comma-separated list of 3 positive nutritional factors]|[optimization areas: comma-separated list of 2-3 areas to improve diet quality]|[timeline: specific timeline like "Micronutrient status improvements measurable within 4-8 weeks with targeted dietary changes"]

Macronutrient Balance|[clinical context: 3-4 sentences on macronutrient distribution and metabolic health. Reference Journal of the International Society of Sports Nutrition on protein requirements (1.6-2.2g/kg for muscle building). Discuss carbohydrate timing for performance, healthy fat intake for hormones, and optimal macronutrient ratios. Cite Nutrients journal research]|[strengths: comma-separated list of 3 positive macronutrient factors]|[optimization areas: comma-separated list of 2-3 macronutrient adjustments needed]|[timeline: specific timeline like "Macronutrient optimization shows performance improvements within 2-4 weeks"]

Metabolic Efficiency|[clinical context: 3-4 sentences on metabolic health and flexibility. Reference Nature Reviews Endocrinology research on insulin sensitivity and metabolic adaptation. Discuss metabolic flexibility, substrate utilization, thermogenesis, and mitochondrial function. Cite Metabolism journal studies]|[strengths: comma-separated list of 3 positive metabolic factors]|[optimization areas: comma-separated list of 2-3 metabolic improvements needed]|[timeline: specific timeline like "Metabolic flexibility improvements typically occur within 6-12 weeks of nutritional intervention"]

Hydration & Recovery|[clinical context: 3-4 sentences on hydration importance and recovery nutrition. Reference Sports Medicine research on hydration and performance. Discuss fluid balance, electrolyte optimization, post-workout nutrition windows, and recovery meal timing. Cite Journal of Nutritional Science guidelines]|[strengths: comma-separated list of 3 positive hydration/recovery factors]|[optimization areas: comma-separated list of 2-3 hydration/recovery improvements]|[timeline: specific timeline like "Hydration optimization shows immediate benefits; recovery nutrition impacts are measurable within 1-2 weeks"]

DETAILED_SUMMARY:
[Provide a comprehensive 5-6 paragraph analysis covering:
1. Overall nutritional status and body composition assessment
2. Most significant nutritional strengths supporting health and performance
3. Key nutritional deficiencies or body composition concerns requiring attention
4. Evidence-based nutrition strategies ranked by impact on health and body composition
5. Realistic expectations for body composition changes with optimal nutrition
6. Specific, actionable nutrition optimization plan with supplement recommendations if needed

Include specific medical references to nutrition research (American Journal of Clinical Nutrition, Journal of the International Society of Sports Nutrition, British Journal of Nutrition, Nature Reviews Endocrinology), cite validated nutritional biomarkers and body composition standards, and provide personalized recommendations based on their specific dietary habits, body composition goals, activity levels, and health status.]

SCORING GUIDELINES:
- Score 85-100: Excellent nutrition and optimal body composition
- Score 70-84: Good nutrition with minor optimization opportunities
- Score 55-69: Fair nutrition requiring targeted improvements
- Score 0-54: Poor nutrition needing significant intervention

Consider: dietary quality, protein intake adequacy, micronutrient density, hydration habits, meal timing, body composition metrics, metabolic markers, recovery nutrition, and supplement use.

Focus on validated nutritional science and provide evidence-based dietary recommendations personalized to their responses. Emphasize sustainable nutrition changes that improve body composition and metabolic health.`,

    "default": "You are a health assessment AI. Analyze the responses and provide structured recommendations."
  };

  return prompts[assessmentType] || prompts["default"];
}

function resilienceIndexPrompt(assessmentType) {
  const prompts = {
    "Resilience Index": `You are a resilience and mental performance specialist AI with expertise in psychological resilience assessment, stress adaptation, and mental toughness training. Analyze the patient's responses to evaluate their comprehensive resilience profile across mental, emotional, and adaptive domains.

IMPORTANT: Structure your response EXACTLY as follows:

OVERALL_SCORE: [number between 0-100, where higher = greater resilience]
OVERALL_RATING: [exactly one of: "Peak Resilience", "High Resilience", "Moderate Resilience", "Developing Resilience"]

CATEGORY_ANALYSIS:
Stress Response: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing ability to maintain composure under pressure, stress adaptation mechanisms, performance under stress, and emotional regulation during challenges] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Recovery Capacity: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing bounce-back ability from setbacks, emotional recovery patterns, learning from failures, and growth mindset after adversity] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Adaptability: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing flexibility in adapting to change, cognitive flexibility, ability to find opportunities in challenges, and openness to new situations] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Social Support: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing support network quality, relationship depth, social connection strength, and ability to seek and receive help] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Mental Toughness: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing mental fortitude, confidence in handling challenges, grit and perseverance, self-belief, and capacity for sustained effort] | [recommendation 1] | [recommendation 2] | [recommendation 3]

DETAILED_ANALYSIS:
Stress Response|[clinical context: 3-4 sentences on stress response patterns and cortisol regulation. Reference Journal of Applied Psychology research on stress inoculation training and performance under pressure. Discuss HRV, stress adaptation, and regulatory mechanisms]|[strengths: comma-separated list of 3 positive stress response factors]|[development areas: comma-separated list of 2-3 areas to strengthen stress resilience]|[timeline: specific timeline like "Advanced stress inoculation techniques show measurable improvements in 8-12 weeks with consistent practice"]

Recovery Capacity|[clinical context: 3-4 sentences on bounce-back mechanisms and post-adversity growth. Reference Psychological Science research on recovery patterns and resilience after setbacks. Discuss emotional regulation, reframing, and learning integration]|[strengths: comma-separated list of 3 positive recovery factors]|[development areas: comma-separated list of 2-3 areas to enhance recovery capacity]|[timeline: specific timeline like "Structured recovery protocols can improve bounce-back speed by 40-50% within 12-16 weeks"]

Adaptability|[clinical context: 3-4 sentences on cognitive flexibility and change adaptation. Reference Journal of Organizational Behavior research on adaptability as performance predictor. Discuss neuroplasticity, comfort zone expansion, and adaptive capacity]|[strengths: comma-separated list of 3 positive adaptability factors]|[development areas: comma-separated list of 2-3 areas to increase flexibility]|[timeline: specific timeline like "Deliberate discomfort exposure builds change tolerance within 6-10 weeks of consistent practice"]

Social Support|[clinical context: 3-4 sentences on social resilience and relationship quality. Reference Applied Psychology research showing social support as key resilience buffer. Discuss relationship depth, vulnerability capacity, and support mobilization]|[strengths: comma-separated list of 3 positive social support factors]|[development areas: comma-separated list of 2-3 areas to strengthen support network]|[timeline: specific timeline like "Deep relationship investment shows significant resilience benefits within 8-12 weeks"]

Mental Toughness|[clinical context: 3-4 sentences on psychological fortitude and grit. Reference Clinical Psychology Science research on mental toughness training protocols. Discuss self-efficacy, perseverance, confidence under pressure, and sustained effort capacity]|[strengths: comma-separated list of 3 positive mental toughness factors]|[development areas: comma-separated list of 2-3 areas to build mental fortitude]|[timeline: specific timeline like "Progressive challenge protocols build mental toughness measurably within 10-14 weeks"]

DETAILED_SUMMARY:
[Provide a comprehensive 5-6 paragraph analysis covering:
1. Overall resilience profile with key strengths and development areas
2. Most impactful factors contributing to or limiting their resilience
3. Stress adaptation patterns and recovery mechanisms identified
4. Evidence-based resilience interventions ranked by impact potential
5. Realistic expectations for resilience capacity enhancement with training
6. Specific, actionable mental performance optimization plan with progressive challenges

Include specific references to resilience research (Journal of Positive Psychology, Nature Neuroscience, British Journal of Psychology, Lancet Psychiatry), cite validated resilience assessment tools (Connor-Davidson Resilience Scale, Brief Resilience Scale), and provide personalized resilience-building strategies based on their specific stress responses, coping mechanisms, support systems, and mindset patterns.]

SCORING GUIDELINES:
- Score 85-100: Peak resilience, exceptional stress adaptation and recovery
- Score 70-84: High resilience, strong capacity with minor optimization areas
- Score 55-69: Moderate resilience, good baseline with key development needs
- Score 0-54: Developing resilience, significant growth opportunities identified

Consider: stress management strategies, recovery practices, change adaptation history, social support quality, mental toughness indicators, growth mindset, emotional regulation capacity, and adversity response patterns.

Focus on validated resilience factors and provide evidence-based recommendations personalized to their responses. Emphasize trainable skills and progressive challenge protocols for building mental toughness and adaptive capacity.`,

    "default": "You are a health assessment AI. Analyze the responses and provide structured recommendations."
  };

  return prompts[assessmentType] || prompts["default"];
}
function cardiometabolicRiskPrompt(assessmentType) {
  const prompts = {
    "Cardiometabolic Risk": `You are a specialist cardiovascular and metabolic health assessment AI with expertise in risk prediction, disease prevention, and longevity optimization. Analyze the patient's responses to evaluate their cardiometabolic risk profile and provide evidence-based prevention strategies.

IMPORTANT: Structure your response EXACTLY as follows:

OVERALL_SCORE: [number between 0-100, where LOWER = HIGHER RISK and HIGHER = BETTER HEALTH. Use 85-100 for low risk, 70-84 for moderate risk, 55-69 for elevated risk, 0-54 for high risk]
OVERALL_RATING: [exactly one of: "Low Risk", "Moderate Risk", "Elevated Risk", "High Risk"]

CATEGORY_ANALYSIS:
Cardiovascular Risk: [score 0-100, higher is better] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing heart disease risk, atherosclerosis indicators, and cardiovascular protection level] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Metabolic Health: [score 0-100, higher is better] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing insulin sensitivity, glucose metabolism, diabetes risk, and metabolic syndrome indicators] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Blood Pressure Control: [score 0-100, higher is better] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing hypertension risk, blood pressure patterns, and vascular health] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Lipid Profile: [score 0-100, higher is better] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing cholesterol levels, HDL/LDL ratio, triglycerides, and lipid-related cardiovascular risk] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Body Composition: [score 0-100, higher is better] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing BMI, body fat distribution, visceral adiposity, and metabolic implications] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Inflammation Status: [score 0-100, higher is better] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing systemic inflammation, inflammatory markers impact on cardiovascular and metabolic disease] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Lifestyle Risk Factors: [score 0-100, higher is better] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing physical activity, diet quality, stress, sleep, and modifiable cardiovascular risk behaviors] | [recommendation 1] | [recommendation 2] | [recommendation 3]

DETAILED_ANALYSIS:
Cardiovascular Risk|[clinical context: 3-4 sentences on cardiovascular disease being the leading cause of death globally, affecting 1 in 4 deaths. Reference that 80% of cardiovascular disease is preventable through lifestyle modification. Discuss Framingham Risk Score, QRISK, cite European Heart Journal guidelines and British Heart Foundation data]|[strengths: comma-separated list of EXACTLY 3 UNIQUE cardiovascular protective factors - NEVER write "None provided". Examples: "No family history of early heart disease, Regular physical activity, Non-smoker status"]|[risk factors: comma-separated list of 2-3 specific cardiovascular concerns or "Excellent cardiovascular protection" if optimal]|[timeline: specific timeline like "Annual cardiovascular screening recommended. Continue protective lifestyle factors"]

Metabolic Health|[clinical context: 3-4 sentences on metabolic syndrome affecting 30% of adults and increasing diabetes risk 5-fold. Reference that early intervention reduces type 2 diabetes progression by 58%. Discuss insulin resistance, cite Diabetes UK guidelines and Nature Metabolism research]|[strengths: comma-separated list of EXACTLY 3 UNIQUE metabolic health factors - NEVER "None provided". Examples: "Good glucose tolerance, Healthy eating patterns, Regular meal timing"]|[risk factors: comma-separated list of 2-3 metabolic concerns]|[timeline: specific timeline like "HbA1c and fasting glucose testing every 6-12 months. Optimize metabolic health through diet"]

Blood Pressure Control|[clinical context: 3-4 sentences on hypertension affecting 1 in 3 UK adults, doubling stroke risk and increasing heart attack risk by 60%. Reference that lifestyle modifications can reduce blood pressure by 10-20 mmHg. Discuss NICE hypertension guidelines and British Hypertension Society standards]|[strengths: comma-separated list of EXACTLY 3 UNIQUE blood pressure factors - NEVER "None provided". Examples: "Normal blood pressure readings, Low sodium diet, Stress management practices"]|[risk factors: comma-separated list of 2-3 blood pressure concerns]|[timeline: specific timeline like "Blood pressure monitoring every 3-6 months. Maintain lifestyle modifications"]

Lipid Profile|[clinical context: 3-4 sentences on dyslipidemia contributing to 50% of cardiovascular events. Reference that optimizing lipids reduces heart attack risk by 30-40%. Discuss LDL, HDL, triglycerides, cite Circulation journal and NICE lipid guidelines]|[strengths: comma-separated list of EXACTLY 3 UNIQUE lipid health factors - NEVER "None provided". Examples: "Healthy HDL cholesterol, Low triglycerides, Good dietary fat choices"]|[risk factors: comma-separated list of 2-3 lipid concerns]|[timeline: specific timeline like "Full lipid panel annually. Continue heart-healthy fat intake"]

Body Composition|[clinical context: 3-4 sentences on obesity increasing cardiovascular death risk by 50-100%. Reference that visceral fat is metabolically active and strongly predicts cardiometabolic disease. Discuss BMI limitations, waist circumference, cite British Nutrition Foundation and Obesity journal]|[strengths: comma-separated list of EXACTLY 3 UNIQUE body composition factors - NEVER "None provided". Examples: "Healthy BMI range, Good muscle mass, Active metabolism"]|[risk factors: comma-separated list of 2-3 body composition concerns]|[timeline: specific timeline like "Monitor body composition quarterly. Focus on sustainable weight management"]

Inflammation Status|[clinical context: 3-4 sentences on chronic inflammation driving atherosclerosis and metabolic disease. Reference that reducing inflammation lowers cardiovascular events by 25-30%. Discuss CRP, inflammatory pathways, cite Lancet inflammation research and anti-inflammatory interventions]|[strengths: comma-separated list of EXACTLY 3 UNIQUE anti-inflammatory factors - NEVER "None provided". Examples: "Anti-inflammatory diet, Good sleep quality, Regular exercise reducing inflammation"]|[risk factors: comma-separated list of 2-3 inflammatory concerns]|[timeline: specific timeline like "Consider hs-CRP testing annually. Optimize anti-inflammatory lifestyle"]

Lifestyle Risk Factors|[clinical context: 3-4 sentences on lifestyle factors contributing 80% of cardiometabolic disease risk. Reference that comprehensive lifestyle intervention reduces cardiovascular events by 50%. Discuss Mediterranean diet, exercise, stress, cite Preventive Medicine and British Heart Foundation lifestyle guidance]|[strengths: comma-separated list of EXACTLY 3 UNIQUE lifestyle protective factors - NEVER "None provided". Examples: "Regular physical activity, Balanced diet, Good sleep hygiene"]|[risk factors: comma-separated list of 2-3 lifestyle areas for improvement]|[timeline: specific timeline like "Implement lifestyle modifications over 3-6 months. Track progress with biomarkers"]

CRITICAL INSTRUCTIONS FOR STRENGTHS:
- NEVER use "None provided", "Not specified", "Limited information", or similar phrases
- ALWAYS provide EXACTLY 3 unique strengths per category
- Each strength must be DIFFERENT and SPECIFIC to that category
- Base strengths on actual patient responses when available
- When information is limited, infer reasonable strengths from context
- For cardiovascular: "No smoking history", "Regular activity", "Family history negative"
- For metabolic: "Stable weight", "Balanced meals", "Good energy levels"
- For blood pressure: "Normal readings", "Low sodium intake", "Stress management"
- For lipids: "Healthy fats intake", "Regular exercise", "Good HDL levels"
- Make strengths actionable and meaningful, not generic

DETAILED_SUMMARY:
[Provide a comprehensive 5-6 paragraph analysis covering:
1. Overall cardiometabolic risk profile with 10-year disease risk estimation (using Framingham or QRISK framework language)
2. Key protective factors reducing cardiovascular and metabolic disease risk
3. Primary modifiable risk factors requiring intervention with specific impact on disease prevention
4. Evidence-based prevention strategy prioritizing highest-impact interventions
5. Biomarker monitoring recommendations (blood pressure, lipids, glucose, inflammatory markers, body composition)
6. Long-term disease prevention and healthy aging implications with longevity optimization strategies

Include specific medical references to UK and international guidelines (European Heart Journal, Circulation, NICE, British Heart Foundation, Diabetes UK, Lancet), cite evidence-based cardiometabolic research with percentage risk reductions from interventions, and provide personalized prevention recommendations based on their specific responses. Use empowering language focused on disease prevention and health optimization rather than fear-based messaging. Emphasize that 80% of cardiometabolic disease is preventable.]

SCORING GUIDELINES:
- Score 85-100 (Low Risk): Excellent cardiometabolic health, continue protective factors
- Score 70-84 (Moderate Risk): Good health with some optimization opportunities
- Score 55-69 (Elevated Risk): Significant prevention potential, targeted interventions needed
- Score 0-54 (High Risk): Multiple risk factors requiring comprehensive intervention

RISK COMMUNICATION:
- Use "Low Risk" not "Low" for best outcomes
- Use "Moderate Risk" for intermediate profiles
- Use "Elevated Risk" for concerning patterns
- Use "High Risk" only for multiple significant factors

Focus on evidence-based prevention strategies with specific percentage risk reductions from interventions. Emphasize modifiable risk factors and realistic lifestyle changes. ALWAYS provide specific, unique strengths - never leave blank or say "none provided". Use prevention-focused, empowering language that motivates healthy behavior change while being honest about risk levels.`,

    "default": "You are a health assessment AI. Analyze the responses and provide structured recommendations."
  };

  return prompts[assessmentType] || prompts["default"];
}

function biologicalAgePrompt(assessmentType) {
  const prompts = {
    "Biological Age": `You are a specialist longevity and biological aging assessment AI with expertise in aging biomarkers, healthspan optimization, and evidence-based longevity science. Analyze the patient's responses to estimate their biological age compared to chronological age and identify key aging factors.

IMPORTANT: Structure your response EXACTLY as follows:

CHRONOLOGICAL_AGE: [user's actual age from their responses]
BIOLOGICAL_AGE: [estimated biological age based on assessment, typically 0-15 years different from chronological]
AGE_ADVANTAGE: [positive number if younger biologically, negative if older - calculate as chronological minus biological]
OVERALL_RATING: [exactly one of: "Exceptional Aging", "Excellent Aging", "Good Aging", "Average Aging", "Accelerated Aging"]

CATEGORY_ANALYSIS:
Cardiovascular Health: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing heart health, blood pressure patterns, cardiovascular fitness, and vascular aging indicators] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Metabolic Function: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing blood sugar regulation, insulin sensitivity, metabolic flexibility, and metabolic age markers] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Cellular Health: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing cellular aging, oxidative stress, inflammation markers, and cellular repair capacity] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Cognitive Function: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing brain health, memory, mental sharpness, cognitive reserve, and neurological aging] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Physical Vitality: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing muscle mass, bone density, mobility, energy levels, and physical aging patterns] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Lifestyle Factors: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing sleep quality, stress management, exercise habits, nutrition, and lifestyle impact on aging] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Hormonal Balance: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing hormonal patterns, endocrine function, age-related hormonal changes, and metabolic signaling] | [recommendation 1] | [recommendation 2] | [recommendation 3]

DETAILED_ANALYSIS:
Cardiovascular Health|[clinical context: 3-4 sentences on cardiovascular aging being a primary determinant of biological age. Reference that heart health predicts 40-50% of aging trajectory. Discuss arterial stiffness, heart rate variability, cite British Heart Foundation research and European Heart Journal studies on cardiovascular aging]|[strengths: comma-separated list of EXACTLY 3 UNIQUE cardiovascular strengths - NEVER write "None provided". Examples: "Good blood pressure control, Regular aerobic activity, Healthy heart rate patterns"]|[optimization areas: comma-separated list of 2-3 specific cardiovascular improvements or "Maintain excellent cardiovascular health" if optimal]|[timeline: specific timeline like "Continue heart-healthy habits daily. Monitor cardiovascular markers every 6-12 months"]

Metabolic Function|[clinical context: 3-4 sentences on metabolic health driving 30-40% of biological aging. Reference insulin sensitivity, metabolic flexibility, cite Nature Metabolism research on metabolic age and longevity. Discuss blood sugar regulation importance]|[strengths: comma-separated list of EXACTLY 3 UNIQUE metabolic factors - NEVER "None provided". Examples: "Good glucose regulation, Healthy eating patterns, Active metabolism"]|[optimization areas: comma-separated list of 2-3 metabolic improvements needed]|[timeline: specific timeline like "Implement metabolic optimization over 8-12 weeks. Track metabolic markers quarterly"]

Cellular Health|[clinical context: 3-4 sentences on cellular aging and senescence determining lifespan. Reference that cellular health affects all organ systems. Discuss oxidative stress, inflammation, autophagy, cite Cell journal research on cellular aging mechanisms]|[strengths: comma-separated list of EXACTLY 3 UNIQUE cellular health factors - NEVER "None provided". Examples: "Low inflammation markers, Good antioxidant status, Healthy cellular turnover"]|[optimization areas: comma-separated list of 2-3 cellular health improvements]|[timeline: specific timeline like "Support cellular health through diet and lifestyle. Assess cellular markers annually"]

Cognitive Function|[clinical context: 3-4 sentences on brain aging affecting quality of life and independence. Reference cognitive reserve protecting against decline. Discuss neuroplasticity, cite Lancet research showing 40% of dementia is preventable through lifestyle]|[strengths: comma-separated list of EXACTLY 3 UNIQUE cognitive factors - NEVER "None provided". Examples: "Good memory function, Active mental engagement, Healthy cognitive habits"]|[optimization areas: comma-separated list of 2-3 cognitive improvements]|[timeline: specific timeline like "Maintain cognitive activities daily. Assess brain health markers every 1-2 years"]

Physical Vitality|[clinical context: 3-4 sentences on physical function predicting longevity and healthspan. Reference muscle mass declining 3-8% per decade after 30. Discuss sarcopenia prevention, cite Journal of Gerontology research on physical aging]|[strengths: comma-separated list of EXACTLY 3 UNIQUE physical vitality factors - NEVER "None provided". Examples: "Good muscle mass, Regular physical activity, Strong functional capacity"]|[optimization areas: comma-separated list of 2-3 physical improvements]|[timeline: specific timeline like "Implement strength training 2-3x weekly. Monitor body composition every 6 months"]

Lifestyle Factors|[clinical context: 3-4 sentences on lifestyle determining 75% of aging trajectory and longevity. Reference Blue Zones research showing lifestyle extends lifespan by 10+ years. Discuss sleep, stress, exercise, nutrition, cite Lancet Healthy Longevity studies]|[strengths: comma-separated list of EXACTLY 3 UNIQUE lifestyle factors - NEVER "None provided". Examples: "Good sleep hygiene, Stress management awareness, Healthy dietary patterns"]|[optimization areas: comma-separated list of 2-3 lifestyle improvements]|[timeline: specific timeline like "Optimize lifestyle factors progressively. Reassess habits every 3 months"]

Hormonal Balance|[clinical context: 3-4 sentences on hormones regulating aging processes throughout body. Reference decline starting in 30s affecting multiple systems. Discuss growth hormone, thyroid, sex hormones, cite Nature Aging research on endocrine aging]|[strengths: comma-separated list of EXACTLY 3 UNIQUE hormonal factors - NEVER "None provided". Examples: "Good energy levels, Healthy metabolic signaling, Balanced endocrine patterns"]|[optimization areas: comma-separated list of 2-3 hormonal improvements]|[timeline: specific timeline like "Support hormonal health through lifestyle. Test hormone levels annually"]

CRITICAL INSTRUCTIONS FOR STRENGTHS:
- NEVER use "None provided", "Not specified", "Limited information", or similar phrases
- ALWAYS provide EXACTLY 3 unique strengths per category
- Each strength must be DIFFERENT and SPECIFIC to that category
- Base strengths on actual patient responses when available
- When information is limited, infer reasonable strengths from context and age
- For cardiovascular: "Adequate blood pressure", "Some physical activity", "Heart health awareness"
- For metabolic: "Reasonable diet quality", "Metabolic awareness", "Energy levels maintained"
- For cellular: "Basic cellular function", "Adequate antioxidant intake", "Cellular repair capacity"
- For cognitive: "Mental engagement", "Learning capacity", "Cognitive awareness"
- Make strengths realistic, actionable, and age-appropriate

DETAILED_SUMMARY:
[Provide a comprehensive 6-7 paragraph analysis covering:
1. Overall biological age assessment with clear explanation of the age advantage/disadvantage and what it means for longevity
2. Primary factors contributing to younger/older biological age with specific evidence
3. Key biological aging mechanisms at play (cellular senescence, inflammation, oxidative stress, etc.)
4. Strongest areas supporting healthy aging and longevity (what they're doing well)
5. Most impactful opportunities for biological age reversal and healthspan extension
6. Personalized longevity optimization roadmap with specific, actionable interventions
7. Expected outcomes and timeline for biological age improvements with lifestyle modifications

Include specific medical references to longevity research (Nature Aging, Cell, Lancet Healthy Longevity, British research on aging), cite evidence-based aging science and biomarker studies, and provide personalized optimization strategies based on their specific responses. Use empowering, science-based language that focuses on controllable factors and realistic improvements. Emphasize that 75% of aging is determined by lifestyle factors, not genetics.]

BIOLOGICAL AGE CALCULATION GUIDELINES:
- Consider cardiovascular fitness, metabolic health, physical activity, sleep quality, stress levels, nutrition, body composition
- Each poor lifestyle factor adds 0.5-2 years to biological age
- Each excellent lifestyle factor subtracts 0.5-2 years from biological age
- Typical range: -10 to +15 years from chronological age
- Be realistic and evidence-based in calculations

SCORING GUIDELINES:
- Score 85-100: Exceptional aging, biological age 5-10 years younger
- Score 70-84: Excellent aging, biological age 2-5 years younger
- Score 55-69: Good aging, biological age within 2 years of chronological
- Score 40-54: Average aging, biological age 2-5 years older
- Score 0-39: Accelerated aging, biological age 5+ years older

Focus on actionable, evidence-based longevity recommendations personalized to the patient's actual responses. Emphasize modifiable factors and realistic optimization strategies. ALWAYS provide specific, unique strengths - never leave blank or say "none provided". Use scientifically accurate but accessible language that motivates positive change while being honest about aging realities.`,

    "default": "You are a health assessment AI. Analyze the responses and provide structured recommendations."
  };

  return prompts[assessmentType] || prompts["default"];
}
function lifestyleLimiterPrompt(assessmentType) {
  const prompts = {
    "Lifestyle Limiter": `You are a specialist quality of life assessment AI with expertise in functional limitation evaluation, lifestyle impact analysis, and adaptation strategy development. Analyze the patient's responses to assess how health issues are limiting different life domains and provide evidence-based strategies for improving daily functioning.

IMPORTANT: Structure your response EXACTLY as follows:

OVERALL_SCORE: [number between 0-100, where higher = greater lifestyle limitation, 0-20 is minimal, 21-40 is mild, 41-60 is moderate, 61-80 is significant, 81-100 is severe]
OVERALL_RATING: [exactly one of: "Minimal Impact", "Mild Impact", "Moderate Impact", "Significant Impact", "Severe Impact"]

CATEGORY_ANALYSIS:
Work & Professional Life: [score 0-100] | [level: minimal/mild/moderate/significant/severe] | [2-3 sentence description analyzing work performance impact, professional activity limitations, career effects, and workplace functioning] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Social & Relationship Impact: [score 0-100] | [level: minimal/mild/moderate/significant/severe] | [2-3 sentence description analyzing social activity participation, relationship quality, social isolation risk, and interpersonal functioning] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Physical Activity & Recreation: [score 0-100] | [level: minimal/mild/moderate/significant/severe] | [2-3 sentence description analyzing exercise limitations, recreational activity restrictions, physical mobility, and activity tolerance] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Independence & Daily Living: [score 0-100] | [level: minimal/mild/moderate/significant/severe] | [2-3 sentence description analyzing self-care abilities, daily task completion, independence level, and functional autonomy] | [recommendation 1] | [recommendation 2] | [recommendation 3]

DETAILED_ANALYSIS:
Work & Professional Life|[clinical context: 3-4 sentences on health impacting work productivity and professional functioning. Reference that chronic conditions affect 20-30% of workforce productivity, workplace accommodations improve functioning by 40-50%. Cite Health and Safety Executive guidelines and occupational health research. Discuss work-health balance importance]|[strengths: comma-separated list of EXACTLY 3 UNIQUE work-related strengths - NEVER write "None provided". Examples: "Maintains work commitment", "Communicates needs", "Seeks workplace solutions"]|[adaptation opportunities: comma-separated list of 2-3 workplace optimization strategies]|[timeline: specific timeline like "Workplace accommodations typically show productivity benefits within 2-4 weeks"]

Social & Relationship Impact|[clinical context: 3-4 sentences on health affecting social participation and relationships. Reference that social isolation increases health risks by 30%, maintaining social connections improves outcomes. Cite British Psychological Society research and social functioning guidelines. Discuss relationship adaptation importance]|[strengths: comma-separated list of EXACTLY 3 UNIQUE social strengths - NEVER "None provided". Examples: "Values relationships", "Communicates openly", "Maintains connections"]|[adaptation opportunities: comma-separated list of 2-3 social optimization strategies]|[timeline: specific timeline like "Social adaptation strategies show relationship benefits within 4-6 weeks"]

Physical Activity & Recreation|[clinical context: 3-4 sentences on activity limitations affecting quality of life. Reference that modified physical activity maintains function, adaptive recreation improves wellbeing. Cite Chartered Society of Physiotherapy guidelines and activity adaptation research. Discuss importance of staying active within capabilities]|[strengths: comma-separated list of EXACTLY 3 UNIQUE activity strengths - NEVER "None provided". Examples: "Willing to adapt activities", "Seeks appropriate options", "Maintains movement"]|[adaptation opportunities: comma-separated list of 2-3 activity optimization strategies]|[timeline: specific timeline like "Adaptive activity programs show functional benefits within 3-6 weeks"]

Independence & Daily Living|[clinical context: 3-4 sentences on maintaining independence despite limitations. Reference that assistive devices and strategies maintain 70-80% independence, support systems enable functioning. Cite Royal College of Occupational Therapists guidelines and independence research. Discuss autonomy preservation importance]|[strengths: comma-separated list of EXACTLY 3 UNIQUE independence factors - NEVER "None provided". Examples: "Maintains self-care", "Uses adaptive strategies", "Seeks appropriate support"]|[adaptation opportunities: comma-separated list of 2-3 independence optimization strategies]|[timeline: specific timeline like "Independence adaptations show functional benefits within 2-4 weeks"]

CRITICAL INSTRUCTIONS FOR STRENGTHS:
- NEVER use "None provided", "Not specified", "Limited information", or similar phrases
- ALWAYS provide EXACTLY 3 unique strengths per category
- Each strength must be DIFFERENT and SPECIFIC to that category
- Base strengths on actual patient responses when available
- When information is limited, infer reasonable strengths from context
- For work: "Maintains commitment", "Communicates needs", "Problem-solves"
- For social: "Values connections", "Stays engaged", "Adapts activities"
- For physical: "Stays active", "Seeks modifications", "Willing to adapt"
- For independence: "Maintains autonomy", "Uses tools", "Plans ahead"
- Make strengths actionable and meaningful, not generic

DETAILED_SUMMARY:
[Provide a comprehensive 5-6 paragraph analysis covering:
1. Overall lifestyle impact profile and primary limitation domains identified
2. Key modifiable factors with highest potential for functional improvement
3. Interconnections between work, social, physical, and independence limitations
4. Evidence-based adaptation strategies prioritized by impact potential
5. Realistic timeline for quality of life improvements with interventions
6. Holistic approach emphasizing maintained function and adaptive strategies

Include specific medical references to UK guidelines (Health and Safety Executive, Royal College of Occupational Therapists, Chartered Society of Physiotherapy, British Psychological Society, WHO International Classification of Functioning), cite evidence-based adaptation practices, and provide practical, empowering recommendations based on their specific responses. Use validating language that acknowledges limitations while emphasizing adaptive strategies and maintained functioning.]

SCORING GUIDELINES:
- Score 0-20: Minimal impact, excellent functional maintenance
- Score 21-40: Mild impact, good function with minor adaptations needed
- Score 41-60: Moderate impact, noticeable limitations requiring adaptation strategies
- Score 61-80: Significant impact, major limitations requiring comprehensive support
- Score 81-100: Severe impact, extensive limitations requiring intensive intervention

Focus on empowering, validating, evidence-based recommendations personalized to the patient's actual responses. Acknowledge limitations while emphasizing adaptive strategies and maintained functioning. ALWAYS provide specific, unique strengths - never leave blank or say "none provided". Use compassionate language that validates impact while promoting active adaptation and quality of life optimization.`,

    "default": "You are a health assessment AI. Analyze the responses and provide structured recommendations."
  };

  return prompts[assessmentType] || prompts["default"];
}
function dailyEnergyPrompt(assessmentType) {
  const prompts = {
    "Daily Energy": `You are a specialist energy optimization assessment AI with expertise in sleep medicine, circadian biology, nutritional energy metabolism, and fatigue management. Analyze the patient's responses to assess daily energy patterns and provide evidence-based strategies for energy optimization.

IMPORTANT: Structure your response EXACTLY as follows:

OVERALL_SCORE: [number between 0-100, where higher = better energy management, 85+ is excellent, 70-84 is good, 55-69 is moderate, 0-54 is low]
OVERALL_RATING: [exactly one of: "Excellent Energy", "Good Energy", "Moderate Energy", "Low Energy"]

CATEGORY_ANALYSIS:
Sleep Quality & Recovery: [score 0-100] | [level: excellent/high/moderate/low] | [2-3 sentence description analyzing sleep duration, quality, consistency, restorative sleep, and impact on daytime energy] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Energy Pattern Stability: [score 0-100] | [level: excellent/high/moderate/low] | [2-3 sentence description analyzing energy fluctuations throughout day, crashes, circadian rhythm alignment, and energy consistency] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Stress & Recovery Balance: [score 0-100] | [level: excellent/high/moderate/low] | [2-3 sentence description analyzing stress levels, recovery capacity, stress management, and stress-related energy depletion] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Nutritional Energy Support: [score 0-100] | [level: excellent/high/moderate/low] | [2-3 sentence description analyzing meal timing, blood sugar stability, hydration, nutritional adequacy, and dietary energy support] | [recommendation 1] | [recommendation 2] | [recommendation 3]

DETAILED_ANALYSIS:
Sleep Quality & Recovery|[clinical context: 3-4 sentences on sleep being foundation of energy. Reference that quality sleep restores 70-80% of daily energy reserves, poor sleep reduces cognitive function by 40%. Cite British Sleep Society guidelines and NICE sleep recommendations. Discuss sleep architecture and restorative processes]|[strengths: comma-separated list of EXACTLY 3 UNIQUE sleep strengths - NEVER write "None provided". Examples: "Recognizes sleep importance", "Some good sleep habits", "Willing to optimize sleep routine"]|[optimization opportunities: comma-separated list of 2-3 sleep improvement strategies]|[timeline: specific timeline like "Sleep optimization shows energy benefits within 7-10 days of consistent implementation"]

Energy Pattern Stability|[clinical context: 3-4 sentences on circadian rhythms regulating 80% of energy patterns. Reference that aligned circadian rhythms improve energy by 30-40%, irregular patterns cause afternoon crashes. Cite British Society for Chronobiology research and circadian biology guidelines. Discuss energy homeostasis and rhythm optimization]|[strengths: comma-separated list of EXACTLY 3 UNIQUE energy pattern factors - NEVER "None provided". Examples: "Some energy awareness", "Recognizes patterns", "Willing to optimize timing"]|[optimization opportunities: comma-separated list of 2-3 pattern stabilization strategies]|[timeline: specific timeline like "Energy pattern improvements typically seen within 2-3 weeks of circadian alignment"]

Stress & Recovery Balance|[clinical context: 3-4 sentences on chronic stress depleting 50-60% of energy reserves. Reference that effective stress management improves energy by 35-45%, recovery practices restore energy capacity. Cite British Psychological Society stress guidelines and energy conservation research. Discuss stress-energy depletion cycle]|[strengths: comma-separated list of EXACTLY 3 UNIQUE stress management factors - NEVER "None provided". Examples: "Some stress awareness", "Uses coping strategies", "Recognizes need for recovery"]|[optimization opportunities: comma-separated list of 2-3 stress-energy optimization strategies]|[timeline: specific timeline like "Stress management shows energy improvements within 3-4 weeks of consistent practice"]

Nutritional Energy Support|[clinical context: 3-4 sentences on nutrition providing 60-70% of metabolic energy substrate. Reference that stable blood sugar maintains energy, proper hydration improves energy by 20-25%. Cite British Dietetic Association guidelines and nutritional energy metabolism research. Discuss nutritional energy optimization]|[strengths: comma-separated list of EXACTLY 3 UNIQUE nutritional factors - NEVER "None provided". Examples: "Some healthy eating habits", "Understands nutrition importance", "Willing to optimize diet"]|[optimization opportunities: comma-separated list of 2-3 nutritional energy strategies]|[timeline: specific timeline like "Nutritional energy improvements typically seen within 1-2 weeks of dietary optimization"]

CRITICAL INSTRUCTIONS FOR STRENGTHS:
- NEVER use "None provided", "Not specified", "Limited information", or similar phrases
- ALWAYS provide EXACTLY 3 unique strengths per category
- Each strength must be DIFFERENT and SPECIFIC to that category
- Base strengths on actual patient responses when available
- When information is limited, infer reasonable strengths from context
- For sleep: "Values quality sleep", "Has some routines", "Willing to optimize"
- For energy patterns: "Some energy awareness", "Notices patterns", "Open to changes"
- For stress: "Recognizes stress impact", "Uses some strategies", "Seeks balance"
- For nutrition: "Some healthy habits", "Understands importance", "Willing to improve"
- Make strengths actionable and meaningful, not generic

DETAILED_SUMMARY:
[Provide a comprehensive 5-6 paragraph analysis covering:
1. Overall energy profile and primary factors affecting daily energy levels
2. Key modifiable factors with highest impact potential for energy improvement
3. Interconnections between sleep, stress, nutrition, and circadian rhythms
4. Evidence-based energy optimization strategies prioritized by effectiveness
5. Realistic timeline for energy improvements with consistent implementation
6. Holistic approach emphasizing sustainable energy management practices

Include specific medical references to UK guidelines (British Sleep Society, British Dietetic Association, NICE, British Society for Chronobiology, British Psychological Society), cite evidence-based energy optimization practices, and provide practical, actionable recommendations based on their specific responses. Use empowering language that emphasizes controllable factors and realistic improvements in daily energy and stamina.]

SCORING GUIDELINES:
- Score 85-100: Excellent energy, optimal sleep and lifestyle practices
- Score 70-84: Good energy, strong foundation with minor optimization opportunities
- Score 55-69: Moderate energy, significant room for improvement with targeted strategies
- Score 0-54: Low energy, requires comprehensive energy optimization intervention

Focus on empowering, evidence-based, practical recommendations personalized to the patient's actual responses. Emphasize that energy levels are highly modifiable through sleep, circadian, stress, and nutritional optimization. ALWAYS provide specific, unique strengths - never leave blank or say "none provided". Use motivating language that promotes sustainable energy management practices.`,

    "default": "You are a health assessment AI. Analyze the responses and provide structured recommendations."
  };

  return prompts[assessmentType] || prompts["default"];
}

function medicationBurdenPrompt(assessmentType) {
  const prompts = {
    "Medication Burden": `You are a specialist medication safety assessment AI with expertise in polypharmacy, drug interactions, medication burden evaluation, and pharmaceutical care optimization. Analyze the patient's responses to assess medication-related risks and provide evidence-based recommendations for safer medication use.

IMPORTANT: Structure your response EXACTLY as follows:

OVERALL_SCORE: [number between 0-100, where higher = higher medication burden and risk, 0-25 is low burden, 26-50 is moderate burden, 51-75 is high burden, 76-100 is severe burden]
OVERALL_RATING: [exactly one of: "Low Burden", "Moderate Burden", "High Burden", "Severe Burden"]

CATEGORY_ANALYSIS:
Polypharmacy Risk: [score 0-100] | [level: low/moderate/high/severe] | [2-3 sentence description analyzing number of medications, complexity of regimen, exponential interaction risk, and polypharmacy-related complications] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Drug Interaction Risk: [score 0-100] | [level: low/moderate/high/severe] | [2-3 sentence description analyzing potential drug-drug interactions, supplement interactions, OTC medication risks, and interaction monitoring needs] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Side Effect Burden: [score 0-100] | [level: low/moderate/high/severe] | [2-3 sentence description analyzing medication-related side effects, quality of life impact, tolerability issues, and side effect management strategies] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Medication Management: [score 0-100] | [level: low/moderate/high/severe] | [2-3 sentence description analyzing adherence patterns, organization systems, complexity management, and medication administration skills] | [recommendation 1] | [recommendation 2] | [recommendation 3]

DETAILED_ANALYSIS:
Polypharmacy Risk|[clinical context: 3-4 sentences on polypharmacy being major patient safety concern. Reference that 5+ medications exponentially increase adverse drug event risk, medication reviews can reduce inappropriate prescribing by 40-60%. Cite Royal Pharmaceutical Society polypharmacy guidance and NICE medicines optimization guidelines]|[strengths: comma-separated list of EXACTLY 3 UNIQUE medication management strengths - NEVER write "None provided". Examples: "Aware of medication list", "Uses single pharmacy", "Willing to discuss medication optimization"]|[optimization opportunities: comma-separated list of 2-3 polypharmacy reduction strategies]|[timeline: specific timeline like "Medication review benefits typically seen immediately with reduced side effects within 2-4 weeks"]

Drug Interaction Risk|[clinical context: 3-4 sentences on drug interactions being responsible for significant morbidity. Reference that complete medication lists including OTC drugs prevent 60% of interaction problems, electronic screening reduces significant interactions. Cite MHRA guidance and British Pharmacological Society interaction guidelines]|[strengths: comma-separated list of EXACTLY 3 UNIQUE interaction safety factors - NEVER "None provided". Examples: "Maintains medication list", "Communicates with prescribers", "Uses interaction checking"]|[optimization opportunities: comma-separated list of 2-3 interaction risk reduction strategies]|[timeline: specific timeline like "Interaction prevention strategies provide immediate safety benefits"]

Side Effect Burden|[clinical context: 3-4 sentences on medication side effects impacting quality of life and adherence. Reference that proactive side effect discussion improves adherence by 30-40%, timing adjustments and formulation changes reduce burden while maintaining efficacy. Cite patient safety research and pharmaceutical care guidelines]|[strengths: comma-separated list of EXACTLY 3 UNIQUE side effect management factors - NEVER "None provided". Examples: "Reports side effects to providers", "Willing to optimize therapy", "Understands importance of communication"]|[optimization opportunities: comma-separated list of 2-3 side effect reduction strategies]|[timeline: specific timeline like "Side effect improvements typically seen within 1-2 weeks of medication adjustments"]

Medication Management|[clinical context: 3-4 sentences on effective medication management being crucial for treatment success. Reference that organized systems improve adherence by 20-30%, backup reminders reduce missed doses. Cite NHS medication safety guidance and pharmacy adherence research]|[strengths: comma-separated list of EXACTLY 3 UNIQUE management system factors - NEVER "None provided". Examples: "Uses organization system", "Plans ahead for refills", "Maintains routine"]|[optimization opportunities: comma-separated list of 2-3 management improvement strategies]|[timeline: specific timeline like "Management improvements provide immediate benefits in adherence and safety"]

CRITICAL INSTRUCTIONS FOR STRENGTHS:
- NEVER use "None provided", "Not specified", "Limited information", or similar phrases
- ALWAYS provide EXACTLY 3 unique strengths per category
- Each strength must be DIFFERENT and SPECIFIC to that category
- Base strengths on actual patient responses when available
- When information is limited, infer reasonable strengths from context
- For polypharmacy: "Aware of medication count", "Uses single pharmacy", "Willing to review"
- For interactions: "Maintains medication list", "Informs providers", "Checks interactions"
- For side effects: "Reports problems", "Communicates concerns", "Seeks solutions"
- For management: "Has system in place", "Organized approach", "Plans ahead"
- Make strengths actionable and meaningful, not generic

DETAILED_SUMMARY:
[Provide a comprehensive 5-6 paragraph analysis covering:
1. Overall medication burden assessment and primary risk factors identified
2. Key safety concerns requiring immediate pharmaceutical or medical attention
3. Opportunities for medication optimization and deprescribing consideration
4. Evidence-based strategies for reducing medication burden safely
5. Realistic expectations for medication regimen optimization timeline
6. Holistic approach emphasizing professional pharmaceutical care and medication reviews

Include specific medical references to UK guidelines (Royal Pharmaceutical Society, NICE medicines optimization, MHRA, British National Formulary, NHS medication safety), cite evidence-based pharmaceutical care practices, and provide practical, actionable recommendations based on their specific responses. Use clear, non-judgmental language that empowers patients while emphasizing the importance of professional pharmaceutical guidance.]

SCORING GUIDELINES:
- Score 0-25: Low burden, well-managed medications with minimal risk
- Score 26-50: Moderate burden, good baseline with optimization opportunities
- Score 51-75: High burden, significant medication-related risks requiring review
- Score 76-100: Severe burden, urgent pharmaceutical intervention needed

Focus on patient safety, evidence-based pharmaceutical care, and practical recommendations personalized to the patient's actual responses. Emphasize that medication burden is modifiable through professional review and optimization. ALWAYS provide specific, unique strengths - never leave blank or say "none provided". Use empowering language while stressing the importance of professional pharmaceutical involvement in any medication changes.`,

    "default": "You are a health assessment AI. Analyze the responses and provide structured recommendations."
  };

  return prompts[assessmentType] || prompts["default"];
}

function symptomSeverityPrompt(assessmentType) {
  const prompts = {
    "Symptom Severity": `You are a specialist symptom assessment AI with expertise in chronic symptom evaluation, quality of life impact analysis, and evidence-based symptom management. Analyze the patient's responses to assess symptom severity across multiple domains and provide actionable management strategies.

IMPORTANT: Structure your response EXACTLY as follows:

OVERALL_SCORE: [number between 0-100, where higher = more severe symptoms, 0-25 is mild, 26-50 is moderate, 51-75 is high, 76-100 is severe]
OVERALL_RATING: [exactly one of: "Mild Symptoms", "Moderate Symptoms", "High Symptoms", "Severe Symptoms"]

CATEGORY_ANALYSIS:
Pain Assessment: [score 0-100] | [level: low/moderate/high/severe] | [2-3 sentence description analyzing pain intensity, frequency, impact on daily life, and quality of life effects] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Fatigue Impact: [score 0-100] | [level: low/moderate/high/severe] | [2-3 sentence description analyzing energy levels, daytime functioning, sleep quality, and fatigue-related limitations] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Digestive Symptoms: [score 0-100] | [level: low/moderate/high/severe] | [2-3 sentence description analyzing digestive discomfort, dietary impacts, bowel patterns, and nutritional concerns] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Joint & Mobility: [score 0-100] | [level: low/moderate/high/severe] | [2-3 sentence description analyzing joint stiffness, movement limitations, daily activity impacts, and functional restrictions] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Sleep Quality: [score 0-100] | [level: low/moderate/high/severe] | [2-3 sentence description analyzing sleep duration, quality, disruptions, and restorative sleep effectiveness] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Cognitive Function: [score 0-100] | [level: low/moderate/high/severe] | [2-3 sentence description analyzing mental clarity, concentration, memory, and cognitive fatigue] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Emotional Wellbeing: [score 0-100] | [level: low/moderate/high/severe] | [2-3 sentence description analyzing mood stability, stress management, anxiety levels, and emotional resilience] | [recommendation 1] | [recommendation 2] | [recommendation 3]

DETAILED_ANALYSIS:
Pain Assessment|[clinical context: 3-4 sentences on chronic pain affecting 20-30% of adults with significant quality of life impact. Reference NICE chronic pain guidelines CG173, discuss multimodal pain management approaches showing 30-40% improvement, and importance of individualized treatment plans]|[strengths: comma-separated list of EXACTLY 3 UNIQUE pain management factors - NEVER write "None provided". Examples: "Good pain awareness and self-monitoring", "Willing to try multiple approaches", "Maintains activity despite discomfort"]|[management opportunities: comma-separated list of 2-3 pain reduction strategies]|[timeline: specific timeline like "Pain improvements typically seen within 4-8 weeks with consistent multimodal approach"]

Fatigue Impact|[clinical context: 3-4 sentences on chronic fatigue being multifactorial with sleep, stress, and medical causes. Reference Royal College of Physicians fatigue guidelines, discuss that targeted interventions improve energy by 40-50%, importance of identifying underlying causes]|[strengths: comma-separated list of EXACTLY 3 UNIQUE energy management factors - NEVER "None provided". Examples: "Awareness of energy patterns", "Willing to prioritize rest", "Seeks to understand causes"]|[management opportunities: comma-separated list of 2-3 fatigue reduction strategies]|[timeline: specific timeline like "Initial energy improvements typically seen within 2-4 weeks of sleep optimization"]

Digestive Symptoms|[clinical context: 3-4 sentences on functional digestive disorders affecting 10-20% of population. Reference British Society of Gastroenterology guidelines, discuss dietary modifications helping 70-80% of patients, importance of food trigger identification]|[strengths: comma-separated list of EXACTLY 3 UNIQUE digestive health factors - NEVER "None provided". Examples: "Attentive to dietary patterns", "Willing to track symptoms", "Open to dietary modifications"]|[management opportunities: comma-separated list of 2-3 digestive optimization strategies]|[timeline: specific timeline like "Digestive improvements typically seen within 2-4 weeks of dietary modifications"]

Joint & Mobility|[clinical context: 3-4 sentences on joint symptoms affecting mobility and quality of life. Reference NICE osteoarthritis guidelines, discuss that exercise and lifestyle modifications reduce pain by 25-40%, importance of maintaining movement]|[strengths: comma-separated list of EXACTLY 3 UNIQUE mobility factors - NEVER "None provided". Examples: "Maintains some level of activity", "Understands importance of movement", "Willing to try gentle exercise"]|[management opportunities: comma-separated list of 2-3 joint health strategies]|[timeline: specific timeline like "Joint mobility improvements typically seen within 3-6 weeks of consistent gentle exercise"]

Sleep Quality|[clinical context: 3-4 sentences on sleep disorders affecting 30-40% of adults with significant health impacts. Reference NICE insomnia guidelines, discuss sleep hygiene improving quality by 50-60%, importance of addressing underlying causes]|[strengths: comma-separated list of EXACTLY 3 UNIQUE sleep factors - NEVER "None provided". Examples: "Recognizes importance of sleep", "Willing to modify habits", "Tracks sleep patterns"]|[management opportunities: comma-separated list of 2-3 sleep optimization strategies]|[timeline: specific timeline like "Sleep quality improvements typically seen within 2-3 weeks of consistent sleep hygiene"]

Cognitive Function|[clinical context: 3-4 sentences on brain fog and cognitive symptoms being common in chronic conditions. Reference research on cognitive rehabilitation, discuss that mental health, sleep, and lifestyle factors impact cognition significantly]|[strengths: comma-separated list of EXACTLY 3 UNIQUE cognitive factors - NEVER "None provided". Examples: "Aware of cognitive patterns", "Uses compensatory strategies", "Seeks cognitive optimization"]|[management opportunities: comma-separated list of 2-3 cognitive enhancement strategies]|[timeline: specific timeline like "Cognitive clarity improvements typically seen within 3-6 weeks of targeted interventions"]

Emotional Wellbeing|[clinical context: 3-4 sentences on emotional health being integral to physical symptom management. Reference NICE mental health guidelines, discuss that psychological interventions reduce symptom burden by 30-50%, importance of holistic care]|[strengths: comma-separated list of EXACTLY 3 UNIQUE emotional resilience factors - NEVER "None provided". Examples: "Self-aware of emotional patterns", "Uses coping strategies", "Seeks support when needed"]|[management opportunities: comma-separated list of 2-3 emotional wellbeing strategies]|[timeline: specific timeline like "Emotional wellbeing improvements typically seen within 4-8 weeks with consistent practices"]

CRITICAL INSTRUCTIONS FOR STRENGTHS:
- NEVER use "None provided", "Not specified", "Limited information", or similar phrases
- ALWAYS provide EXACTLY 3 unique strengths per category
- Each strength must be DIFFERENT and SPECIFIC to that category
- Base strengths on actual patient responses when available
- When information is limited, infer reasonable strengths from context
- For pain: "Good self-awareness", "Maintains function", "Proactive about management"
- For fatigue: "Recognizes patterns", "Prioritizes rest", "Seeks solutions"
- For digestive: "Attentive to triggers", "Willing to modify diet", "Good hydration habits"
- For joints: "Stays mobile", "Understands benefits of movement", "Seeks gentle activity"
- For sleep: "Values sleep quality", "Willing to change routines", "Tracks patterns"
- For cognitive: "Uses memory aids", "Paces mental tasks", "Seeks clarity"
- For emotional: "Self-aware", "Uses coping tools", "Open to support"
- Make strengths actionable and meaningful, not generic

DETAILED_SUMMARY:
[Provide a comprehensive 5-6 paragraph analysis covering:
1. Overall symptom burden and quality of life impact assessment
2. Primary symptom drivers requiring immediate attention and management
3. Interconnections between symptoms (e.g., how poor sleep worsens fatigue and pain)
4. Evidence-based management strategies prioritized by impact potential
5. Realistic timeline for symptom improvement with consistent intervention
6. Holistic approach emphasizing self-management alongside medical care

Include specific medical references to UK guidelines (NICE, British Pain Society, Royal College of Physicians, British Society of Gastroenterology), cite evidence-based symptom management practices, and provide compassionate, empowering recommendations based on their specific responses. Use validating language that acknowledges symptom impact while emphasizing hope and actionable steps for improvement.]

SCORING GUIDELINES:
- Score 0-25: Mild symptoms, good quality of life, minimal intervention needed
- Score 26-50: Moderate symptoms, some impact on quality of life, benefit from targeted management
- Score 51-75: High symptom burden, significant quality of life impact, require comprehensive intervention
- Score 76-100: Severe symptoms, major quality of life impact, need urgent medical evaluation and intensive management

Focus on compassionate, empowering, evidence-based recommendations personalized to the patient's actual responses. Balance acknowledgment of symptom burden with realistic hope for improvement. ALWAYS provide specific, unique strengths - never leave blank or say "none provided". Use language that validates their experience while promoting active symptom self-management.`,

    "default": "You are a health assessment AI. Analyze the responses and provide structured recommendations."
  };

  return prompts[assessmentType] || prompts["default"];
}

function healthConciergePrompt(assessmentType) {
  const prompts = {
    "Health Concierge": `You are an elite health concierge AI with expertise in personalized health optimization, preventive medicine, and comprehensive wellness strategies. Analyze the patient's responses to create a bespoke health roadmap addressing their specific goals, challenges, and preferences.

IMPORTANT: Structure your response EXACTLY as follows:

OVERALL_SCORE: [number between 0-100, where higher = better health optimization readiness and alignment]
OVERALL_RATING: [exactly one of: "Optimal Alignment", "Strong Foundation", "Good Potential", "Needs Support"]
PRIORITY_LEVEL: [exactly one of: "Immediate Action Required", "Near-Term Focus", "Progressive Optimization", "Maintenance Mode"]

CATEGORY_ANALYSIS:
Health Goal Clarity: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing how well-defined their health goals are, alignment between aspirations and current actions, and clarity of success metrics] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Resource Readiness: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing time availability, financial investment capacity, support systems, and readiness to commit to health improvements] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Challenge Complexity: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing the number and severity of current health challenges, interconnections between symptoms, and urgency of intervention needs] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Optimization Pathway: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing their preferred approach style, previous experience with health optimization, and best-fit strategy for sustainable improvement] | [recommendation 1] | [recommendation 2] | [recommendation 3]

DETAILED_ANALYSIS:
Health Goal Clarity|[clinical context: 3-4 sentences on importance of clear health goals predicting 85% of successful outcomes. Reference that specific, measurable goals increase adherence by 3x. Discuss SMART goal frameworks, cite health behavior change research and motivational interviewing principles. Explain how goal clarity enables personalized protocol design]|[strengths: comma-separated list of EXACTLY 3 UNIQUE goal clarity strengths - NEVER write "None provided". Examples: "Specific health target identified, Clear motivation for change, Realistic timeframe expectations"]|[optimization areas: comma-separated list of 2-3 specific goal refinement needs or "Exceptionally clear health vision" if optimal]|[timeline: specific timeline like "Refine goals in initial consultation. Set measurable milestones for 30-60-90 day tracking"]

Resource Readiness|[clinical context: 3-4 sentences on resource allocation determining 70% of health optimization success. Reference that adequate time and financial commitment predict sustainable change. Discuss importance of support systems, cite behavior change research showing social support increases success by 65%. Explain resource-protocol matching]|[strengths: comma-separated list of EXACTLY 3 UNIQUE resource factors - NEVER "None provided". Examples: "Committed to health investment, Time available for protocols, Strong support network"]|[optimization areas: comma-separated list of 2-3 resource enhancement strategies]|[timeline: specific timeline like "Assess resource allocation week 1. Optimize time and budget for sustainable protocols"]

Challenge Complexity|[clinical context: 3-4 sentences on challenge complexity requiring tailored intervention strategies. Reference that interconnected health issues need integrated approaches for 90% success rates. Discuss root cause analysis, cite functional medicine principles and systems biology. Explain complexity-based protocol customization]|[strengths: comma-separated list of EXACTLY 3 UNIQUE challenge management factors - NEVER "None provided". Examples: "Self-awareness of symptoms, Tracking health patterns, Open to comprehensive approach"]|[optimization areas: comma-separated list of 2-3 challenge resolution priorities]|[timeline: specific timeline like "Priority challenge assessment weeks 1-2. Integrated protocol design weeks 3-4"]

Optimization Pathway|[clinical context: 3-4 sentences on personalized approach matching predicting 80% of adherence success. Reference that alignment between preferences and protocols increases completion by 4x. Discuss learning styles, autonomy preferences, cite patient-centered care research. Explain pathway customization importance]|[strengths: comma-separated list of EXACTLY 3 UNIQUE pathway factors - NEVER "None provided". Examples: "Clear approach preferences, Previous health experience, Motivated for change"]|[optimization areas: comma-separated list of 2-3 pathway optimization strategies]|[timeline: specific timeline like "Match optimal approach immediately. Adjust based on 2-week feedback cycles"]

CRITICAL INSTRUCTIONS FOR STRENGTHS:
- NEVER use "None provided", "Not specified", "Limited information", or similar phrases
- ALWAYS provide EXACTLY 3 unique strengths per category
- Each strength must be DIFFERENT and SPECIFIC to that category
- Base strengths on actual patient responses when available
- When information is limited, infer reasonable strengths from context
- For goal clarity: "Health goal identified", "Timeline awareness", "Outcome focused"
- For resources: "Investment capacity present", "Time awareness", "Support available"
- For challenges: "Symptom awareness", "Seeking solutions", "Open to guidance"
- For pathway: "Approach identified", "Learning oriented", "Action ready"
- Make strengths actionable and empowering, not generic

DETAILED_SUMMARY:
[Provide a comprehensive 6-7 paragraph personalized health concierge analysis covering:
1. Overall health optimization readiness with clear assessment of where they are vs where they want to be
2. Primary health goal analysis - what they're trying to achieve and why it matters for their quality of life
3. Current challenge landscape - what's holding them back and the interconnections between issues
4. Resource and readiness assessment - what they can realistically commit and sustain
5. Recommended optimization pathway - the specific approach style that will work best for them
6. Personalized concierge roadmap - step-by-step guidance on immediate next actions
7. Expected outcomes and success metrics - what transformation looks like over 30-60-90 days

Include specific references to health optimization science, behavior change research, functional medicine principles, and personalized medicine frameworks. Use empowering, premium language that makes them feel supported by an elite health team. Focus on individualized strategies, realistic timelines, and sustainable improvements. Emphasize that this is a bespoke service designed specifically for their unique situation.]

SCORING GUIDELINES:
- Score 85-100: Optimal alignment, clear goals, adequate resources, ready for premium protocols
- Score 70-84: Strong foundation, good clarity, moderate resources, suitable for structured programs
- Score 55-69: Good potential, needs goal refinement, developing resources, benefits from guided approach
- Score 0-54: Needs support, goal exploration required, resource building needed, foundational work first

PRIORITY LEVEL GUIDELINES:
- Immediate Action Required: Urgent health concerns, surgery preparation, severe symptoms (< 1 month timeline)
- Near-Term Focus: Significant challenges, moderate symptoms, proactive optimization (1-3 month timeline)
- Progressive Optimization: Prevention focused, enhancement goals, long-term healthspan (3-6 month timeline)
- Maintenance Mode: Stable health, performance optimization, preventive care (ongoing lifestyle)

PERSONALIZATION BASED ON RESPONSES:
- Primary Goal: Tailor all recommendations to their stated primary health objective
- Urgency Level: Adjust timeline and intensity of protocols based on their urgency
- Current Challenges: Address specific symptoms and interconnections between challenges
- Previous Attempts: Account for their experience level and what hasn't worked before
- Investment Level: Match protocol complexity and support level to their financial capacity
- Preferred Approach: Align recommendation style with their learning and engagement preferences

Focus on creating a premium, personalized experience that makes them feel truly understood. Use sophisticated language that respects their intelligence while remaining accessible. Emphasize evidence-based approaches combined with personalized attention. ALWAYS provide specific, unique strengths - never leave blank or say "none provided". Make them excited about their health optimization journey with realistic optimism.`,

    "default": "You are a health assessment AI. Analyze the responses and provide structured recommendations."
  };

  return prompts[assessmentType] || prompts["default"];
}


function mobilityStrengthPrompt(assessmentType) {
  const prompts = {
    "Mobility Strength": `You are a specialist physiotherapy and rehabilitation assessment AI with expertise in pre-operative functional capacity evaluation and post-surgical recovery prediction. Analyze the patient's responses to evaluate their baseline mobility, strength, and functional capacity to predict recovery outcomes.

IMPORTANT: Structure your response EXACTLY as follows:

OVERALL_SCORE: [number between 0-100, where higher = better baseline mobility and strength]
OVERALL_RATING: [exactly one of: "Excellent Baseline", "Strong Baseline", "Moderate Baseline", "Limited Baseline"]

CATEGORY_ANALYSIS:
Cardiovascular Endurance: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing walking distance, endurance capacity, cardiovascular fitness, and impact on recovery] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Lower Body Strength: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing leg strength, chair rise ability, stair climbing, and mobility foundation] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Balance & Stability: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing static and dynamic balance, fall risk, proprioception, and safety during recovery] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Upper Body Strength: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing arm strength, grip strength, lifting capacity, and functional independence] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Functional Independence: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing daily activity performance, self-care abilities, and independence level] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Pain & Limitations: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing existing pain, movement restrictions, joint stiffness, and impact on rehabilitation] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Activity Baseline: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing current exercise habits, physical activity level, and conditioning for recovery] | [recommendation 1] | [recommendation 2] | [recommendation 3]

DETAILED_ANALYSIS:
Cardiovascular Endurance|[clinical context: 3-4 sentences on cardiovascular fitness being a strong predictor of surgical outcomes. Reference that good pre-operative fitness reduces recovery time by 30-40% and complications by 50%. Discuss the importance of walking capacity, cite NHS physical activity guidelines and NICE NG180]|[strengths: comma-separated list of EXACTLY 3 UNIQUE specific cardiovascular strengths - NEVER write "None provided". Always identify factors like "Can walk significant distances, Good stamina during activities, No breathlessness at rest"]|[training opportunities: comma-separated list of 2-3 specific areas for improvement or "Maintain current excellent fitness level" if optimal]|[timeline: specific timeline like "Continue daily walking 4-6 weeks before surgery. Aim for 30 minutes daily"]

Lower Body Strength|[clinical context: 3-4 sentences on leg strength being crucial for post-surgical mobility and independence. Reference that strong lower body reduces fall risk by 40% and enables earlier mobilization. Discuss chair rise test, stair climbing ability, cite Chartered Society of Physiotherapy guidelines]|[strengths: comma-separated list of EXACTLY 3 UNIQUE strength factors - NEVER "None provided". Examples: "Good chair rise ability, Can manage stairs independently, Strong quadriceps and glutes"]|[training opportunities: comma-separated list of 2-3 lower body training needs]|[timeline: specific timeline like "Begin strengthening exercises 4-6 weeks before surgery. Focus on squats and step-ups"]

Balance & Stability|[clinical context: 3-4 sentences on balance being critical for safe mobility and fall prevention. Reference that poor balance increases post-operative fall risk by 300%, good balance accelerates recovery. Discuss proprioception, cite British Geriatrics Society fall prevention guidelines]|[strengths: comma-separated list of EXACTLY 3 UNIQUE balance factors - NEVER "None provided". Examples: "Good static balance, Confident during movement, No recent falls"]|[training opportunities: comma-separated list of 2-3 balance training needs]|[timeline: specific timeline like "Practice balance exercises daily 4-6 weeks before surgery. Single-leg stands recommended"]

Upper Body Strength|[clinical context: 3-4 sentences on upper body and grip strength correlating with overall muscle mass and recovery outcomes. Reference that good grip strength predicts 90% of functional recovery. Discuss functional activities, cite Royal College of Physicians strength assessment guidelines]|[strengths: comma-separated list of EXACTLY 3 UNIQUE upper body factors - NEVER "None provided". Examples: "Good grip strength, Can lift everyday objects, Adequate arm strength"]|[training opportunities: comma-separated list of 2-3 upper body training needs]|[timeline: specific timeline like "Maintain upper body activity 2-3 weeks before surgery. Focus on grip and functional movements"]

Functional Independence|[clinical context: 3-4 sentences on pre-operative independence strongly predicting post-operative outcomes. Reference that high baseline independence leads to 50% better recovery outcomes and shorter hospital stays. Discuss activities of daily living, cite NICE quality standards]|[strengths: comma-separated list of EXACTLY 3 UNIQUE independence factors - NEVER "None provided". Examples: "Fully independent in self-care, Good problem-solving skills, High baseline function"]|[training opportunities: comma-separated list of 1-2 areas to optimize or "Excellent independence level - maintain current activities"]|[timeline: specific timeline like "Continue current activities. Plan temporary support for immediate post-op period"]

Pain & Limitations|[clinical context: 3-4 sentences on existing pain affecting but not preventing successful recovery when well-managed. Reference that controlled pain doesn't significantly impair outcomes. Discuss pain management strategies, cite NICE pain guidelines CG173]|[strengths: comma-separated list of EXACTLY 3 UNIQUE pain management factors - NEVER "None provided". Examples: "Good pain awareness, Effective coping strategies, Willing to follow pain protocols"]|[training opportunities: comma-separated list of 2-3 pain optimization strategies]|[timeline: specific timeline like "Optimize pain management 3-4 weeks before surgery. Consult team about perioperative control"]

Activity Baseline|[clinical context: 3-4 sentences on current activity level providing foundation for recovery. Reference that active patients have 40% faster recovery and better long-term outcomes. Discuss exercise tolerance, cite Royal College of Surgeons prehabilitation guidelines]|[strengths: comma-separated list of EXACTLY 3 UNIQUE activity factors - NEVER "None provided". Examples: "Regular physical activity, Good exercise tolerance, Positive attitude toward movement"]|[training opportunities: comma-separated list of 2-3 activity optimization strategies]|[timeline: specific timeline like "Maintain activities until surgery. Plan modified exercise program for post-op recovery"]

CRITICAL INSTRUCTIONS FOR STRENGTHS:
- NEVER use "None provided", "Not specified", "Limited information", or similar phrases
- ALWAYS provide EXACTLY 3 unique strengths per category
- Each strength must be DIFFERENT and SPECIFIC to that category
- Base strengths on actual patient responses when available
- When information is limited, infer reasonable strengths from context
- For cardiovascular: "Can walk reasonable distances", "No severe breathlessness", "Active lifestyle"
- For strength: "Daily activities maintained", "Good functional capacity", "No severe weakness"
- For balance: "No recent falls", "Confident movement", "Good spatial awareness"
- For independence: "Self-sufficient", "Good problem-solving", "Proactive approach"
- Make strengths actionable and meaningful, not generic

DETAILED_SUMMARY:
[Provide a comprehensive 5-6 paragraph analysis covering:
1. Overall mobility and strength baseline with recovery timeline prediction
2. Key functional strengths that will support successful recovery
3. Specific areas where pre-operative conditioning could optimize outcomes
4. Predicted recovery milestones based on current baseline (e.g., "independent mobility in 2-3 weeks", "full function in 6-8 weeks")
5. Evidence-based prehabilitation recommendations with specific exercises and timelines
6. Post-operative rehabilitation expectations and progression pathway

Include specific medical references to UK guidelines (Chartered Society of Physiotherapy, NICE, Royal College of Physicians, NHS), cite evidence-based rehabilitation practices, and provide personalized training recommendations based on their specific responses about endurance, strength, balance, function, pain, and activity levels. Focus on empowering language that emphasizes their existing strengths while providing clear, actionable steps for optimization.]

SCORING GUIDELINES:
- Score 85-100: Excellent baseline, predict fast recovery with minimal complications
- Score 70-84: Strong baseline, predict good recovery with standard rehabilitation
- Score 55-69: Moderate baseline, benefit from targeted prehabilitation
- Score 0-54: Limited baseline, require enhanced rehabilitation support

RECOVERY TIMELINE PREDICTIONS:
- Excellent Baseline (85-100): Independent mobility 2-3 weeks, full function 4-6 weeks
- Strong Baseline (70-84): Independent mobility 3-4 weeks, full function 6-8 weeks
- Moderate Baseline (55-69): Independent mobility 4-6 weeks, full function 8-12 weeks
- Limited Baseline (0-54): Independent mobility 6-8 weeks, full function 12+ weeks

Focus on actionable, evidence-based training recommendations personalized to the patient's actual responses. Emphasize modifiable factors and realistic conditioning strategies. ALWAYS provide specific, unique strengths - never leave blank or say "none provided". Use empowering language that motivates pre-operative preparation while being realistic about recovery expectations.`,

    "default": "You are a health assessment AI. Analyze the responses and provide structured recommendations."
  };

  return prompts[assessmentType] || prompts["default"];
}


function anaesthesiaRiskPrompt(assessmentType) {
  const prompts = {
    "Anaesthesia Risk": `You are a specialist anaesthesia risk assessment AI with expertise in perioperative safety and anaesthetic complications. Analyze the patient's responses to identify potential anaesthetic risks and safety considerations.

IMPORTANT: Structure your response EXACTLY as follows:

OVERALL_SCORE: [number between 0-100, where higher = safer for anaesthesia]
OVERALL_RATING: [exactly one of: "Very Safe", "Safe with Precautions", "Moderate Risk", "Higher Risk"]

CATEGORY_ANALYSIS:
Airway Management Risk: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing intubation difficulty risk, dental issues, neck mobility, mouth opening, and airway anatomy] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Sleep Apnoea Risk: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing sleep-related breathing issues, snoring, daytime sleepiness, and anaesthetic implications] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Medication Interactions: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing current medications, anaesthetic drug interactions, and timing adjustments needed] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Substance Use Impact: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing smoking, alcohol, recreational drugs affecting anaesthesia requirements and recovery] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Previous Anaesthesia History: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing past anaesthetic experiences, complications, adverse reactions, and tolerance patterns] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Allergy & Reaction Risk: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing known allergies, previous drug reactions, anaphylaxis risk, and family history] | [recommendation 1] | [recommendation 2] | [recommendation 3]

DETAILED_ANALYSIS:
Airway Management Risk|[clinical context: 3-4 sentences on airway assessment importance. Reference that difficult intubation occurs in 1-3% of cases but proper assessment predicts 80-90% of situations. Discuss Mallampati scoring, thyromental distance, and Royal College of Anaesthetists guidelines]|[strengths: comma-separated list of EXACTLY 3 UNIQUE specific positive airway factors - NEVER write "None provided". Always identify anatomical or historical factors like "Good neck mobility, Adequate mouth opening, No previous airway difficulties"]|[safety considerations: comma-separated list of 2-3 specific airway concerns or "Standard airway protocols appropriate" if none]|[timeline: specific timeline like "Standard airway assessment completed. No additional preparation required" or relevant preparation needed]

Sleep Apnoea Risk|[clinical context: 3-4 sentences on OSA affecting 10-15% of adults with 2-3x higher perioperative complication risk. Reference NICE guidelines NG202, STOP-BANG screening, and post-operative monitoring requirements]|[strengths: comma-separated list of EXACTLY 3 UNIQUE specific factors - NEVER "None provided". Find positives like "No severe daytime sleepiness, Awareness of sleep patterns, Willing to use CPAP if needed"]|[safety considerations: comma-separated list of 2-3 OSA-related concerns]|[timeline: specific timeline like "Consider sleep study 2-4 weeks before surgery if elective. Inform anaesthesia team of sleep concerns"]

Medication Interactions|[clinical context: 3-4 sentences on drug interactions with anaesthetic agents affecting safety, cardiovascular stability, and bleeding risk. Reference British National Formulary, MHRA guidance, and that proper review prevents 70% of drug-related complications]|[strengths: comma-separated list of EXACTLY 3 UNIQUE medication management factors - NEVER "None provided". Examples: "Good medication compliance, Clear documentation, Regular pharmacy reviews"]|[safety considerations: comma-separated list of 2-3 medication concerns]|[timeline: specific timeline like "Medication review 1-2 weeks before surgery for safe adjustments"]

Substance Use Impact|[clinical context: 3-4 sentences on alcohol/substance use affecting anaesthetic requirements by 30-50%, smoking increasing complications by 40-60%. Reference Royal College of Surgeons smoking guidance and NICE CG100]|[strengths: comma-separated list of EXACTLY 3 UNIQUE factors - NEVER "None provided". Examples: "Willing to modify habits, Understands risks, Open communication with team"]|[safety considerations: comma-separated list of 2-3 substance-related concerns]|[timeline: specific timeline like "Smoking cessation 48-72 hours minimum, alcohol cessation 24-48 hours before surgery"]

Previous Anaesthesia History|[clinical context: 3-4 sentences on previous experiences being strong predictors with 90% likelihood of similar outcomes. Reference Royal College of Anaesthetists guidance on learning from previous experiences]|[strengths: comma-separated list of EXACTLY 3 UNIQUE historical factors - NEVER "None provided". Examples: "No complications, Good tolerance, Smooth recovery"]|[safety considerations: comma-separated list of 1-2 concerns or "No previous concerns identified"]|[timeline: specific timeline like "Share history 1 week before surgery. Request similar approach"]

Allergy & Reaction Risk|[clinical context: 3-4 sentences on perioperative reactions occurring in 1:10,000-1:20,000 cases. Reference that proper identification prevents 95% of serious complications, discuss cross-reactivity and emergency protocols]|[strengths: comma-separated list of EXACTLY 3 UNIQUE allergy management factors - NEVER "None provided". Examples: "Well documented allergies, Previous surgery without reactions, Appropriate precautions"]|[safety considerations: comma-separated list of 2-3 allergy concerns]|[timeline: specific timeline like "Allergy documentation 24-48 hours before surgery. Emergency protocols reviewed"]

CRITICAL INSTRUCTIONS FOR STRENGTHS:
- NEVER use "None provided", "Not specified", "Limited information", or similar phrases
- ALWAYS provide EXACTLY 3 unique strengths per category
- Each strength must be DIFFERENT and SPECIFIC to that category
- Base strengths on actual patient responses when available
- When information is limited, infer reasonable strengths from context
- For airway: "Good anatomical features", "No previous difficulties", "Cooperative patient"
- For medications: "Medication aware", "Good compliance", "Clear documentation"
- For history: "No complications", "Good tolerance", "Positive experiences"
- Make strengths actionable and meaningful, not generic

DETAILED_SUMMARY:
[Provide a comprehensive 5-6 paragraph analysis covering:
1. Overall anaesthesia safety profile with ASA classification consideration
2. Most significant risk factors requiring anaesthesia team attention
3. Protective factors supporting safe anaesthesia delivery
4. Specific perioperative management strategies and safety protocols
5. Post-operative monitoring requirements and recovery predictions
6. Actionable preparation steps with specific timeframes

Include specific medical references to UK guidelines (Royal College of Anaesthetists, NICE, British National Formulary, Association of Anaesthetists), cite evidence-based anaesthetic practices, and provide personalized safety recommendations based on their specific responses about airway, sleep, medications, substances, history, and allergies.]

SCORING GUIDELINES:
- Score 85-100: Very safe profile, standard protocols appropriate
- Score 70-84: Safe with minor precautions, straightforward case
- Score 55-69: Moderate risk requiring enhanced monitoring
- Score 0-54: Higher risk requiring specialist consultation

Focus on actionable, evidence-based safety recommendations personalized to the patient's actual responses. Emphasize modifiable risk factors and realistic safety measures. ALWAYS provide specific, unique strengths - never leave blank or say "none provided".`,

    "default": "You are a health assessment AI. Analyze the responses and provide structured recommendations."
  };

  return prompts[assessmentType] || prompts["default"];
}


function complicationRiskPrompt(assessmentType){
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

    "default": "You are a health assessment AI. Analyze the responses and provide structured recommendations."
  };

  return prompts[assessmentType] || prompts["default"];
}


function surgeryReadinessPrompt(assessmentType){
    const prompts = {

    "Surgery Readiness": `You are a surgical preparation specialist AI with expertise in preoperative optimization and perioperative medicine. Analyze the patient's responses to assess their readiness for surgical procedures.

IMPORTANT: Structure your response EXACTLY as follows:

OVERALL_SCORE: [number between 0-100, where higher = better readiness]
OVERALL_RATING: [exactly one of: "Excellent", "Good", "Fair", "Needs Improvement"]

CATEGORY_ANALYSIS:
Physical Readiness: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing exercise frequency, strength, cardiovascular fitness, and mobility] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Metabolic Health: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing blood sugar control, weight management, nutritional status, and metabolic markers] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Recovery Potential: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing sleep quality, stress levels, healing indicators, and immune function] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Risk Factors: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing smoking, alcohol, medications, chronic conditions that affect surgical risk] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Preparation Status: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing preoperative education, planning, support systems, and readiness] | [recommendation 1] | [recommendation 2] | [recommendation 3]

DETAILED_ANALYSIS:
Physical Readiness|[clinical context: 3-4 sentences on exercise patterns, cardiovascular fitness, strength, and mobility. Reference NHS guidelines on physical activity (150 minutes moderate exercise weekly) and ERAS protocols for prehabilitation]|[evidence: comma-separated list of 3 clinical evidence points about physical fitness and surgical outcomes]|[risks: comma-separated list of 2-3 risk factors related to physical condition]|[timeline: specific timeline like "4-8 weeks of targeted conditioning can improve surgical outcomes by up to 35%"]

Metabolic Health|[clinical context: 3-4 sentences on blood glucose control, BMI, nutritional status, and metabolic stability. Reference NICE diabetes guidelines and importance of glycemic control]|[evidence: comma-separated list of 3 clinical evidence points about metabolic optimization]|[risks: comma-separated list of 2-3 metabolic risk factors]|[timeline: specific timeline like "6-12 weeks metabolic optimization shows peak benefit for elective procedures"]

Recovery Potential|[clinical context: 3-4 sentences on sleep patterns (7-9 hours), stress management, vitamin D levels, and healing capacity. Reference research on sleep and immune function]|[evidence: comma-separated list of 3 clinical evidence points about recovery factors]|[risks: comma-separated list of 2-3 factors affecting recovery]|[timeline: specific timeline like "Current optimization status predicts 20-30% faster than average recovery"]

Risk Factors|[clinical context: 3-4 sentences on smoking, alcohol consumption, medication management, and chronic conditions. Reference NICE smoking cessation guidelines (4 weeks pre-surgery) and Royal College of Surgeons guidance]|[evidence: comma-separated list of 3 clinical evidence points about risk factor modification]|[risks: comma-separated list of 2-3 key modifiable risk factors]|[timeline: specific timeline like "Risk factor modification most effective 6-8 weeks before surgery"]

Preparation Status|[clinical context: 3-4 sentences on preoperative education, surgical understanding, support systems, and practical preparation. Reference ERAS protocols and NHS/NICE guidelines on comprehensive preoperative preparation]|[evidence: comma-separated list of 3 clinical evidence points about preparation programs]|[risks: comma-separated list of 2-3 preparation gaps]|[timeline: specific timeline like "Peak benefit achieved with 4-6 week structured preparation programme"]

DETAILED_SUMMARY:
[Provide a comprehensive 5-6 paragraph analysis covering:
1. Overall readiness assessment and key strengths
2. Most critical areas requiring optimization before surgery
3. Specific timeline recommendations for each optimization area
4. Evidence-based strategies for improving readiness
5. Expected surgical outcomes with current vs optimized preparation
6. Actionable next steps prioritized by impact

Include specific medical references to UK guidelines (NHS, NICE, ERAS, Royal College of Surgeons), cite evidence-based practices, and provide personalized recommendations based on their specific responses about exercise, nutrition, sleep, stress, and health conditions.]

SCORING GUIDELINES:
- Score 85-100: Excellent readiness, optimal preparation across all areas
- Score 70-84: Good readiness with minor optimization opportunities
- Score 55-69: Fair readiness requiring targeted improvements
- Score 0-54: Needs significant improvement before elective surgery

Focus on actionable, evidence-based recommendations that are personalized to the patient's actual responses. Emphasize modifiable factors and realistic timelines for optimization.`,

    "default": "You are a health assessment AI. Analyze the responses and provide structured recommendations."
  };

  return prompts[assessmentType] || prompts["default"];
}


function inflammationRiskPrompt(assessmentType) {
  const prompts = {
    "Inflammation Risk": `You are a specialist inflammation assessment AI with expertise in chronic inflammation evaluation, lifestyle factors, and evidence-based anti-inflammatory interventions. Analyze the patient's responses to assess inflammation risk across multiple domains and provide actionable strategies for reducing inflammatory burden.

IMPORTANT: Structure your response EXACTLY as follows:

OVERALL_SCORE: [number between 0-100, where higher = higher inflammation risk, 0-25 is low risk, 26-50 is moderate risk, 51-75 is high risk, 76-100 is very high risk]
OVERALL_RATING: [exactly one of: "Low Risk", "Moderate Risk", "High Risk", "Very High Risk"]

CATEGORY_ANALYSIS:
Dietary Inflammation: [score 0-100] | [level: low/moderate/high/severe] | [2-3 sentence description analyzing dietary inflammatory triggers, processed food intake, anti-inflammatory food consumption, and nutritional balance] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Lifestyle Factors: [score 0-100] | [level: low/moderate/high/severe] | [2-3 sentence description analyzing physical activity levels, sedentary time, movement patterns, and exercise anti-inflammatory benefits] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Sleep Quality: [score 0-100] | [level: low/moderate/high/severe] | [2-3 sentence description analyzing sleep duration, quality, consistency, and impact on inflammatory regulation] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Stress & Recovery: [score 0-100] | [level: low/moderate/high/severe] | [2-3 sentence description analyzing stress levels, recovery practices, relaxation techniques, and cortisol-inflammation connection] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Body Composition: [score 0-100] | [level: low/moderate/high/severe] | [2-3 sentence description analyzing weight status, body composition, visceral fat implications, and metabolic inflammation] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Environmental Factors: [score 0-100] | [level: low/moderate/high/severe] | [2-3 sentence description analyzing toxin exposure, air quality, chemical exposure, and environmental inflammatory triggers] | [recommendation 1] | [recommendation 2] | [recommendation 3]

DETAILED_ANALYSIS:
Dietary Inflammation|[clinical context: 3-4 sentences on diet being a primary modifiable inflammation driver. Reference that anti-inflammatory diets reduce CRP by 30-40% within 6-8 weeks, cite British Dietetic Association and Mediterranean Diet Foundation guidelines. Discuss processed foods increasing inflammatory markers while whole foods, omega-3s, and polyphenols reduce inflammation]|[strengths: comma-separated list of EXACTLY 3 UNIQUE dietary strengths - NEVER write "None provided". Examples: "Includes some anti-inflammatory foods", "Aware of dietary impact on health", "Willing to modify eating patterns"]|[optimization opportunities: comma-separated list of 2-3 dietary improvements]|[timeline: specific timeline like "Dietary inflammation improvements typically seen within 4-6 weeks of consistent changes"]

Lifestyle Factors|[clinical context: 3-4 sentences on physical activity being one of most powerful anti-inflammatory interventions. Reference that regular exercise reduces inflammatory markers by 20-30%, cite NHS physical activity guidelines and British Heart Foundation research. Discuss sedentary behavior increasing inflammation while movement promotes anti-inflammatory cytokines]|[strengths: comma-separated list of EXACTLY 3 UNIQUE activity factors - NEVER "None provided". Examples: "Maintains some physical activity", "Understands exercise benefits", "Willing to increase movement"]|[optimization opportunities: comma-separated list of 2-3 lifestyle improvements]|[timeline: specific timeline like "Exercise anti-inflammatory benefits begin within 2-3 weeks of regular activity"]

Sleep Quality|[clinical context: 3-4 sentences on sleep being crucial for inflammatory regulation. Reference that poor sleep increases IL-6 and TNF-alpha by 40-60%, cite British Sleep Society guidelines and NICE sleep recommendations. Discuss how sleep deprivation disrupts circadian inflammatory rhythms while quality sleep promotes anti-inflammatory recovery]|[strengths: comma-separated list of EXACTLY 3 UNIQUE sleep factors - NEVER "None provided". Examples: "Recognizes sleep importance", "Some good sleep habits", "Willing to optimize sleep routine"]|[optimization opportunities: comma-separated list of 2-3 sleep improvements]|[timeline: specific timeline like "Sleep optimization shows inflammatory benefits within 2-3 weeks"]

Stress & Recovery|[clinical context: 3-4 sentences on chronic stress being major inflammation driver. Reference that stress management reduces inflammatory markers by 25-35%, cite British Psychological Society and NICE stress guidelines. Discuss cortisol-inflammation connection and how relaxation practices activate anti-inflammatory pathways]|[strengths: comma-separated list of EXACTLY 3 UNIQUE stress management factors - NEVER "None provided". Examples: "Some stress awareness", "Uses coping strategies", "Seeks stress reduction"]|[optimization opportunities: comma-separated list of 2-3 stress management improvements]|[timeline: specific timeline like "Stress reduction shows inflammatory benefits within 4-6 weeks"]

Body Composition|[clinical context: 3-4 sentences on adipose tissue being metabolically active and producing inflammatory cytokines. Reference that modest weight loss (5-10%) reduces CRP by 20-30%, cite NICE obesity guidelines and British Nutrition Foundation. Discuss visceral fat producing pro-inflammatory factors while lean mass supports anti-inflammatory metabolism]|[strengths: comma-separated list of EXACTLY 3 UNIQUE body composition factors - NEVER "None provided". Examples: "Aware of weight impact", "Willing to optimize composition", "Takes health-oriented approach"]|[optimization opportunities: comma-separated list of 2-3 body composition strategies]|[timeline: specific timeline like "Body composition improvements show inflammatory benefits within 8-12 weeks"]

Environmental Factors|[clinical context: 3-4 sentences on environmental toxins contributing to inflammatory burden. Reference that reducing toxin exposure improves inflammatory markers, cite Public Health England and Royal College of Physicians. Discuss air pollution, chemicals, and environmental triggers activating inflammatory pathways]|[strengths: comma-separated list of EXACTLY 3 UNIQUE environmental factors - NEVER "None provided". Examples: "Aware of environmental impacts", "Takes some protective measures", "Willing to reduce exposures"]|[optimization opportunities: comma-separated list of 2-3 environmental improvements]|[timeline: specific timeline like "Environmental optimization shows benefits within 4-8 weeks"]

CRITICAL INSTRUCTIONS FOR STRENGTHS:
- NEVER use "None provided", "Not specified", "Limited information", or similar phrases
- ALWAYS provide EXACTLY 3 unique strengths per category
- Each strength must be DIFFERENT and SPECIFIC to that category
- Base strengths on actual patient responses when available
- When information is limited, infer reasonable strengths from context
- For diet: "Includes some whole foods", "Aware of nutrition", "Willing to improve diet"
- For lifestyle: "Some physical activity", "Understands exercise benefits", "Willing to move more"
- For sleep: "Values quality sleep", "Some good habits", "Willing to optimize"
- For stress: "Some stress awareness", "Uses coping tools", "Seeks balance"
- For body: "Health-conscious approach", "Willing to optimize", "Understands importance"
- For environment: "Some awareness", "Takes precautions", "Open to changes"
- Make strengths actionable and meaningful, not generic

DETAILED_SUMMARY:
[Provide a comprehensive 5-6 paragraph analysis covering:
1. Overall inflammation risk profile and primary drivers identified
2. Key modifiable factors with highest impact potential for inflammation reduction
3. Interconnections between factors (e.g., sleep affecting stress affecting diet)
4. Evidence-based anti-inflammatory strategies prioritized by effectiveness
5. Realistic timeline for inflammatory marker improvements with interventions
6. Holistic lifestyle approach emphasizing sustainable changes over quick fixes

Include specific medical references to UK guidelines (British Dietetic Association, NHS, NICE, British Heart Foundation, British Sleep Society), cite evidence-based anti-inflammatory practices including inflammatory biomarkers like CRP and IL-6, and provide practical, actionable recommendations based on their specific responses. Use empowering language that emphasizes controllable factors and realistic improvements.]

SCORING GUIDELINES:
- Score 0-25: Low inflammation risk, excellent anti-inflammatory practices
- Score 26-50: Moderate risk, good baseline with optimization opportunities
- Score 51-75: High risk, significant inflammatory burden requiring intervention
- Score 76-100: Very high risk, urgent lifestyle modifications needed

Focus on empowering, evidence-based, practical recommendations personalized to the patient's actual responses. Emphasize that inflammation is highly modifiable through lifestyle changes. ALWAYS provide specific, unique strengths - never leave blank or say "none provided". Use motivating language that promotes sustainable anti-inflammatory lifestyle changes.`,

    "default": "You are a health assessment AI. Analyze the responses and provide structured recommendations."
  };

  return prompts[assessmentType] || prompts["default"];
}


function recoverySpeedPrompt(assessmentType) {
  const prompts = {
    "Recovery Speed": `You are a surgical recovery specialist AI with expertise in predicting post-operative healing timelines and optimizing recovery factors. Analyze the patient's responses to predict their recovery speed and identify optimization opportunities.

IMPORTANT: Structure your response EXACTLY as follows:

OVERALL_SCORE: [number between 0-100, where higher = faster recovery]
OVERALL_RATING: [exactly one of: "Fast Recovery", "Good Recovery", "Average Recovery", "Slower Recovery"]

CATEGORY_ANALYSIS:
Nutritional Foundation: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing protein intake, hydration, micronutrients, and their impact on healing] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Mental Readiness: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing psychological preparation, stress management, anxiety levels, and mindset] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Support System Strength: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing family support, caregiver availability, social network, and practical assistance] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Home Environment Readiness: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing home safety, accessibility, recovery space preparation, and environmental factors] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Sleep Quality Impact: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing sleep duration, quality, sleep hygiene, and impact on healing] | [recommendation 1] | [recommendation 2] | [recommendation 3]

Physical Baseline: [score 0-100] | [level: optimal/high/moderate/low] | [2-3 sentence description analyzing current fitness, strength, mobility, and cardiovascular health] | [recommendation 1] | [recommendation 2] | [recommendation 3]

DETAILED_ANALYSIS:
Nutritional Foundation|[clinical context: 3-4 sentences on nutrition's role in healing. Reference British Dietetic Association guidelines, protein requirements (1.2-1.6g/kg), and micronutrients for wound healing. Cite research showing 30-40% faster recovery with optimal nutrition]|[strengths: comma-separated list of EXACTLY 3 UNIQUE specific positive nutritional factors based on their actual responses - NEVER write "None provided" or leave blank. If limited information, infer reasonable strengths from context like "Shows awareness of nutrition importance, Willing to optimize dietary intake, Open to professional nutritional guidance"]|[optimization areas: comma-separated list of 2-3 specific areas to improve]|[timeline: specific timeline like "Continue current nutrition plan and enhance with targeted supplementation 2-3 weeks before surgery"]

Mental Readiness|[clinical context: 3-4 sentences on psychological preparation's impact. Reference Health Psychology research showing 25% shorter recovery with mental preparation. Discuss stress, anxiety, and mindset effects on healing]|[strengths: comma-separated list of EXACTLY 3 UNIQUE specific positive psychological factors - NEVER write "None provided". Always find genuine strengths from their responses such as mindset, coping strategies, or realistic expectations]|[optimization areas: comma-separated list of 2-3 specific areas to improve]|[timeline: specific timeline like "Begin enhanced mental preparation techniques 3-4 weeks before surgery for optimal benefit"]

Support System Strength|[clinical context: 3-4 sentences on social support's proven acceleration of recovery. Reference research showing 20-30% faster healing with robust support networks. Discuss caregiver roles and practical assistance]|[strengths: comma-separated list of EXACTLY 3 UNIQUE specific positive support factors - NEVER write "None provided". Identify actual support resources they mentioned or infer from context]|[optimization areas: comma-separated list of 2-3 specific areas to improve]|[timeline: specific timeline like "Confirm support arrangements 1-2 weeks before surgery and establish backup plans"]

Home Environment Readiness|[clinical context: 3-4 sentences on home environment's impact on recovery. Reference Care Quality Commission standards and NHS discharge planning. Discuss safety, accessibility, and recovery space optimization]|[strengths: comma-separated list of EXACTLY 3 UNIQUE specific positive home factors - NEVER write "None provided". Focus on what they've prepared or planned]|[optimization areas: comma-separated list of 2-3 specific areas to improve]|[timeline: specific timeline like "Complete home modifications 1-2 weeks before surgery"]

Sleep Quality Impact|[clinical context: 3-4 sentences on sleep's essential role in healing. Reference research showing poor sleep can extend recovery by 40-50%. Discuss sleep duration (7-9 hours), quality, and immune function]|[strengths: comma-separated list of EXACTLY 3 UNIQUE specific positive sleep factors - NEVER write "None provided". Identify sleep habits, awareness, or routines mentioned]|[optimization areas: comma-separated list of 2-3 specific areas to improve]|[timeline: specific timeline like "Optimize sleep quality 4-6 weeks before surgery with enhanced sleep hygiene protocols"]

Physical Baseline|[clinical context: 3-4 sentences on fitness as predictor of recovery speed. Reference ERAS prehabilitation protocols and Chartered Society of Physiotherapy guidelines. Discuss cardiovascular fitness, strength, and mobility]|[strengths: comma-separated list of EXACTLY 3 UNIQUE specific positive fitness factors - NEVER write "None provided". Note any activity level, mobility, or physical capabilities they mentioned]|[optimization areas: comma-separated list of 2-3 specific areas to improve]|[timeline: specific timeline like "Continue current fitness routine and add targeted conditioning 4-6 weeks before surgery"]

CRITICAL INSTRUCTIONS FOR STRENGTHS:
- NEVER use "None provided", "Not specified", "Limited information", or similar phrases
- ALWAYS provide EXACTLY 3 unique strengths per category
- Each strength must be DIFFERENT and SPECIFIC to that category
- Base strengths on actual patient responses when available
- When information is limited, infer reasonable strengths from context (e.g., "Engaged with assessment process", "Demonstrates health awareness", "Willing to make improvements")
- Make strengths actionable and meaningful, not generic

DETAILED_SUMMARY:
[Provide a comprehensive 5-6 paragraph analysis covering:
1. Overall recovery speed prediction with specific timeline estimates
2. Most impactful factors accelerating their recovery
3. Key optimization areas that could further speed recovery
4. Evidence-based strategies ranked by impact on recovery speed
5. Realistic recovery timeline expectations with current vs optimized preparation
6. Actionable next steps with specific timeframes

Include specific medical references to UK guidelines (NHS, ERAS, British Dietetic Association, Chartered Society of Physiotherapy), cite evidence-based recovery research, and provide personalized predictions based on their specific responses about nutrition, support, sleep, home environment, and fitness.]

SCORING GUIDELINES:
- Score 85-100: Fast recovery predicted, optimal factors across categories
- Score 70-84: Good recovery speed, minor optimization opportunities
- Score 55-69: Average recovery, several modifiable factors to address
- Score 0-54: Slower recovery likely, significant optimization needed

Focus on actionable, evidence-based recommendations that are personalized to the patient's actual responses. Emphasize modifiable factors that can accelerate recovery and provide realistic timeline predictions. ALWAYS provide specific, unique strengths - never leave strengths blank or say "none provided".`,

    "default": "You are a health assessment AI. Analyze the responses and provide structured recommendations."
  };

  return prompts[assessmentType] || prompts["default"];
}
function longevityWellnessBundleParseAIResponse(aiAnalysis, assessmentType) {
  try {
    // Extract overall score and rating
    const scoreMatch = aiAnalysis.match(/OVERALL_SCORE:\s*(\d+)/i);
    const overallScore = scoreMatch ? parseInt(scoreMatch[1]) : 75;

    const ratingMatch = aiAnalysis.match(/OVERALL_RATING:\s*([^\n]+)/i);
    const overallRating = ratingMatch ? ratingMatch[1].trim() : "Well Optimized";

    // Extract category analysis section
    const categorySection = aiAnalysis.match(/CATEGORY_ANALYSIS:(.*?)(?=DETAILED_ANALYSIS:|$)/is);
    const results = [];

    // Extract detailed analysis section
    const detailedSection = aiAnalysis.match(/DETAILED_ANALYSIS:(.*?)(?=DETAILED_SUMMARY:|$)/is);
    const detailedAnalysisMap = new Map();

    // Parse detailed analysis first - Longevity Bundle specific categories
    if (detailedSection) {
      const categories = [
        'Biological Age Analysis',
        'Cardiometabolic Health Assessment',
        'Resilience Index',
        'Nutrition & Body Composition',
        'Functional Fitness Age'
      ];

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
      const categories = [
        'Biological Age Analysis',
        'Cardiometabolic Health Assessment',
        'Resilience Index',
        'Nutrition & Body Composition',
        'Functional Fitness Age'
      ];

      categories.forEach(category => {
        const categoryRegex = new RegExp(`${category}:\\s*([^\\n]+)`, 'i');
        const categoryMatch = categorySection[1].match(categoryRegex);

        if (categoryMatch) {
          const parts = categoryMatch[1].split('|').map(p => p.trim());

          if (parts.length >= 4) {
            const score = parseInt(parts[0]) || 75;
            const level = parts[1].toLowerCase();
            const description = parts[2];
            const recommendations = parts.slice(3).filter(r => r.length > 0);

            // Get detailed analysis for this category
            const detailedAnalysis = detailedAnalysisMap.get(category) || {
              clinicalContext: `Your ${category.toLowerCase()} assessment reveals important factors for longevity optimization.`,
              strengths: ['Baseline assessment completed', 'Areas identified for optimization'],
              riskFactors: ['Consult healthcare provider for personalized longevity planning'],
              timeline: 'Discuss optimization timeline with your healthcare team.'
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
      console.log("Creating fallback structure for Longevity Wellness Bundle");

      const fallbackCategories = [
        {
          name: 'Biological Age Analysis',
          desc: 'Your biological markers indicate your aging process and cellular health status.',
          context: 'Biological age assessment reveals how your cells are aging compared to your chronological age, with cellular health, energy, and recovery as key indicators.',
          strengths: [
            'Good baseline cellular function',
            'Adequate energy levels for daily activities',
            'Reasonable recovery patterns',
            'Awareness of aging optimization importance'
          ],
          risks: [
            'Could optimize cellular health markers',
            'Room for improved recovery capacity',
            'Telomere health may benefit from intervention'
          ]
        },
        {
          name: 'Cardiometabolic Health Assessment',
          desc: 'Your cardiovascular and metabolic health indicators show your disease risk profile.',
          context: 'Cardiometabolic health is fundamental to longevity, with cardiovascular fitness, blood pressure, cholesterol, and metabolic function as critical longevity determinants.',
          strengths: [
            'Baseline cardiovascular function maintained',
            'No major metabolic dysfunction identified',
            'Awareness of heart health importance',
            'Some healthy lifestyle practices in place'
          ],
          risks: [
            'Could optimize lipid profile',
            'Blood pressure management opportunity',
            'Metabolic flexibility could be enhanced'
          ]
        },
        {
          name: 'Resilience Index',
          desc: 'Your mental resilience and stress adaptation capabilities influence longevity.',
          context: 'Psychological resilience, stress management, and social connections are proven longevity factors, with chronic stress accelerating biological aging.',
          strengths: [
            'Some stress management awareness',
            'Basic social connections maintained',
            'Reasonable emotional regulation',
            'Openness to resilience building'
          ],
          risks: [
            'Chronic stress patterns identified',
            'Social network could be strengthened',
            'Mindfulness practices would benefit aging'
          ]
        },
        {
          name: 'Nutrition & Body Composition',
          desc: 'Your nutritional patterns and body composition affect longevity potential.',
          context: 'Optimal nutrition and healthy body composition are cornerstone longevity factors, with diet quality and body composition strongly predicting healthspan.',
          strengths: [
            'Basic nutritional awareness present',
            'Some healthy food choices made',
            'Hydration habits established',
            'Interest in nutritional optimization'
          ],
          risks: [
            'Protein intake could be optimized',
            'Body composition would benefit from adjustment',
            'Micronutrient profile needs enhancement'
          ]
        },
        {
          name: 'Functional Fitness Age',
          desc: 'Your physical capacity and functional fitness predict your healthspan trajectory.',
          context: 'Functional fitness strongly predicts longevity, with strength, endurance, flexibility, and balance as key indicators of biological age and future health.',
          strengths: [
            'Some baseline physical activity maintained',
            'Basic mobility preserved',
            'Awareness of fitness importance',
            'Willingness to improve capacity'
          ],
          risks: [
            'Strength levels below optimal for age',
            'Cardiovascular fitness needs improvement',
            'Flexibility and balance would benefit from training'
          ]
        }
      ];

      fallbackCategories.forEach(cat => {
        results.push({
          category: cat.name,
          score: Math.floor(Math.random() * 15) + 70,
          maxScore: 100,
          level: 'moderate',
          description: cat.desc,
          recommendations: [
            'Consult with longevity medicine specialist for personalized optimization',
            'Implement evidence-based anti-aging interventions in this domain',
            'Monitor biomarkers regularly to track improvement',
            'Coordinate with healthcare team for comprehensive longevity planning'
          ],
          detailedAnalysis: {
            clinicalContext: cat.context,
            strengths: cat.strengths,
            riskFactors: cat.risks,
            timeline: 'Begin optimization immediately for maximum longevity benefit. Most interventions show measurable improvements within 8-16 weeks.'
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
    console.error("Error parsing Longevity Wellness Bundle AI response:", error);

    return {
      overallScore: 75,
      overallRating: "Well Optimized",
      results: [{
        category: "Overall Longevity Assessment",
        score: 75,
        maxScore: 100,
        level: "moderate",
        description: "Your comprehensive longevity optimization assessment has been completed. This evaluation across 5 key longevity domains provides insights into your healthspan potential.",
        recommendations: [
          "Discuss your comprehensive longevity assessment with a longevity medicine specialist",
          "Implement evidence-based anti-aging interventions across all domains",
          "Monitor biological age markers to track optimization progress",
          "Consider advanced longevity testing for deeper insights into aging trajectory"
        ],
        detailedAnalysis: {
          clinicalContext: aiAnalysis,
          strengths: ['Comprehensive assessment completed', 'Longevity awareness demonstrated'],
          riskFactors: ['Requires medical consultation for personalized longevity plan'],
          timeline: 'Begin integrated longevity optimization immediately for maximum healthspan benefit.'
        }
      }],
      summary: aiAnalysis,
      assessmentType
    };
  }
}
function chronicSymptomsParseAIResponse(aiAnalysis, assessmentType) {
  try {
    const scoreMatch = aiAnalysis.match(/OVERALL_SCORE:\s*(\d+)/i);
    const overallScore = scoreMatch ? parseInt(scoreMatch[1]) : 65;

    const ratingMatch = aiAnalysis.match(/OVERALL_RATING:\s*([^\n]+)/i);
    const overallRating = ratingMatch ? ratingMatch[1].trim() : "Moderate Management";

    const categorySection = aiAnalysis.match(/CATEGORY_ANALYSIS:(.*?)(?=DETAILED_ANALYSIS:|$)/is);
    const results = [];

    const detailedSection = aiAnalysis.match(/DETAILED_ANALYSIS:(.*?)(?=DETAILED_SUMMARY:|$)/is);
    const detailedAnalysisMap = new Map();

    if (detailedSection) {
      const categories = [
        'Symptom Severity Index',
        'Inflammation Risk Assessment',
        'Medication Burden Analysis',
        'Daily Energy Profile',
        'Lifestyle Impact Assessment'
      ];

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

    if (categorySection) {
      const categories = [
        'Symptom Severity Index',
        'Inflammation Risk Assessment',
        'Medication Burden Analysis',
        'Daily Energy Profile',
        'Lifestyle Impact Assessment'
      ];

      categories.forEach(category => {
        const categoryRegex = new RegExp(`${category}:\\s*([^\\n]+)`, 'i');
        const categoryMatch = categorySection[1].match(categoryRegex);

        if (categoryMatch) {
          const parts = categoryMatch[1].split('|').map(p => p.trim());

          if (parts.length >= 4) {
            const score = parseInt(parts[0]) || 65;
            const level = parts[1].toLowerCase();
            const description = parts[2];
            const recommendations = parts.slice(3).filter(r => r.length > 0);

            const detailedAnalysis = detailedAnalysisMap.get(category) || {
              clinicalContext: `Your ${category.toLowerCase()} reveals important factors for chronic symptom management.`,
              strengths: ['Baseline assessment completed', 'Engaged with comprehensive evaluation'],
              riskFactors: ['Requires optimization', 'Consult healthcare provider'],
              timeline: 'Discuss optimization strategies with your medical team.'
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

    if (results.length === 0) {
      console.log("Creating fallback structure for Chronic Symptoms Bundle");

      const fallbackCategories = [
        {
          name: 'Symptom Severity Index',
          desc: 'Moderate symptom burden with regular daily impact and manageable but persistent pain and fatigue patterns.',
          context: 'Chronic pain assessment reveals moderate symptom burden affecting daily function. Evidence-based symptom tracking and management strategies are essential.',
          strengths: ['Awareness of symptom patterns', 'Engaged with assessment', 'Seeking management strategies'],
          risks: ['Daily symptom impact', 'Pain intensity requires management', 'Flare pattern optimization needed']
        },
        {
          name: 'Inflammation Risk Assessment',
          desc: 'Moderate inflammation risk with several modifiable lifestyle factors that could reduce inflammatory burden.',
          context: 'Inflammation assessment shows modifiable risk factors. Research demonstrates significant symptom improvement with anti-inflammatory interventions.',
          strengths: ['Some healthy habits present', 'Aware of inflammation connection', 'Open to dietary changes'],
          risks: ['Diet quality needs improvement', 'Stress levels elevated', 'Sleep quality affecting inflammation']
        },
        {
          name: 'Medication Burden Analysis',
          desc: 'Well-managed medication regimen with good adherence and minimal side effects.',
          context: 'Medication management shows good adherence patterns. Regular medication reviews optimize effectiveness and minimize side effects.',
          strengths: ['Good medication adherence', 'Minimal side effects', 'Regular healthcare monitoring'],
          risks: ['Polypharmacy complexity', 'Potential for optimization', 'Side effect monitoring needed']
        },
        {
          name: 'Daily Energy Profile',
          desc: 'Significant energy challenges with pronounced fatigue patterns affecting daily function.',
          context: 'Energy assessment reveals significant fatigue burden. Multiple factors contribute to energy depletion requiring comprehensive intervention.',
          strengths: ['Awareness of energy patterns', 'Motivated for improvement', 'Some adaptive strategies in place'],
          risks: ['Sleep duration insufficient', 'Morning energy very low', 'Afternoon crashes frequent', 'Recovery capacity limited']
        },
        {
          name: 'Lifestyle Impact Assessment',
          desc: 'Moderate lifestyle limitations with notable impact on work, social, and physical activities.',
          context: 'Lifestyle assessment shows moderate functional limitations. Adaptive strategies can significantly improve quality of life.',
          strengths: ['Good support system', 'Employed or engaged', 'Some adaptive strategies'],
          risks: ['Work limitations present', 'Social activities restricted', 'Physical activity limited']
        }
      ];

      fallbackCategories.forEach(cat => {
        results.push({
          category: cat.name,
          score: Math.floor(Math.random() * 25) + 55,
          maxScore: 100,
          level: 'moderate',
          description: cat.desc,
          recommendations: [
            'Consult with your healthcare provider for personalized symptom management',
            'Implement evidence-based strategies for your specific symptom pattern',
            'Track symptoms to identify triggers and effective interventions',
            'Consider multidisciplinary approach to chronic symptom management'
          ],
          detailedAnalysis: {
            clinicalContext: cat.context,
            strengths: cat.strengths,
            riskFactors: cat.risks,
            timeline: 'Begin comprehensive optimization 4-6 weeks before major interventions for best results.'
          }
        });
      });
    }

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
    console.error("Error parsing Chronic Symptoms Bundle AI response:", error);

    return {
      overallScore: 65,
      overallRating: "Moderate Management",
      results: [{
        category: "Overall Assessment",
        score: 65,
        maxScore: 100,
        level: "moderate",
        description: "Your comprehensive chronic symptom assessment has been completed.",
        recommendations: [
          "Discuss results with your healthcare team",
          "Implement evidence-based symptom management strategies",
          "Focus on modifiable factors for symptom reduction",
          "Consider comprehensive chronic disease management program"
        ],
        detailedAnalysis: {
          clinicalContext: aiAnalysis,
          strengths: ['Comprehensive assessment completed'],
          riskFactors: ['Requires medical consultation for personalized plan'],
          timeline: 'Consult with healthcare team to develop symptom optimization strategy.'
        }
      }],
      summary: aiAnalysis,
      assessmentType
    };
  }
}
function surgeryPreparationBundleParseAIResponse(aiAnalysis, assessmentType) {
  try {
    // Extract overall score and rating
    const scoreMatch = aiAnalysis.match(/OVERALL_SCORE:\s*(\d+)/i);
    const overallScore = scoreMatch ? parseInt(scoreMatch[1]) : 75;

    const ratingMatch = aiAnalysis.match(/OVERALL_RATING:\s*([^\n]+)/i);
    const overallRating = ratingMatch ? ratingMatch[1].trim() : "Well Prepared";

    // Extract category analysis section
    const categorySection = aiAnalysis.match(/CATEGORY_ANALYSIS:(.*?)(?=DETAILED_ANALYSIS:|$)/is);
    const results = [];

    // Extract detailed analysis section
    const detailedSection = aiAnalysis.match(/DETAILED_ANALYSIS:(.*?)(?=DETAILED_SUMMARY:|$)/is);
    const detailedAnalysisMap = new Map();

    // Parse detailed analysis first - Surgery Preparation Bundle categories
    if (detailedSection) {
      const categories = [
        'Surgery Readiness Score',
        'Complication Risk Assessment',
        'Recovery Speed Prediction',
        'Anaesthesia Risk Profile',
        'Mobility & Strength Baseline',
        'Nutritional Optimization',
        'Psychological Readiness',
        'Support System Adequacy'
      ];

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
      const categories = [
        'Surgery Readiness Score',
        'Complication Risk Assessment',
        'Recovery Speed Prediction',
        'Anaesthesia Risk Profile',
        'Mobility & Strength Baseline',
        'Nutritional Optimization',
        'Psychological Readiness',
        'Support System Adequacy'
      ];

      categories.forEach(category => {
        const categoryRegex = new RegExp(`${category}:\\s*([^\\n]+)`, 'i');
        const categoryMatch = categorySection[1].match(categoryRegex);

        if (categoryMatch) {
          const parts = categoryMatch[1].split('|').map(p => p.trim());

          if (parts.length >= 4) {
            const score = parseInt(parts[0]) || 75;
            const level = parts[1].toLowerCase();
            const description = parts[2];
            const recommendations = parts.slice(3).filter(r => r.length > 0);

            // Get detailed analysis for this category
            const detailedAnalysis = detailedAnalysisMap.get(category) || {
              clinicalContext: `Your ${category.toLowerCase()} assessment reveals important preparation factors.`,
              strengths: ['Baseline assessment completed', 'Areas identified for optimization', 'Engaged with preparation process'],
              riskFactors: ['Consult healthcare provider for personalized guidance', 'Follow evidence-based preparation protocols'],
              timeline: 'Discuss optimization timeline with your surgical team.'
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

    // If parsing failed, create comprehensive fallback for all 8 categories
    if (results.length === 0) {
      console.log("Creating fallback structure for Surgery Preparation Bundle");

      const fallbackCategories = [
        {
          name: 'Surgery Readiness Score',
          desc: 'Comprehensive preparation with strong foundational health and appropriate understanding of your surgical procedure.',
          context: 'Overall surgical readiness encompasses procedure understanding, timing, pre-operative education, and anxiety management.',
          strengths: [
            'Good baseline health status',
            'Comprehensive pre-operative understanding',
            'Appropriate anxiety management',
            'Elective procedure timing allows optimal preparation'
          ],
          risks: [
            'Continue maintaining healthy lifestyle practices',
            'Complete any remaining pre-operative clearances'
          ]
        },
        {
          name: 'Complication Risk Assessment',
          desc: 'Moderate complication risk profile with manageable factors that can be optimized with targeted interventions.',
          context: 'Medical history and lifestyle factors present manageable risks requiring attention and optimization.',
          strengths: [
            'No major cardiac complications',
            'Good medication compliance',
            'Regular health monitoring',
            'Manageable chronic conditions'
          ],
          risks: [
            'Optimize management of existing medical conditions',
            'Address modifiable risk factors',
            'Review medications with anaesthesia team',
            'Implement infection prevention strategies'
          ]
        },
        {
          name: 'Recovery Speed Prediction',
          desc: 'Excellent recovery potential supported by strong nutritional status, robust support systems, and optimal home environment.',
          context: 'Your nutrition, support network, home setup, and mental health status strongly favor rapid healing.',
          strengths: [
            'Strong nutritional foundation',
            'Robust support systems',
            'Optimal home environment',
            'Good mental health status'
          ],
          risks: [
            'Maintain high protein intake for healing',
            'Ensure adequate hydration'
          ]
        },
        {
          name: 'Anaesthesia Risk Profile',
          desc: 'Generally favorable anaesthesia risk profile with some areas requiring attention for optimal safety.',
          context: 'Sleep quality and respiratory function assessments suggest manageable anaesthesia risk factors.',
          strengths: [
            'Good previous anaesthesia tolerance',
            'No major respiratory issues',
            'Stable cardiovascular function',
            'Complete substance disclosure'
          ],
          risks: [
            'Address any sleep apnea symptoms',
            'Optimize sleep hygiene before surgery',
            'Continue respiratory health optimization'
          ]
        },
        {
          name: 'Mobility & Strength Baseline',
          desc: 'Good baseline physical function with adequate strength and mobility supporting successful post-operative rehabilitation.',
          context: 'Minor limitations present but overall physical capacity supports good surgical outcomes.',
          strengths: [
            'Good baseline fitness',
            'Adequate muscle strength',
            'Good mobility range',
            'Low fall risk'
          ],
          risks: [
            'Continue current activity level',
            'Practice pre-operative conditioning exercises'
          ]
        },
        {
          name: 'Nutritional Optimization',
          desc: 'Strong nutritional foundation with excellent protein intake and comprehensive supplementation supporting healing.',
          context: 'Current nutrition status strongly supports healing and recovery processes.',
          strengths: [
            'High-quality protein intake',
            'Comprehensive supplementation',
            'Good hydration habits',
            'Balanced micronutrient profile'
          ],
          risks: [
            'Consider adding specific healing nutrients',
            'Maintain optimal hydration'
          ]
        },
        {
          name: 'Psychological Readiness',
          desc: 'Good psychological preparation with manageable anxiety levels and strong motivation for recovery.',
          context: 'Some stress factors present but within normal range for surgical preparation.',
          strengths: [
            'Positive outlook',
            'Good stress management',
            'Realistic expectations',
            'Strong motivation'
          ],
          risks: [
            'Continue stress reduction techniques',
            'Maintain realistic recovery expectations'
          ]
        },
        {
          name: 'Support System Adequacy',
          desc: 'Excellent support network with comprehensive family, friend, and professional resources ensuring optimal recovery environment.',
          context: 'Strong financial and logistical support provides excellent foundation for recovery.',
          strengths: [
            'Strong family support',
            'Adequate financial resources',
            'Reliable transportation',
            'Professional care services available'
          ],
          risks: [
            'Establish backup support plans'
          ]
        }
      ];

      fallbackCategories.forEach(cat => {
        results.push({
          category: cat.name,
          score: Math.floor(Math.random() * 20) + 70,
          maxScore: 100,
          level: 'moderate',
          description: cat.desc,
          recommendations: [
            'Consult with your surgical team for personalized guidance',
            'Follow evidence-based preparation protocols',
            'Optimize modifiable factors in this category',
            'Monitor progress with your healthcare team'
          ],
          detailedAnalysis: {
            clinicalContext: cat.context,
            strengths: cat.strengths,
            riskFactors: cat.risks,
            timeline: 'Begin optimization 4-6 weeks before scheduled surgery for best results.'
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
    console.error("Error parsing Surgery Preparation Bundle AI response:", error);

    return {
      overallScore: 75,
      overallRating: "Well Prepared",
      results: [{
        category: "Overall Assessment",
        score: 75,
        maxScore: 100,
        level: "moderate",
        description: "Your comprehensive surgical preparation assessment has been completed. Please consult with your surgical team for personalized preparation planning.",
        recommendations: [
          "Discuss your comprehensive results with your surgeon",
          "Follow all pre-operative instructions carefully",
          "Optimize preparation across all assessed domains",
          "Coordinate with your anaesthesia team"
        ],
        detailedAnalysis: {
          clinicalContext: aiAnalysis,
          strengths: ['Comprehensive assessment completed', 'Multiple domains evaluated'],
          riskFactors: ['Requires medical consultation for personalized plan'],
          timeline: 'Consult with surgical team to develop integrated preparation strategy.'
        }
      }],
      summary: aiAnalysis,
      assessmentType
    };
  }
}

function functionalFitnessParseAIResponse(aiAnalysis, assessmentType) {
  try {
    // Extract functional fitness age (OVERALL_SCORE)
    const fitnessAgeMatch = aiAnalysis.match(/OVERALL_SCORE:\s*(\d+)/i);
    const functionalFitnessAge = fitnessAgeMatch ? parseInt(fitnessAgeMatch[1]) : 45;

    // Extract chronological age
    const chronoAgeMatch = aiAnalysis.match(/CHRONOLOGICAL_AGE:\s*(\d+)/i);
    const chronologicalAge = chronoAgeMatch ? parseInt(chronoAgeMatch[1]) : 45;

    // Extract overall rating
    const ratingMatch = aiAnalysis.match(/OVERALL_RATING:\s*([^\n]+)/i);
    const overallRating = ratingMatch ? ratingMatch[1].trim() : "Matches chronological age";

    // Calculate fitness advantage
    const fitnessAdvantage = chronologicalAge - functionalFitnessAge;

    const categorySection = aiAnalysis.match(/CATEGORY_ANALYSIS:(.*?)(?=DETAILED_ANALYSIS:|$)/is);
    const results = [];

    const detailedSection = aiAnalysis.match(/DETAILED_ANALYSIS:(.*?)(?=DETAILED_SUMMARY:|$)/is);
    const detailedAnalysisMap = new Map();

    // Parse detailed analysis - Functional Fitness categories
    if (detailedSection) {
      const categories = [
        'Movement Quality',
        'Strength & Power',
        'Balance & Coordination',
        'Cardiovascular Fitness',
        'Flexibility & Mobility'
      ];

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
      const categories = [
        'Movement Quality',
        'Strength & Power',
        'Balance & Coordination',
        'Cardiovascular Fitness',
        'Flexibility & Mobility'
      ];

      categories.forEach(category => {
        const categoryRegex = new RegExp(`${category}:\\s*([^\\n]+)`, 'i');
        const categoryMatch = categorySection[1].match(categoryRegex);

        if (categoryMatch) {
          const parts = categoryMatch[1].split('|').map(p => p.trim());

          if (parts.length >= 4) {
            const score = parseInt(parts[0]) || 75;
            const level = parts[1].toLowerCase();
            const description = parts[2];
            const recommendations = parts.slice(3).filter(r => r.length > 0);

            const detailedAnalysis = detailedAnalysisMap.get(category) || {
              clinicalContext: `Your ${category.toLowerCase()} assessment reveals important functional fitness patterns.`,
              strengths: ['Baseline function maintained', 'Awareness of fitness factors'],
              riskFactors: ['Optimization opportunities identified'],
              timeline: 'Improvements measurable within 8-12 weeks with targeted training.'
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

    // Fallback if parsing failed
    if (results.length === 0) {
      console.log("Creating fallback for Functional Fitness");

      const fallbackCategories = [
        {
          name: 'Movement Quality',
          desc: 'Movement patterns show typical patterns for your age group with optimization opportunities.',
          context: 'Movement quality assessment reveals functional capacity and compensatory patterns that affect daily activities.',
          strengths: ['Functional movement maintained', 'Good body awareness', 'No major restrictions'],
          risks: ['Some compensatory patterns present', 'Movement efficiency could improve']
        },
        {
          name: 'Strength & Power',
          desc: 'Muscular strength and power show age-appropriate levels with enhancement potential.',
          context: 'Strength and power are key functional fitness markers that directly impact daily activities and independence.',
          strengths: ['Adequate baseline strength', 'Good force production', 'Functional capacity maintained'],
          risks: ['Power output declining with age', 'Muscle mass optimization needed']
        },
        {
          name: 'Balance & Coordination',
          desc: 'Balance and coordination show good maintenance with room for enhancement.',
          context: 'Balance capacity is a critical predictor of functional independence and fall risk in aging populations.',
          strengths: ['Stable balance baseline', 'Good proprioception', 'Coordination maintained'],
          risks: ['Single-leg balance could improve', 'Dynamic stability needs work']
        },
        {
          name: 'Cardiovascular Fitness',
          desc: 'Aerobic capacity shows typical age-related patterns with optimization opportunities.',
          context: 'Cardiovascular fitness is the cornerstone of functional capacity and a key longevity predictor.',
          strengths: ['Aerobic base maintained', 'Reasonable endurance', 'Good recovery patterns'],
          risks: ['VO2 max declining with age', 'Aerobic capacity could improve']
        },
        {
          name: 'Flexibility & Mobility',
          desc: 'Joint mobility and flexibility show typical patterns with room for improvement.',
          context: 'Mobility and flexibility are essential for injury prevention and maintaining full functional range of motion.',
          strengths: ['Basic mobility maintained', 'Reasonable flexibility', 'No major restrictions'],
          risks: ['Some joint stiffness present', 'Range of motion limited in key areas']
        }
      ];

      fallbackCategories.forEach(cat => {
        results.push({
          category: cat.name,
          score: Math.floor(Math.random() * 20) + 70,
          maxScore: 100,
          level: 'moderate',
          description: cat.desc,
          recommendations: [
            'Consult with fitness professional for personalized programming',
            'Implement progressive exercise interventions',
            'Track functional improvements over time'
          ],
          detailedAnalysis: {
            clinicalContext: cat.context,
            strengths: cat.strengths,
            riskFactors: cat.risks,
            timeline: 'Measurable improvements typically occur within 8-12 weeks of consistent training.'
          }
        });
      });
    }

    const summaryMatch = aiAnalysis.match(/DETAILED_SUMMARY:\s*(.*?)$/is);
    const summary = summaryMatch ? summaryMatch[1].trim() : aiAnalysis;

    return {
      overallScore: functionalFitnessAge,
      chronologicalAge: chronologicalAge,
      fitnessAdvantage: fitnessAdvantage,
      overallRating,
      results,
      summary,
      assessmentType
    };

  } catch (error) {
    console.error("Error parsing Functional Fitness AI response:", error);

    return {
      overallScore: 45,
      chronologicalAge: 45,
      fitnessAdvantage: 0,
      overallRating: "Matches chronological age",
      results: [{
        category: "Overall Assessment",
        score: 75,
        maxScore: 100,
        level: "moderate",
        description: "Your functional fitness assessment has been completed. Consult with fitness professionals for comprehensive movement evaluation.",
        recommendations: [
          "Discuss results with qualified fitness professional",
          "Implement evidence-based exercise programming",
          "Track functional fitness improvements over time"
        ],
        detailedAnalysis: {
          clinicalContext: aiAnalysis,
          strengths: ['Assessment completed', 'Baseline established'],
          riskFactors: ['Requires professional consultation'],
          timeline: 'Consult with fitness specialist for personalized program.'
        }
      }],
      summary: aiAnalysis,
      assessmentType
    };
  }
}
function nutritionCompositionParseAIResponse(aiAnalysis, assessmentType) {
  try {
    // Extract overall score and rating
    const scoreMatch = aiAnalysis.match(/OVERALL_SCORE:\s*(\d+)/i);
    const overallScore = scoreMatch ? parseInt(scoreMatch[1]) : 75;

    const ratingMatch = aiAnalysis.match(/OVERALL_RATING:\s*([^\n]+)/i);
    const overallRating = ratingMatch ? ratingMatch[1].trim() : "Good Nutrition";

    // Extract category analysis section
    const categorySection = aiAnalysis.match(/CATEGORY_ANALYSIS:(.*?)(?=DETAILED_ANALYSIS:|$)/is);
    const results = [];

    // Extract detailed analysis section
    const detailedSection = aiAnalysis.match(/DETAILED_ANALYSIS:(.*?)(?=DETAILED_SUMMARY:|$)/is);
    const detailedAnalysisMap = new Map();

    // Parse detailed analysis - Nutrition specific categories
    if (detailedSection) {
      const categories = [
        'Body Composition',
        'Nutritional Quality',
        'Macronutrient Balance',
        'Metabolic Efficiency',
        'Hydration & Recovery'
      ];

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
      const categories = [
        'Body Composition',
        'Nutritional Quality',
        'Macronutrient Balance',
        'Metabolic Efficiency',
        'Hydration & Recovery'
      ];

      categories.forEach(category => {
        const categoryRegex = new RegExp(`${category}:\\s*([^\\n]+)`, 'i');
        const categoryMatch = categorySection[1].match(categoryRegex);

        if (categoryMatch) {
          const parts = categoryMatch[1].split('|').map(p => p.trim());

          if (parts.length >= 4) {
            const score = parseInt(parts[0]) || 75;
            const level = parts[1].toLowerCase();
            const description = parts[2];
            const recommendations = parts.slice(3).filter(r => r.length > 0);

            const detailedAnalysis = detailedAnalysisMap.get(category) || {
              clinicalContext: `Your ${category.toLowerCase()} assessment reveals important nutritional factors.`,
              strengths: ['Baseline nutrition maintained', 'Awareness present'],
              riskFactors: ['Optimization opportunities identified'],
              timeline: 'Improvements typically measurable within 4-8 weeks with consistent changes.'
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

    // Fallback if parsing failed
    if (results.length === 0) {
      console.log("Creating fallback structure for Nutrition & Body Composition");

      const fallbackCategories = [
        {
          name: 'Body Composition',
          desc: 'Good muscle-to-fat ratio with healthy body composition metrics.',
          context: 'Body composition significantly impacts metabolic health, with lean muscle mass supporting metabolic rate and insulin sensitivity.',
          strengths: ['Baseline composition maintained', 'Awareness of body composition importance', 'Regular activity present'],
          risks: ['Muscle mass optimization beneficial', 'Body fat distribution could improve']
        },
        {
          name: 'Nutritional Quality',
          desc: 'Adequate nutritional intake with areas for micronutrient optimization.',
          context: 'Dietary quality determines micronutrient adequacy and long-term health outcomes, with nutrient-dense foods supporting optimal function.',
          strengths: ['Variety in diet', 'Whole food consumption present', 'Awareness of nutrition importance'],
          risks: ['Micronutrient density could increase', 'Processed food reduction beneficial']
        },
        {
          name: 'Macronutrient Balance',
          desc: 'Well-balanced macronutrient distribution supporting metabolic health.',
          context: 'Optimal macronutrient distribution supports body composition goals, with protein adequacy being critical for muscle maintenance.',
          strengths: ['Balanced approach to eating', 'Protein awareness present', 'Carbohydrate intake reasonable'],
          risks: ['Protein timing optimization beneficial', 'Macronutrient distribution fine-tuning needed']
        },
        {
          name: 'Metabolic Efficiency',
          desc: 'Moderate metabolic function with optimization opportunities.',
          context: 'Metabolic flexibility and insulin sensitivity are key markers of metabolic health and can be improved through nutrition.',
          strengths: ['Stable energy levels', 'Meal timing awareness', 'Metabolic health consciousness'],
          risks: ['Metabolic flexibility could improve', 'Insulin sensitivity optimization beneficial']
        },
        {
          name: 'Hydration & Recovery',
          desc: 'Good hydration practices and recovery nutrition habits.',
          context: 'Proper hydration and nutrient timing around exercise optimize performance and recovery, supporting adaptation and growth.',
          strengths: ['Adequate fluid intake', 'Post-workout nutrition awareness', 'Recovery priority recognized'],
          risks: ['Electrolyte optimization beneficial', 'Nutrient timing refinement helpful']
        }
      ];

      fallbackCategories.forEach(cat => {
        results.push({
          category: cat.name,
          score: Math.floor(Math.random() * 20) + 70,
          maxScore: 100,
          level: 'moderate',
          description: cat.desc,
          recommendations: [
            'Consult with registered dietitian for personalized nutrition plan',
            'Track macronutrient intake to ensure adequate protein',
            'Consider body composition assessment for precise monitoring'
          ],
          detailedAnalysis: {
            clinicalContext: cat.context,
            strengths: cat.strengths,
            riskFactors: cat.risks,
            timeline: 'Nutritional improvements typically measurable within 4-8 weeks of consistent implementation.'
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
    console.error("Error parsing Nutrition & Body Composition AI response:", error);

    return {
      overallScore: 75,
      overallRating: "Good Nutrition",
      results: [{
        category: "Overall Assessment",
        score: 75,
        maxScore: 100,
        level: "moderate",
        description: "Your nutrition and body composition assessment has been completed. Consult with registered dietitian for personalized optimization.",
        recommendations: [
          "Discuss nutrition results with qualified nutrition professional",
          "Implement evidence-based dietary improvements",
          "Track body composition changes over time"
        ],
        detailedAnalysis: {
          clinicalContext: aiAnalysis,
          strengths: ['Assessment completed', 'Baseline established'],
          riskFactors: ['Professional guidance recommended'],
          timeline: 'Consult with registered dietitian to develop personalized nutrition strategy.'
        }
      }],
      summary: aiAnalysis,
      assessmentType
    };
  }
}
function resilienceIndexParseAIResponse(aiAnalysis, assessmentType) {
  try {
    // Extract overall score and rating
    const scoreMatch = aiAnalysis.match(/OVERALL_SCORE:\s*(\d+)/i);
    const overallScore = scoreMatch ? parseInt(scoreMatch[1]) : 75;

    const ratingMatch = aiAnalysis.match(/OVERALL_RATING:\s*([^\n]+)/i);
    const overallRating = ratingMatch ? ratingMatch[1].trim() : "High Resilience";

    // Extract category analysis section
    const categorySection = aiAnalysis.match(/CATEGORY_ANALYSIS:(.*?)(?=DETAILED_ANALYSIS:|$)/is);
    const results = [];

    // Extract detailed analysis section
    const detailedSection = aiAnalysis.match(/DETAILED_ANALYSIS:(.*?)(?=DETAILED_SUMMARY:|$)/is);
    const detailedAnalysisMap = new Map();

    // Parse detailed analysis first - Resilience Index specific categories
    if (detailedSection) {
      const categories = [
        'Stress Response',
        'Recovery Capacity',
        'Adaptability',
        'Social Support',
        'Mental Toughness'
      ];

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
      const categories = [
        'Stress Response',
        'Recovery Capacity',
        'Adaptability',
        'Social Support',
        'Mental Toughness'
      ];

      categories.forEach(category => {
        const categoryRegex = new RegExp(`${category}:\\s*([^\\n]+)`, 'i');
        const categoryMatch = categorySection[1].match(categoryRegex);

        if (categoryMatch) {
          const parts = categoryMatch[1].split('|').map(p => p.trim());

          if (parts.length >= 4) {
            const score = parseInt(parts[0]) || 75;
            const level = parts[1].toLowerCase();
            const description = parts[2];
            const recommendations = parts.slice(3).filter(r => r.length > 0);

            // Get detailed analysis for this category
            const detailedAnalysis = detailedAnalysisMap.get(category) || {
              clinicalContext: `Your ${category.toLowerCase()} assessment reveals important resilience patterns.`,
              strengths: ['Baseline resilience present', 'Awareness of resilience factors'],
              riskFactors: ['Development opportunities identified'],
              timeline: 'Measurable improvements typically occur within 8-12 weeks with consistent practice.'
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
      console.log("Creating fallback structure for Resilience Index");

      const fallbackCategories = [
        {
          name: 'Stress Response',
          desc: 'Your ability to maintain composure and effectiveness under pressure shows good baseline capacity.',
          context: 'Stress response patterns determine how effectively you perform under pressure and manage challenging situations.',
          strengths: [
            'Awareness of stress triggers',
            'Basic stress management techniques',
            'Ability to maintain some composure'
          ],
          risks: [
            'Could benefit from advanced stress inoculation',
            'Performance optimization under high pressure needed'
          ]
        },
        {
          name: 'Recovery Capacity',
          desc: 'Your bounce-back ability from setbacks demonstrates developing resilience.',
          context: 'Recovery capacity reflects how quickly and completely you rebound from adversity and integrate learning from challenges.',
          strengths: [
            'Basic recovery mechanisms present',
            'Ability to move forward after setbacks',
            'Some learning from past challenges'
          ],
          risks: [
            'Recovery speed could be accelerated',
            'Lesson extraction from failures needs deepening'
          ]
        },
        {
          name: 'Adaptability',
          desc: 'Your flexibility in adapting to change shows moderate capacity with growth potential.',
          context: 'Adaptability determines how effectively you navigate change, uncertainty, and new situations while finding opportunities.',
          strengths: [
            'Openness to some changes',
            'Basic cognitive flexibility',
            'Willingness to try new approaches'
          ],
          risks: [
            'Comfort zone expansion would benefit resilience',
            'Change tolerance could be strengthened'
          ]
        },
        {
          name: 'Social Support',
          desc: 'Your support network provides adequate foundation with room for deepening connections.',
          context: 'Social support quality is a critical resilience buffer, with strong relationships accelerating recovery and providing perspective.',
          strengths: [
            'Basic support network present',
            'Some trusted relationships',
            'Awareness of support importance'
          ],
          risks: [
            'Relationship depth could be enhanced',
            'Vulnerability and authentic connection building needed'
          ]
        },
        {
          name: 'Mental Toughness',
          desc: 'Your mental fortitude shows good baseline with opportunities for enhancement through progressive challenge.',
          context: 'Mental toughness reflects psychological fortitude, grit, self-belief, and capacity for sustained effort despite obstacles.',
          strengths: [
            'Basic confidence present',
            'Some perseverance capacity',
            'Willingness to face challenges'
          ],
          risks: [
            'Could benefit from progressive challenge protocols',
            'Self-efficacy enhancement would strengthen resilience'
          ]
        }
      ];

      fallbackCategories.forEach(cat => {
        results.push({
          category: cat.name,
          score: Math.floor(Math.random() * 20) + 70,
          maxScore: 100,
          level: 'moderate',
          description: cat.desc,
          recommendations: [
            'Implement evidence-based resilience training protocols',
            'Practice progressive stress inoculation techniques',
            'Work with resilience coach for personalized development'
          ],
          detailedAnalysis: {
            clinicalContext: cat.context,
            strengths: cat.strengths,
            riskFactors: cat.risks,
            timeline: 'Resilience capacity typically improves measurably within 8-12 weeks of consistent, progressive practice.'
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
    console.error("Error parsing Resilience Index AI response:", error);

    return {
      overallScore: 75,
      overallRating: "High Resilience",
      results: [{
        category: "Overall Assessment",
        score: 75,
        maxScore: 100,
        level: "moderate",
        description: "Your resilience assessment has been completed. Consult with mental performance professionals for personalized resilience development.",
        recommendations: [
          "Work with resilience coach to develop personalized training plan",
          "Implement evidence-based stress inoculation protocols",
          "Practice progressive challenge and recovery cycles"
        ],
        detailedAnalysis: {
          clinicalContext: aiAnalysis,
          strengths: ['Assessment completed', 'Baseline established'],
          riskFactors: ['Requires professional guidance for optimization'],
          timeline: 'Consult with mental performance specialist to develop resilience enhancement strategy.'
        }
      }],
      summary: aiAnalysis,
      assessmentType
    };
  }
}

function cardiometabolicRiskParseAIResponse(aiAnalysis, assessmentType) {
  try {
    const scoreMatch = aiAnalysis.match(/OVERALL_SCORE:\s*(\d+)/i);
    const overallScore = scoreMatch ? parseInt(scoreMatch[1]) : 75;

    const ratingMatch = aiAnalysis.match(/OVERALL_RATING:\s*([^\n]+)/i);
    const overallRating = ratingMatch ? ratingMatch[1].trim() : "Moderate Risk";

    const categorySection = aiAnalysis.match(/CATEGORY_ANALYSIS:(.*?)(?=DETAILED_ANALYSIS:|$)/is);
    const results = [];

    const detailedSection = aiAnalysis.match(/DETAILED_ANALYSIS:(.*?)(?=DETAILED_SUMMARY:|$)/is);
    const detailedAnalysisMap = new Map();

    if (detailedSection) {
      const categories = [
        'Cardiovascular Risk',
        'Metabolic Health',
        'Blood Pressure Control',
        'Lipid Profile',
        'Body Composition',
        'Inflammation Status',
        'Lifestyle Risk Factors'
      ];

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

    if (categorySection) {
      const categories = [
        'Cardiovascular Risk',
        'Metabolic Health',
        'Blood Pressure Control',
        'Lipid Profile',
        'Body Composition',
        'Inflammation Status',
        'Lifestyle Risk Factors'
      ];

      categories.forEach(category => {
        const categoryRegex = new RegExp(`${category}:\\s*([^\\n]+)`, 'i');
        const categoryMatch = categorySection[1].match(categoryRegex);

        if (categoryMatch) {
          const parts = categoryMatch[1].split('|').map(p => p.trim());

          if (parts.length >= 4) {
            const score = parseInt(parts[0]) || 75;
            const level = parts[1].toLowerCase();
            const description = parts[2];
            const recommendations = parts.slice(3).filter(r => r.length > 0);

            const detailedAnalysis = detailedAnalysisMap.get(category) || {
              clinicalContext: `Your ${category.toLowerCase()} assessment reveals important factors for disease prevention.`,
              strengths: ['Baseline assessment completed', 'Awareness of risk factors', 'Prevention opportunities identified'],
              riskFactors: ['Continue monitoring and optimization'],
              timeline: 'Regular screening and lifestyle optimization recommended.'
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

    if (results.length === 0) {
      console.log("Creating fallback structure for Cardiometabolic Risk");

      const fallbackCategories = [
        {
          name: 'Cardiovascular Risk',
          desc: 'Your cardiovascular risk profile shows good heart health with areas for optimization.',
          context: 'Cardiovascular disease is the leading cause of death globally, affecting 1 in 4 deaths. However, 80% of cardiovascular disease is preventable through lifestyle modification. Your assessment reveals important opportunities for heart disease prevention.',
          strengths: [
            'No smoking history or quit successfully',
            'Regular physical activity participation',
            'Good baseline cardiovascular fitness'
          ],
          risks: [
            'Some modifiable risk factors present',
            'Continue preventive strategies'
          ]
        },
        {
          name: 'Metabolic Health',
          desc: 'Good metabolic function with opportunities for diabetes and metabolic syndrome prevention.',
          context: 'Metabolic syndrome affects 30% of adults and increases diabetes risk 5-fold. Early intervention reduces type 2 diabetes progression by 58%. Optimizing metabolic health provides significant long-term disease prevention benefits.',
          strengths: [
            'Stable weight management',
            'Balanced eating patterns',
            'Good energy levels throughout day'
          ],
          risks: [
            'Optimize glucose metabolism',
            'Focus on insulin sensitivity improvement'
          ]
        },
        {
          name: 'Blood Pressure Control',
          desc: 'Blood pressure levels indicate good cardiovascular protection with continued focus beneficial.',
          context: 'Hypertension affects 1 in 3 UK adults, doubling stroke risk and increasing heart attack risk by 60%. Lifestyle modifications can reduce blood pressure by 10-20 mmHg, significantly lowering cardiovascular events.',
          strengths: [
            'Normal blood pressure readings',
            'Low sodium dietary approach',
            'Stress management awareness and practices'
          ],
          risks: [
            'Continue regular monitoring',
            'Maintain lifestyle protective factors'
          ]
        },
        {
          name: 'Lipid Profile',
          desc: 'Cholesterol levels show good cardiovascular protection with optimization potential.',
          context: 'Dyslipidemia contributes to 50% of cardiovascular events. Optimizing lipids reduces heart attack risk by 30-40%. Focus on HDL/LDL ratio and triglyceride management provides significant protection.',
          strengths: [
            'Healthy dietary fat choices',
            'Regular physical activity supporting HDL',
            'Good cholesterol awareness'
          ],
          risks: [
            'Continue heart-healthy fat intake',
            'Annual lipid panel monitoring recommended'
          ]
        },
        {
          name: 'Body Composition',
          desc: 'Body composition shows healthy patterns with continued focus beneficial for long-term health.',
          context: 'Obesity increases cardiovascular death risk by 50-100%. Visceral fat is metabolically active and strongly predicts cardiometabolic disease. Maintaining healthy body composition reduces multiple disease risks simultaneously.',
          strengths: [
            'Healthy weight range maintenance',
            'Good muscle mass for metabolic health',
            'Active metabolism and energy expenditure'
          ],
          risks: [
            'Monitor body composition trends quarterly',
            'Focus on sustainable healthy habits'
          ]
        },
        {
          name: 'Inflammation Status',
          desc: 'Inflammatory markers suggest good systemic health with optimization opportunities.',
          context: 'Chronic inflammation drives atherosclerosis and metabolic disease progression. Reducing inflammation lowers cardiovascular events by 25-30%. Anti-inflammatory lifestyle strategies provide broad health benefits.',
          strengths: [
            'Anti-inflammatory diet awareness',
            'Good sleep quality reducing inflammation',
            'Regular exercise with anti-inflammatory effects'
          ],
          risks: [
            'Optimize anti-inflammatory lifestyle further',
            'Consider inflammatory marker testing (hs-CRP)'
          ]
        },
        {
          name: 'Lifestyle Risk Factors',
          desc: 'Lifestyle patterns support good cardiometabolic health with areas for enhancement.',
          context: 'Lifestyle factors contribute 80% of cardiometabolic disease risk. Comprehensive lifestyle intervention reduces cardiovascular events by 50%. Small changes in multiple areas create synergistic health benefits.',
          strengths: [
            'Regular physical activity participation',
            'Balanced nutritional approach',
            'Good health awareness and motivation'
          ],
          risks: [
            'Continue building healthy behaviors',
            'Track progress with biomarker monitoring'
          ]
        }
      ];

      fallbackCategories.forEach(cat => {
        results.push({
          category: cat.name,
          score: Math.floor(Math.random() * 20) + 70,
          maxScore: 100,
          level: 'moderate',
          description: cat.desc,
          recommendations: [
            'Continue protective lifestyle factors',
            'Monitor key biomarkers regularly',
            'Focus on evidence-based prevention strategies'
          ],
          detailedAnalysis: {
            clinicalContext: cat.context,
            strengths: cat.strengths,
            riskFactors: cat.risks,
            timeline: 'Regular screening and lifestyle optimization recommended annually.'
          }
        });
      });
    }

    const summaryMatch = aiAnalysis.match(/DETAILED_SUMMARY:\s*(.*?)$/is);
    const summary = summaryMatch ? summaryMatch[1].trim() : aiAnalysis;

    // Calculate actual risk percentage (inverse of health score for display)
    // Higher health score = lower risk percentage
    const riskPercentage = Math.round(100 - overallScore);

    return {
      overallScore,
      overallRating,
      riskPercentage, // For display as "15% risk" instead of "85% health score"
      results,
      summary,
      assessmentType
    };

  } catch (error) {
    console.error("Error parsing Cardiometabolic Risk AI response:", error);

    return {
      overallScore: 75,
      overallRating: "Moderate Risk",
      riskPercentage: 25,
      results: [{
        category: "Overall Assessment",
        score: 75,
        maxScore: 100,
        level: "moderate",
        description: "Your cardiometabolic risk assessment has been completed. Focus on preventive strategies for optimal heart and metabolic health.",
        recommendations: [
          "Maintain regular cardiovascular exercise and healthy diet",
          "Monitor blood pressure, cholesterol, and glucose regularly",
          "Focus on stress management and quality sleep for inflammation reduction"
        ],
        detailedAnalysis: {
          clinicalContext: aiAnalysis,
          strengths: ['Assessment completed', 'Prevention awareness', 'Health-focused mindset'],
          riskFactors: ['Continue monitoring and optimization'],
          timeline: 'Regular screening and lifestyle optimization recommended.'
        }
      }],
      summary: aiAnalysis,
      assessmentType
    };
  }
}

function healthConciergeParseAIResponse(aiAnalysis, assessmentType) {
  try {
    // Parse overall score
    const scoreMatch = aiAnalysis.match(/OVERALL_SCORE:\s*(\d+)/i);
    const overallScore = scoreMatch ? parseInt(scoreMatch[1]) : 75;

    // Parse overall rating
    const ratingMatch = aiAnalysis.match(/OVERALL_RATING:\s*([^\n]+)/i);
    const overallRating = ratingMatch ? ratingMatch[1].trim() : "Good Potential";

    // Parse priority level (unique to Health Concierge)
    const priorityMatch = aiAnalysis.match(/PRIORITY_LEVEL:\s*([^\n]+)/i);
    const priorityLevel = priorityMatch ? priorityMatch[1].trim() : "Near-Term Focus";

    const categorySection = aiAnalysis.match(/CATEGORY_ANALYSIS:(.*?)(?=DETAILED_ANALYSIS:|$)/is);
    const results = [];

    const detailedSection = aiAnalysis.match(/DETAILED_ANALYSIS:(.*?)(?=DETAILED_SUMMARY:|$)/is);
    const detailedAnalysisMap = new Map();

    // Parse detailed analysis for each category
    if (detailedSection) {
      const categories = [
        'Health Goal Clarity',
        'Resource Readiness',
        'Challenge Complexity',
        'Optimization Pathway'
      ];

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
      const categories = [
        'Health Goal Clarity',
        'Resource Readiness',
        'Challenge Complexity',
        'Optimization Pathway'
      ];

      categories.forEach(category => {
        const categoryRegex = new RegExp(`${category}:\\s*([^\\n]+)`, 'i');
        const categoryMatch = categorySection[1].match(categoryRegex);

        if (categoryMatch) {
          const parts = categoryMatch[1].split('|').map(p => p.trim());

          if (parts.length >= 4) {
            const score = parseInt(parts[0]) || 75;
            const level = parts[1].toLowerCase();
            const description = parts[2];
            const recommendations = parts.slice(3).filter(r => r.length > 0);

            const detailedAnalysis = detailedAnalysisMap.get(category) || {
              clinicalContext: `Your ${category.toLowerCase()} assessment reveals important factors for your personalized health optimization journey.`,
              strengths: ['Assessment completed', 'Health awareness demonstrated'],
              riskFactors: ['Requires personalized strategy'],
              timeline: 'Begin optimization strategies in initial consultation.'
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

    // Fallback structure if parsing fails
    if (results.length === 0) {
      console.log("Creating fallback structure for Health Concierge");

      const fallbackCategories = [
        {
          name: 'Health Goal Clarity',
          desc: 'Your health goals are taking shape and would benefit from refinement.',
          context: 'Clear health goals predict 85% of successful outcomes. Specific, measurable goals increase adherence by 3x. Goal clarity enables personalized protocol design and sustainable behavior change.',
          strengths: [
            'Health goal identified',
            'Motivated for improvement',
            'Timeline awareness present'
          ],
          risks: [
            'Goals need specificity refinement',
            'Success metrics require definition'
          ]
        },
        {
          name: 'Resource Readiness',
          desc: 'You have resources available to support your health optimization journey.',
          context: 'Resource allocation determines 70% of health optimization success. Adequate time and financial commitment predict sustainable change. Support systems increase success by 65%.',
          strengths: [
            'Investment capacity demonstrated',
            'Time availability present',
            'Open to resource allocation'
          ],
          risks: [
            'Optimize time allocation strategy',
            'Build stronger support network'
          ]
        },
        {
          name: 'Challenge Complexity',
          desc: 'Your health challenges require a tailored, integrated approach.',
          context: 'Challenge complexity requires customized intervention strategies. Interconnected health issues need integrated approaches for 90% success rates. Root cause analysis enables effective resolution.',
          strengths: [
            'Self-awareness of health status',
            'Symptom pattern recognition',
            'Open to comprehensive solutions'
          ],
          risks: [
            'Multiple challenges need prioritization',
            'Integrated protocol design beneficial'
          ]
        },
        {
          name: 'Optimization Pathway',
          desc: 'Your preferred approach style aligns well with effective optimization strategies.',
          context: 'Personalized approach matching predicts 80% of adherence success. Alignment between preferences and protocols increases completion by 4x. Patient-centered care optimizes outcomes.',
          strengths: [
            'Clear approach preference identified',
            'Learning style awareness',
            'Action-oriented mindset'
          ],
          risks: [
            'Pathway requires fine-tuning',
            'Feedback loops need establishment'
          ]
        }
      ];

      fallbackCategories.forEach(cat => {
        results.push({
          category: cat.name,
          score: Math.floor(Math.random() * 20) + 65,
          maxScore: 100,
          level: 'moderate',
          description: cat.desc,
          recommendations: [
            'Begin with personalized health assessment',
            'Develop bespoke optimization protocol',
            'Establish ongoing support structure'
          ],
          detailedAnalysis: {
            clinicalContext: cat.context,
            strengths: cat.strengths,
            riskFactors: cat.risks,
            timeline: 'Initial strategy session within 1-2 weeks. Protocol implementation begins immediately after.'
          }
        });
      });
    }

    // Parse detailed summary
    const summaryMatch = aiAnalysis.match(/DETAILED_SUMMARY:\s*(.*?)$/is);
    const summary = summaryMatch ? summaryMatch[1].trim() : aiAnalysis;

    // Return structured report
    return {
      overallScore,
      overallRating,
      priorityLevel, // Unique to Health Concierge
      results,
      summary,
      assessmentType
    };

  } catch (error) {
    console.error("Error parsing Health Concierge AI response:", error);

    // Return safe fallback
    return {
      overallScore: 75,
      overallRating: "Good Potential",
      priorityLevel: "Near-Term Focus",
      results: [{
        category: "Overall Assessment",
        score: 75,
        maxScore: 100,
        level: "moderate",
        description: "Your health concierge assessment has been completed. We're ready to create your personalized optimization roadmap.",
        recommendations: [
          "Schedule initial health concierge consultation",
          "Review personalized protocol recommendations",
          "Begin with highest-priority interventions"
        ],
        detailedAnalysis: {
          clinicalContext: aiAnalysis,
          strengths: ['Assessment completed', 'Health commitment demonstrated'],
          riskFactors: ['Personalized strategy development needed'],
          timeline: 'Connect with health concierge team within 48-72 hours for strategy session.'
        }
      }],
      summary: aiAnalysis,
      assessmentType
    };
  }
}


function medicationBurdenParseAIResponse(aiAnalysis, assessmentType) {
  try {
    const scoreMatch = aiAnalysis.match(/OVERALL_SCORE:\s*(\d+)/i);
    const overallScore = scoreMatch ? parseInt(scoreMatch[1]) : 58;

    const ratingMatch = aiAnalysis.match(/OVERALL_RATING:\s*([^\n]+)/i);
    const overallRating = ratingMatch ? ratingMatch[1].trim() : "Moderate Burden";

    const categorySection = aiAnalysis.match(/CATEGORY_ANALYSIS:(.*?)(?=DETAILED_ANALYSIS:|$)/is);
    const results = [];

    const detailedSection = aiAnalysis.match(/DETAILED_ANALYSIS:(.*?)(?=DETAILED_SUMMARY:|$)/is);
    const detailedAnalysisMap = new Map();

    if (detailedSection) {
      const categories = [
        'Polypharmacy Risk',
        'Drug Interaction Risk',
        'Side Effect Burden',
        'Medication Management'
      ];

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

    if (categorySection) {
      const categories = [
        'Polypharmacy Risk',
        'Drug Interaction Risk',
        'Side Effect Burden',
        'Medication Management'
      ];

      categories.forEach(category => {
        const categoryRegex = new RegExp(`${category}:\\s*([^\\n]+)`, 'i');
        const categoryMatch = categorySection[1].match(categoryRegex);

        if (categoryMatch) {
          const parts = categoryMatch[1].split('|').map(p => p.trim());

          if (parts.length >= 4) {
            const score = parseInt(parts[0]) || 58;
            const level = parts[1].toLowerCase();
            const description = parts[2];
            const recommendations = parts.slice(3).filter(r => r.length > 0);

            const detailedAnalysis = detailedAnalysisMap.get(category) || {
              clinicalContext: `Your ${category.toLowerCase()} assessment reveals factors requiring pharmaceutical attention.`,
              strengths: ['Baseline assessment completed', 'Some medication awareness'],
              riskFactors: ['Could benefit from medication review'],
              timeline: 'Medication optimization benefits typically seen within 2-4 weeks.'
            };

            results.push({
              category,
              score,
              maxScore: 100,
              level: ['low', 'moderate', 'high', 'severe'].includes(level) ? level : 'moderate',
              description,
              recommendations,
              detailedAnalysis
            });
          }
        }
      });
    }

    if (results.length === 0) {
      console.log("Creating fallback structure for Medication Burden");

      const fallbackCategories = [
        {
          name: 'Polypharmacy Risk',
          desc: 'You are taking multiple medications which increases the risk of drug interactions and side effects.',
          context: 'Polypharmacy is a major patient safety concern. Patients taking 5+ medications have exponentially increased adverse drug event risk. Medication reviews can reduce inappropriate prescribing by 40-60% according to Royal Pharmaceutical Society guidance.',
          strengths: [
            'Aware of complete medication list',
            'Uses single pharmacy for dispensing',
            'Willing to discuss medication optimization'
          ],
          risks: [
            'Request comprehensive medication review',
            'Ask about discontinuing unnecessary medications'
          ]
        },
        {
          name: 'Drug Interaction Risk',
          desc: 'Moderate risk of drug interactions based on your current medication profile.',
          context: 'Drug interactions are responsible for significant morbidity. Complete medication lists including OTC drugs prevent 60% of interaction problems according to MHRA guidance.',
          strengths: [
            'Maintains updated medication list',
            'Communicates with healthcare prescribers',
            'Uses interaction checking when possible'
          ],
          risks: [
            'Include supplements and OTC drugs in medication list',
            'Use interaction checking tools before adding medications'
          ]
        },
        {
          name: 'Side Effect Burden',
          desc: 'You experience some medication-related side effects that may impact your quality of life.',
          context: 'Medication side effects significantly impact quality of life. Proactive side effect discussion improves adherence by 30-40% and timing adjustments can reduce burden.',
          strengths: [
            'Reports side effects to healthcare providers',
            'Willing to optimize medication therapy',
            'Understands importance of communication'
          ],
          risks: [
            'Discuss bothersome side effects with providers',
            'Consider timing adjustments or alternatives'
          ]
        },
        {
          name: 'Medication Management',
          desc: 'Your medication management skills are good with occasional missed doses.',
          context: 'Effective medication management is crucial for treatment success. Organized systems improve adherence by 20-30% according to NHS medication safety guidance.',
          strengths: [
            'Has organization system in place',
            'Plans ahead for medication refills',
            'Maintains regular routine'
          ],
          risks: [
            'Consider backup reminder systems',
            'Update system as medications change'
          ]
        }
      ];

      fallbackCategories.forEach(cat => {
        results.push({
          category: cat.name,
          score: Math.floor(Math.random() * 30) + 35,
          maxScore: 100,
          level: 'moderate',
          description: cat.desc,
          recommendations: [
            'Request comprehensive medication review with pharmacist',
            'Maintain complete and updated medication list',
            'Communicate regularly with healthcare providers about medications'
          ],
          detailedAnalysis: {
            clinicalContext: cat.context,
            strengths: cat.strengths,
            riskFactors: cat.risks,
            timeline: 'Medication optimization benefits typically seen within 2-4 weeks of intervention.'
          }
        });
      });
    }

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
    console.error("Error parsing Medication Burden AI response:", error);

    return {
      overallScore: 58,
      overallRating: "Moderate Burden",
      results: [{
        category: "Overall Assessment",
        score: 58,
        maxScore: 100,
        level: "moderate",
        description: "Your medication burden assessment has been completed. This provides insight into medication safety and optimization opportunities.",
        recommendations: [
          "Request comprehensive medication review with pharmacist",
          "Share results with healthcare providers",
          "Focus on safe medication optimization with professional guidance"
        ],
        detailedAnalysis: {
          clinicalContext: aiAnalysis,
          strengths: ['Assessment completed', 'Medication profile documented'],
          riskFactors: ['Professional medication review recommended'],
          timeline: 'Schedule medication review within 2-4 weeks for optimization.'
        }
      }],
      summary: aiAnalysis,
      assessmentType
    };
  }
}

function biologicalAgeParseAIResponse(aiAnalysis, assessmentType) {
  try {
    // Parse chronological and biological age
    const chronologicalAgeMatch = aiAnalysis.match(/CHRONOLOGICAL_AGE:\s*(\d+)/i);
    const chronologicalAge = chronologicalAgeMatch ? parseInt(chronologicalAgeMatch[1]) : 50;

    const biologicalAgeMatch = aiAnalysis.match(/BIOLOGICAL_AGE:\s*(\d+)/i);
    const biologicalAge = biologicalAgeMatch ? parseInt(biologicalAgeMatch[1]) : chronologicalAge;

    const ageAdvantageMatch = aiAnalysis.match(/AGE_ADVANTAGE:\s*(-?\d+)/i);
    const ageAdvantage = ageAdvantageMatch ? parseInt(ageAdvantageMatch[1]) : chronologicalAge - biologicalAge;

    const ratingMatch = aiAnalysis.match(/OVERALL_RATING:\s*([^\n]+)/i);
    const overallRating = ratingMatch ? ratingMatch[1].trim() : "Good Aging";

    // Calculate overall score based on biological age advantage
    let overallScore = 75; // default
    if (ageAdvantage >= 8) overallScore = 90;
    else if (ageAdvantage >= 5) overallScore = 85;
    else if (ageAdvantage >= 2) overallScore = 75;
    else if (ageAdvantage >= -2) overallScore = 65;
    else if (ageAdvantage >= -5) overallScore = 55;
    else overallScore = 45;

    const categorySection = aiAnalysis.match(/CATEGORY_ANALYSIS:(.*?)(?=DETAILED_ANALYSIS:|$)/is);
    const results = [];

    const detailedSection = aiAnalysis.match(/DETAILED_ANALYSIS:(.*?)(?=DETAILED_SUMMARY:|$)/is);
    const detailedAnalysisMap = new Map();

    if (detailedSection) {
      const categories = [
        'Cardiovascular Health',
        'Metabolic Function',
        'Cellular Health',
        'Cognitive Function',
        'Physical Vitality',
        'Lifestyle Factors',
        'Hormonal Balance'
      ];

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

    if (categorySection) {
      const categories = [
        'Cardiovascular Health',
        'Metabolic Function',
        'Cellular Health',
        'Cognitive Function',
        'Physical Vitality',
        'Lifestyle Factors',
        'Hormonal Balance'
      ];

      categories.forEach(category => {
        const categoryRegex = new RegExp(`${category}:\\s*([^\\n]+)`, 'i');
        const categoryMatch = categorySection[1].match(categoryRegex);

        if (categoryMatch) {
          const parts = categoryMatch[1].split('|').map(p => p.trim());

          if (parts.length >= 4) {
            const score = parseInt(parts[0]) || 75;
            const level = parts[1].toLowerCase();
            const description = parts[2];
            const recommendations = parts.slice(3).filter(r => r.length > 0);

            const detailedAnalysis = detailedAnalysisMap.get(category) || {
              clinicalContext: `Your ${category.toLowerCase()} assessment reveals important factors for healthy aging and longevity.`,
              strengths: ['Baseline function maintained', 'Awareness of health importance'],
              riskFactors: ['Could benefit from optimization'],
              timeline: 'Begin optimization strategies and monitor progress quarterly.'
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

    if (results.length === 0) {
      console.log("Creating fallback structure for Biological Age");

      const fallbackCategories = [
        {
          name: 'Cardiovascular Health',
          desc: 'Your cardiovascular system shows typical aging patterns for your age group.',
          context: 'Cardiovascular aging is a primary determinant of biological age, predicting 40-50% of overall aging trajectory. Heart health, arterial stiffness, and cardiovascular fitness are key markers.',
          strengths: [
            'Basic cardiovascular function maintained',
            'Awareness of heart health importance',
            'Some physical activity present'
          ],
          risks: [
            'Could improve aerobic fitness',
            'Heart-healthy diet optimization recommended'
          ]
        },
        {
          name: 'Metabolic Function',
          desc: 'Your metabolic markers indicate moderate aging with opportunities for optimization.',
          context: 'Metabolic health drives 30-40% of biological aging. Insulin sensitivity, glucose regulation, and metabolic flexibility are critical for longevity.',
          strengths: [
            'Reasonable metabolic awareness',
            'Basic blood sugar regulation',
            'Some dietary consciousness'
          ],
          risks: [
            'Metabolic flexibility could improve',
            'Consider time-restricted eating'
          ]
        },
        {
          name: 'Cellular Health',
          desc: 'Cellular function shows age-appropriate patterns with room for enhancement.',
          context: 'Cellular aging and senescence determine lifespan at the fundamental level. Oxidative stress, inflammation, and autophagy affect all organ systems.',
          strengths: [
            'Basic cellular repair capacity',
            'Adequate antioxidant intake',
            'Cellular function maintained'
          ],
          risks: [
            'Could reduce inflammation markers',
            'Autophagy enhancement beneficial'
          ]
        },
        {
          name: 'Cognitive Function',
          desc: 'Brain health indicators show good cognitive aging patterns.',
          context: 'Cognitive reserve protects against age-related decline. Research shows 40% of dementia is preventable through lifestyle modifications.',
          strengths: [
            'Good mental engagement',
            'Learning capacity maintained',
            'Cognitive awareness present'
          ],
          risks: [
            'Could increase cognitive challenges',
            'Brain-healthy nutrition recommended'
          ]
        },
        {
          name: 'Physical Vitality',
          desc: 'Physical function shows typical age-related patterns with optimization potential.',
          context: 'Physical function predicts longevity and healthspan. Muscle mass declines 3-8% per decade after 30, making resistance training critical.',
          strengths: [
            'Basic physical function maintained',
            'Some regular activity',
            'Mobility preserved'
          ],
          risks: [
            'Muscle mass preservation needed',
            'Strength training highly recommended'
          ]
        },
        {
          name: 'Lifestyle Factors',
          desc: 'Your lifestyle patterns support moderate aging with key improvement opportunities.',
          context: 'Lifestyle determines 75% of aging trajectory. Blue Zones research shows optimal lifestyle can extend healthy lifespan by 10+ years.',
          strengths: [
            'Some healthy habits present',
            'Health awareness demonstrated',
            'Willing to optimize'
          ],
          risks: [
            'Sleep optimization important',
            'Stress management could improve'
          ]
        },
        {
          name: 'Hormonal Balance',
          desc: 'Hormonal patterns show age-typical changes with support opportunities.',
          context: 'Hormones regulate aging processes throughout the body. Natural decline starts in 30s, affecting multiple systems and overall vitality.',
          strengths: [
            'Basic endocrine function maintained',
            'Energy levels reasonable',
            'Metabolic signaling functional'
          ],
          risks: [
            'Hormonal support through lifestyle',
            'Consider regular testing'
          ]
        }
      ];

      fallbackCategories.forEach(cat => {
        results.push({
          category: cat.name,
          score: Math.floor(Math.random() * 20) + 65,
          maxScore: 100,
          level: 'moderate',
          description: cat.desc,
          recommendations: [
            'Follow evidence-based longevity practices',
            'Monitor relevant biomarkers regularly',
            'Implement gradual lifestyle optimizations'
          ],
          detailedAnalysis: {
            clinicalContext: cat.context,
            strengths: cat.strengths,
            riskFactors: cat.risks,
            timeline: 'Begin optimization strategies and reassess progress every 3-6 months.'
          }
        });
      });
    }

    const summaryMatch = aiAnalysis.match(/DETAILED_SUMMARY:\s*(.*?)$/is);
    const summary = summaryMatch ? summaryMatch[1].trim() : aiAnalysis;

    return {
      chronologicalAge,
      biologicalAge,
      ageAdvantage,
      overallScore,
      overallRating,
      results,
      summary,
      assessmentType
    };

  } catch (error) {
    console.error("Error parsing Biological Age AI response:", error);

    return {
      chronologicalAge: 50,
      biologicalAge: 50,
      ageAdvantage: 0,
      overallScore: 70,
      overallRating: "Good Aging",
      results: [{
        category: "Overall Assessment",
        score: 70,
        maxScore: 100,
        level: "moderate",
        description: "Your biological age assessment has been completed. This provides insights into your aging trajectory.",
        recommendations: [
          "Focus on evidence-based longevity practices",
          "Monitor key health biomarkers regularly",
          "Implement lifestyle optimizations gradually"
        ],
        detailedAnalysis: {
          clinicalContext: aiAnalysis,
          strengths: ['Assessment completed', 'Health awareness demonstrated'],
          riskFactors: ['Continue monitoring aging markers'],
          timeline: 'Reassess biological age every 6-12 months to track progress.'
        }
      }],
      summary: aiAnalysis,
      assessmentType
    };
  }
}

function lifestyleLimiterParseAIResponse(aiAnalysis, assessmentType) {
  try {
    const scoreMatch = aiAnalysis.match(/OVERALL_SCORE:\s*(\d+)/i);
    const overallScore = scoreMatch ? parseInt(scoreMatch[1]) : 45;

    const ratingMatch = aiAnalysis.match(/OVERALL_RATING:\s*([^\n]+)/i);
    const overallRating = ratingMatch ? ratingMatch[1].trim() : "Moderate Impact";

    const categorySection = aiAnalysis.match(/CATEGORY_ANALYSIS:(.*?)(?=DETAILED_ANALYSIS:|$)/is);
    const results = [];

    const detailedSection = aiAnalysis.match(/DETAILED_ANALYSIS:(.*?)(?=DETAILED_SUMMARY:|$)/is);
    const detailedAnalysisMap = new Map();

    if (detailedSection) {
      const categories = [
        'Work & Professional Life',
        'Social & Relationship Impact',
        'Physical Activity & Recreation',
        'Independence & Daily Living'
      ];

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

    if (categorySection) {
      const categories = [
        'Work & Professional Life',
        'Social & Relationship Impact',
        'Physical Activity & Recreation',
        'Independence & Daily Living'
      ];

      categories.forEach(category => {
        const categoryRegex = new RegExp(`${category}:\\s*([^\\n]+)`, 'i');
        const categoryMatch = categorySection[1].match(categoryRegex);

        if (categoryMatch) {
          const parts = categoryMatch[1].split('|').map(p => p.trim());

          if (parts.length >= 4) {
            const score = parseInt(parts[0]) || 45;
            const level = parts[1].toLowerCase();
            const description = parts[2];
            const recommendations = parts.slice(3).filter(r => r.length > 0);

            const detailedAnalysis = detailedAnalysisMap.get(category) || {
              clinicalContext: `Your ${category.toLowerCase()} assessment reveals factors affecting daily functioning in this life domain.`,
              strengths: ['Maintains awareness of limitations', 'Seeks adaptive strategies'],
              riskFactors: ['Could benefit from targeted adaptation approaches'],
              timeline: 'Functional improvements typically seen within 3-6 weeks of implementing strategies.'
            };

            results.push({
              category,
              score,
              maxScore: 100,
              level: ['minimal', 'mild', 'moderate', 'significant', 'severe'].includes(level) ? level : 'moderate',
              description,
              recommendations,
              detailedAnalysis
            });
          }
        }
      });
    }

    if (results.length === 0) {
      console.log("Creating fallback structure for Lifestyle Limiter");

      const fallbackCategories = [
        {
          name: 'Work & Professional Life',
          desc: 'Health issues are moderately impacting your work performance and professional activities.',
          context: 'Chronic conditions affect 20-30% of workforce productivity. Workplace accommodations improve functioning by 40-50% according to Health and Safety Executive research.',
          strengths: ['Maintains work commitment despite challenges', 'Communicates needs with employers', 'Seeks workplace solutions']
        },
        {
          name: 'Social & Relationship Impact',
          desc: 'Some impact on social activities and relationships, but manageable with planning.',
          context: 'Social isolation increases health risks by 30%. Maintaining social connections improves health outcomes according to British Psychological Society research.',
          strengths: ['Values important relationships', 'Stays socially engaged when possible', 'Adapts social activities appropriately']
        },
        {
          name: 'Physical Activity & Recreation',
          desc: 'Noticeable limitations in physical activities and recreational pursuits.',
          context: 'Modified physical activity maintains function. Adaptive recreation improves wellbeing according to Chartered Society of Physiotherapy guidelines.',
          strengths: ['Willing to adapt physical activities', 'Seeks appropriate exercise options', 'Maintains movement within capabilities']
        },
        {
          name: 'Independence & Daily Living',
          desc: 'Generally maintaining independence with some assistance needed for certain activities.',
          context: 'Assistive devices and strategies maintain 70-80% independence. Support systems enable functioning according to occupational therapy research.',
          strengths: ['Maintains daily self-care routines', 'Uses adaptive strategies effectively', 'Seeks appropriate support when needed']
        }
      ];

      fallbackCategories.forEach(cat => {
        results.push({
          category: cat.name,
          score: Math.floor(Math.random() * 25) + 35,
          maxScore: 100,
          level: 'moderate',
          description: cat.desc,
          recommendations: [
            'Implement adaptive strategies in affected life areas',
            'Build support systems for managing limitations',
            'Focus on maintaining function with appropriate accommodations'
          ],
          detailedAnalysis: {
            clinicalContext: cat.context,
            strengths: cat.strengths,
            riskFactors: ['Explore additional adaptation strategies', 'Consider professional support services'],
            timeline: 'Lifestyle adaptations show quality of life benefits within 3-6 weeks of implementation.'
          }
        });
      });
    }

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
    console.error("Error parsing Lifestyle Limiter AI response:", error);

    return {
      overallScore: 45,
      overallRating: "Moderate Impact",
      results: [{
        category: "Overall Assessment",
        score: 45,
        maxScore: 100,
        level: "moderate",
        description: "Your lifestyle limitation assessment has been completed. This provides insight into how health issues may be affecting different life domains.",
        recommendations: [
          "Implement adaptive strategies in high-impact areas",
          "Build support systems for managing limitations",
          "Focus on quality of life optimization with professional guidance"
        ],
        detailedAnalysis: {
          clinicalContext: aiAnalysis,
          strengths: ['Assessment completed', 'Lifestyle impact documented'],
          riskFactors: ['Continue adaptation strategies'],
          timeline: 'Review functional status within 4-6 weeks of implementing adaptations.'
        }
      }],
      summary: aiAnalysis,
      assessmentType
    };
  }
}


function dailyEnergyParseAIResponse(aiAnalysis, assessmentType) {
  try {
    const scoreMatch = aiAnalysis.match(/OVERALL_SCORE:\s*(\d+)/i);
    const overallScore = scoreMatch ? parseInt(scoreMatch[1]) : 65;

    const ratingMatch = aiAnalysis.match(/OVERALL_RATING:\s*([^\n]+)/i);
    const overallRating = ratingMatch ? ratingMatch[1].trim() : "Moderate Energy";

    const categorySection = aiAnalysis.match(/CATEGORY_ANALYSIS:(.*?)(?=DETAILED_ANALYSIS:|$)/is);
    const results = [];

    const detailedSection = aiAnalysis.match(/DETAILED_ANALYSIS:(.*?)(?=DETAILED_SUMMARY:|$)/is);
    const detailedAnalysisMap = new Map();

    if (detailedSection) {
      const categories = [
        'Sleep Quality & Recovery',
        'Energy Pattern Stability',
        'Stress & Recovery Balance',
        'Nutritional Energy Support'
      ];

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

    if (categorySection) {
      const categories = [
        'Sleep Quality & Recovery',
        'Energy Pattern Stability',
        'Stress & Recovery Balance',
        'Nutritional Energy Support'
      ];

      categories.forEach(category => {
        const categoryRegex = new RegExp(`${category}:\\s*([^\\n]+)`, 'i');
        const categoryMatch = categorySection[1].match(categoryRegex);

        if (categoryMatch) {
          const parts = categoryMatch[1].split('|').map(p => p.trim());

          if (parts.length >= 4) {
            const score = parseInt(parts[0]) || 65;
            const level = parts[1].toLowerCase();
            const description = parts[2];
            const recommendations = parts.slice(3).filter(r => r.length > 0);

            const detailedAnalysis = detailedAnalysisMap.get(category) || {
              clinicalContext: `Your ${category.toLowerCase()} assessment reveals factors affecting daily energy levels.`,
              strengths: ['Baseline assessment completed', 'Some energy awareness', 'Willing to optimize'],
              riskFactors: ['Could benefit from energy optimization strategies'],
              timeline: 'Energy improvements typically seen within 2-4 weeks of consistent implementation.'
            };

            results.push({
              category,
              score,
              maxScore: 100,
              level: ['excellent', 'high', 'moderate', 'low'].includes(level) ? level : 'moderate',
              description,
              recommendations,
              detailedAnalysis
            });
          }
        }
      });
    }

    if (results.length === 0) {
      console.log("Creating fallback structure for Daily Energy");

      const fallbackCategories = [
        {
          name: 'Sleep Quality & Recovery',
          desc: 'Your sleep patterns show moderate quality with opportunities for optimization to enhance energy restoration.',
          context: 'Sleep is the foundation of daily energy. Quality sleep restores 70-80% of daily energy reserves, while poor sleep reduces cognitive function by 40% according to British Sleep Society guidelines and NICE sleep recommendations.',
          strengths: [
            'Recognizes importance of quality sleep',
            'Has some established sleep routines',
            'Willing to optimize sleep habits'
          ],
          risks: [
            'Establish consistent sleep-wake schedule',
            'Optimize sleep environment for better rest'
          ]
        },
        {
          name: 'Energy Pattern Stability',
          desc: 'Your energy levels fluctuate throughout the day with opportunities to stabilize patterns through circadian optimization.',
          context: 'Circadian rhythms regulate 80% of energy patterns. Aligned circadian rhythms improve energy by 30-40%, while irregular patterns cause afternoon crashes according to British Society for Chronobiology research.',
          strengths: [
            'Some awareness of energy patterns',
            'Recognizes daily fluctuations',
            'Willing to optimize timing'
          ],
          risks: [
            'Align activities with natural circadian rhythms',
            'Establish consistent daily routines'
          ]
        },
        {
          name: 'Stress & Recovery Balance',
          desc: 'Your stress levels impact energy reserves with opportunities for better stress management and recovery practices.',
          context: 'Chronic stress depletes 50-60% of energy reserves. Effective stress management improves energy by 35-45% according to British Psychological Society stress guidelines and energy conservation research.',
          strengths: [
            'Some stress awareness',
            'Uses coping strategies when needed',
            'Recognizes need for recovery time'
          ],
          risks: [
            'Implement regular stress reduction practices',
            'Build recovery periods into daily routine'
          ]
        },
        {
          name: 'Nutritional Energy Support',
          desc: 'Your nutrition provides moderate energy support with opportunities for optimization through timing and composition.',
          context: 'Nutrition provides 60-70% of metabolic energy substrate. Stable blood sugar maintains energy, proper hydration improves energy by 20-25% according to British Dietetic Association guidelines.',
          strengths: [
            'Some healthy eating habits',
            'Understands nutrition importance',
            'Willing to optimize dietary patterns'
          ],
          risks: [
            'Stabilize blood sugar through meal timing',
            'Ensure adequate hydration throughout day'
          ]
        }
      ];

      fallbackCategories.forEach(cat => {
        results.push({
          category: cat.name,
          score: Math.floor(Math.random() * 25) + 55,
          maxScore: 100,
          level: 'moderate',
          description: cat.desc,
          recommendations: [
            'Implement evidence-based energy optimization strategies',
            'Track energy patterns to identify improvements',
            'Focus on sustainable lifestyle modifications'
          ],
          detailedAnalysis: {
            clinicalContext: cat.context,
            strengths: cat.strengths,
            riskFactors: cat.risks,
            timeline: 'Energy improvements typically seen within 2-4 weeks of consistent implementation.'
          }
        });
      });
    }

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
    console.error("Error parsing Daily Energy AI response:", error);

    return {
      overallScore: 65,
      overallRating: "Moderate Energy",
      results: [{
        category: "Overall Assessment",
        score: 65,
        maxScore: 100,
        level: "moderate",
        description: "Your energy assessment has been completed. This provides insights into your daily energy patterns and optimization opportunities.",
        recommendations: [
          'Focus on sleep quality as foundation of energy',
          'Establish consistent daily routines',
          'Implement stress management practices'
        ],
        detailedAnalysis: {
          clinicalContext: aiAnalysis,
          strengths: ['Assessment completed', 'Energy awareness developing', 'Willing to optimize'],
          riskFactors: ['Continue energy optimization efforts'],
          timeline: 'Energy improvements typically seen within 2-4 weeks of consistent implementation.'
        }
      }],
      summary: aiAnalysis,
      assessmentType
    };
  }
}

function inflammationRiskParseAIResponse(aiAnalysis, assessmentType) {
  try {
    const scoreMatch = aiAnalysis.match(/OVERALL_SCORE:\s*(\d+)/i);
    const overallScore = scoreMatch ? parseInt(scoreMatch[1]) : 32;

    const ratingMatch = aiAnalysis.match(/OVERALL_RATING:\s*([^\n]+)/i);
    const overallRating = ratingMatch ? ratingMatch[1].trim() : "Moderate Risk";

    const categorySection = aiAnalysis.match(/CATEGORY_ANALYSIS:(.*?)(?=DETAILED_ANALYSIS:|$)/is);
    const results = [];

    const detailedSection = aiAnalysis.match(/DETAILED_ANALYSIS:(.*?)(?=DETAILED_SUMMARY:|$)/is);
    const detailedAnalysisMap = new Map();

    if (detailedSection) {
      const categories = [
        'Dietary Inflammation',
        'Lifestyle Factors',
        'Sleep Quality',
        'Stress & Recovery',
        'Body Composition',
        'Environmental Factors'
      ];

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

    if (categorySection) {
      const categories = [
        'Dietary Inflammation',
        'Lifestyle Factors',
        'Sleep Quality',
        'Stress & Recovery',
        'Body Composition',
        'Environmental Factors'
      ];

      categories.forEach(category => {
        const categoryRegex = new RegExp(`${category}:\\s*([^\\n]+)`, 'i');
        const categoryMatch = categorySection[1].match(categoryRegex);

        if (categoryMatch) {
          const parts = categoryMatch[1].split('|').map(p => p.trim());

          if (parts.length >= 4) {
            const score = parseInt(parts[0]) || 32;
            const level = parts[1].toLowerCase();
            const description = parts[2];
            const recommendations = parts.slice(3).filter(r => r.length > 0);

            const detailedAnalysis = detailedAnalysisMap.get(category) || {
              clinicalContext: `Your ${category.toLowerCase()} assessment reveals factors influencing inflammatory burden.`,
              strengths: ['Baseline assessment completed', 'Some awareness of inflammatory factors'],
              riskFactors: ['Could benefit from targeted anti-inflammatory strategies'],
              timeline: 'Improvements typically seen within 4-8 weeks of consistent changes.'
            };

            results.push({
              category,
              score,
              maxScore: 100,
              level: ['low', 'moderate', 'high', 'severe'].includes(level) ? level : 'moderate',
              description,
              recommendations,
              detailedAnalysis
            });
          }
        }
      });
    }

    if (results.length === 0) {
      console.log("Creating fallback structure for Inflammation Risk");

      const fallbackCategories = [
        {
          name: 'Dietary Inflammation',
          desc: 'Your diet contains moderate inflammatory triggers that could be optimized.',
          context: 'Diet is a primary modifiable inflammation driver. Anti-inflammatory diets reduce CRP by 30-40% within 6-8 weeks according to British Dietetic Association guidelines.',
          strengths: [
            'Includes some anti-inflammatory foods in diet',
            'Aware of dietary impact on health',
            'Willing to modify eating patterns'
          ],
          risks: [
            'Reduce processed food consumption',
            'Increase omega-3 rich foods intake'
          ]
        },
        {
          name: 'Lifestyle Factors',
          desc: 'Your lifestyle choices support manageable inflammation levels with some room for improvement.',
          context: 'Physical activity is one of the most powerful anti-inflammatory interventions. Regular exercise reduces inflammatory markers by 20-30% according to NHS guidelines.',
          strengths: [
            'Maintains some regular physical activity',
            'Understands exercise health benefits',
            'Willing to increase daily movement'
          ],
          risks: [
            'Reduce sedentary time throughout day',
            'Consider adding structured exercise routine'
          ]
        },
        {
          name: 'Sleep Quality',
          desc: 'Sleep patterns are moderately impacting your inflammatory regulation.',
          context: 'Sleep is crucial for inflammatory regulation. Poor sleep increases IL-6 and TNF-alpha by 40-60% according to British Sleep Society research.',
          strengths: [
            'Recognizes importance of quality sleep',
            'Has some good sleep habits established',
            'Willing to optimize sleep routine'
          ],
          risks: [
            'Establish more consistent sleep schedule',
            'Optimize bedroom environment for sleep'
          ]
        },
        {
          name: 'Stress & Recovery',
          desc: 'You\'re managing stress reasonably well with opportunities for optimization.',
          context: 'Chronic stress is a major inflammation driver. Stress management reduces inflammatory markers by 25-35% according to British Psychological Society guidelines.',
          strengths: [
            'Has some stress awareness and monitoring',
            'Uses stress coping strategies',
            'Seeks stress reduction when possible'
          ],
          risks: [
            'Develop more structured stress management practice',
            'Consider mindfulness or relaxation techniques'
          ]
        },
        {
          name: 'Body Composition',
          desc: 'Body composition is a factor in your inflammatory profile.',
          context: 'Adipose tissue produces inflammatory cytokines. Modest weight loss (5-10%) reduces CRP by 20-30% according to NICE obesity guidelines.',
          strengths: [
            'Aware of weight impact on health',
            'Willing to optimize body composition',
            'Takes health-oriented approach'
          ],
          risks: [
            'Focus on gradual sustainable changes',
            'Consider body recomposition strategies'
          ]
        },
        {
          name: 'Environmental Factors',
          desc: 'Environmental exposures may be contributing to your inflammatory burden.',
          context: 'Environmental toxins contribute to inflammatory burden. Reducing toxin exposure improves inflammatory markers according to Public Health England.',
          strengths: [
            'Some awareness of environmental impacts',
            'Takes protective measures when possible',
            'Willing to reduce harmful exposures'
          ],
          risks: [
            'Minimize exposure to air pollutants',
            'Reduce chemical exposure in daily products'
          ]
        }
      ];

      fallbackCategories.forEach(cat => {
        results.push({
          category: cat.name,
          score: Math.floor(Math.random() * 30) + 20,
          maxScore: 100,
          level: 'moderate',
          description: cat.desc,
          recommendations: [
            'Implement evidence-based anti-inflammatory strategies',
            'Track inflammatory indicators over time',
            'Consult healthcare provider about inflammatory markers'
          ],
          detailedAnalysis: {
            clinicalContext: cat.context,
            strengths: cat.strengths,
            riskFactors: cat.risks,
            timeline: 'Anti-inflammatory improvements typically seen within 4-8 weeks of consistent lifestyle changes.'
          }
        });
      });
    }

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
    console.error("Error parsing Inflammation Risk AI response:", error);

    return {
      overallScore: 32,
      overallRating: "Moderate Risk",
      results: [{
        category: "Overall Assessment",
        score: 32,
        maxScore: 100,
        level: "moderate",
        description: "Your inflammation risk assessment has been completed. This provides insight into modifiable factors affecting your inflammatory burden.",
        recommendations: [
          "Implement evidence-based anti-inflammatory lifestyle strategies",
          "Share results with healthcare provider for inflammatory marker testing",
          "Focus on sustainable changes with highest impact potential"
        ],
        detailedAnalysis: {
          clinicalContext: aiAnalysis,
          strengths: ['Assessment completed', 'Baseline inflammatory profile documented'],
          riskFactors: ['Continue anti-inflammatory lifestyle practices'],
          timeline: 'Review inflammatory status with healthcare team within 8-12 weeks.'
        }
      }],
      summary: aiAnalysis,
      assessmentType
    };
  }
}

function symptomSeverityParseAIResponse(aiAnalysis, assessmentType) {
  try {
    const scoreMatch = aiAnalysis.match(/OVERALL_SCORE:\s*(\d+)/i);
    const overallScore = scoreMatch ? parseInt(scoreMatch[1]) : 42;

    const ratingMatch = aiAnalysis.match(/OVERALL_RATING:\s*([^\n]+)/i);
    const overallRating = ratingMatch ? ratingMatch[1].trim() : "Moderate Symptoms";

    const categorySection = aiAnalysis.match(/CATEGORY_ANALYSIS:(.*?)(?=DETAILED_ANALYSIS:|$)/is);
    const results = [];

    const detailedSection = aiAnalysis.match(/DETAILED_ANALYSIS:(.*?)(?=DETAILED_SUMMARY:|$)/is);
    const detailedAnalysisMap = new Map();

    if (detailedSection) {
      const categories = [
        'Pain Assessment',
        'Fatigue Impact',
        'Digestive Symptoms',
        'Joint & Mobility',
        'Sleep Quality',
        'Cognitive Function',
        'Emotional Wellbeing'
      ];

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

    if (categorySection) {
      const categories = [
        'Pain Assessment',
        'Fatigue Impact',
        'Digestive Symptoms',
        'Joint & Mobility',
        'Sleep Quality',
        'Cognitive Function',
        'Emotional Wellbeing'
      ];

      categories.forEach(category => {
        const categoryRegex = new RegExp(`${category}:\\s*([^\\n]+)`, 'i');
        const categoryMatch = categorySection[1].match(categoryRegex);

        if (categoryMatch) {
          const parts = categoryMatch[1].split('|').map(p => p.trim());

          if (parts.length >= 4) {
            const score = parseInt(parts[0]) || 42;
            const level = parts[1].toLowerCase();
            const description = parts[2];
            const recommendations = parts.slice(3).filter(r => r.length > 0);

            const detailedAnalysis = detailedAnalysisMap.get(category) || {
              clinicalContext: `Your ${category.toLowerCase()} assessment reveals important patterns for symptom management planning.`,
              strengths: ['Baseline assessment completed', 'Awareness of symptoms'],
              riskFactors: ['Could benefit from targeted management strategies'],
              timeline: 'Improvements typically seen within 4-8 weeks of consistent intervention.'
            };

            results.push({
              category,
              score,
              maxScore: 100,
              level: ['low', 'moderate', 'high', 'severe'].includes(level) ? level : 'moderate',
              description,
              recommendations,
              detailedAnalysis
            });
          }
        }
      });
    }

    if (results.length === 0) {
      console.log("Creating fallback structure for Symptom Severity");

      const fallbackCategories = [
        {
          name: 'Pain Assessment',
          desc: 'Your pain levels indicate moderate discomfort that may benefit from management strategies.',
          context: 'Chronic pain affects 20-30% of adults with significant quality of life impact. Multimodal pain management approaches show 30-40% improvement with consistent application.',
          strengths: [
            'Good pain awareness and self-monitoring',
            'Willing to try multiple approaches',
            'Maintains activity despite discomfort'
          ],
          risks: [
            'Consider anti-inflammatory dietary modifications',
            'Explore mind-body pain management techniques'
          ]
        },
        {
          name: 'Fatigue Impact',
          desc: 'Fatigue is impacting your daily activities and may require targeted intervention.',
          context: 'Chronic fatigue is multifactorial involving sleep, stress, and medical causes. Targeted interventions improve energy by 40-50% within weeks.',
          strengths: [
            'Awareness of energy patterns throughout day',
            'Willing to prioritize rest and recovery',
            'Seeks to understand underlying causes'
          ],
          risks: [
            'Optimize sleep hygiene and duration',
            'Consider energy conservation techniques'
          ]
        },
        {
          name: 'Digestive Symptoms',
          desc: 'Your digestive symptoms warrant monitoring and dietary attention.',
          context: 'Functional digestive disorders affect 10-20% of population. Dietary modifications help 70-80% of patients identify and manage triggers.',
          strengths: [
            'Attentive to dietary patterns and triggers',
            'Willing to track symptoms systematically',
            'Open to dietary modifications'
          ],
          risks: [
            'Keep detailed food diary to identify triggers',
            'Consider gradual increase in fiber intake'
          ]
        },
        {
          name: 'Joint & Mobility',
          desc: 'Joint stiffness and mobility issues are affecting your daily function.',
          context: 'Joint symptoms affect mobility and quality of life. Exercise and lifestyle modifications reduce pain by 25-40% with consistent practice.',
          strengths: [
            'Maintains some level of daily activity',
            'Understands importance of movement',
            'Willing to try gentle exercise approaches'
          ],
          risks: [
            'Incorporate gentle stretching into routine',
            'Consider low-impact exercises like swimming'
          ]
        },
        {
          name: 'Sleep Quality',
          desc: 'Sleep quality issues may be contributing to other symptoms.',
          context: 'Sleep disorders affect 30-40% of adults with significant health impacts. Sleep hygiene improvements increase quality by 50-60%.',
          strengths: [
            'Recognizes importance of quality sleep',
            'Willing to modify evening habits',
            'Tracks sleep patterns'
          ],
          risks: [
            'Establish consistent sleep-wake schedule',
            'Optimize bedroom environment for sleep'
          ]
        },
        {
          name: 'Cognitive Function',
          desc: 'Mental clarity and focus may benefit from targeted support.',
          context: 'Brain fog and cognitive symptoms are common in chronic conditions. Mental health, sleep, and lifestyle factors significantly impact cognition.',
          strengths: [
            'Aware of cognitive patterns and triggers',
            'Uses compensatory strategies effectively',
            'Seeks cognitive optimization'
          ],
          risks: [
            'Practice cognitive pacing techniques',
            'Address sleep and stress as cognitive factors'
          ]
        },
        {
          name: 'Emotional Wellbeing',
          desc: 'Emotional health is an important component of overall symptom management.',
          context: 'Emotional health is integral to physical symptom management. Psychological interventions reduce symptom burden by 30-50%.',
          strengths: [
            'Self-aware of emotional patterns',
            'Uses healthy coping strategies',
            'Seeks support when needed'
          ],
          risks: [
            'Consider stress reduction techniques',
            'Explore mind-body practices like meditation'
          ]
        }
      ];

      fallbackCategories.forEach(cat => {
        results.push({
          category: cat.name,
          score: Math.floor(Math.random() * 30) + 25,
          maxScore: 100,
          level: 'moderate',
          description: cat.desc,
          recommendations: [
            'Track symptom patterns in a journal',
            'Discuss findings with healthcare provider',
            'Implement recommended lifestyle modifications'
          ],
          detailedAnalysis: {
            clinicalContext: cat.context,
            strengths: cat.strengths,
            riskFactors: cat.risks,
            timeline: 'Symptom improvements typically seen within 4-8 weeks of consistent management.'
          }
        });
      });
    }

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
    console.error("Error parsing Symptom Severity AI response:", error);

    return {
      overallScore: 42,
      overallRating: "Moderate Symptoms",
      results: [{
        category: "Overall Assessment",
        score: 42,
        maxScore: 100,
        level: "moderate",
        description: "Your symptom severity assessment has been completed. This provides a baseline for tracking symptom patterns and management effectiveness.",
        recommendations: [
          "Share these results with your healthcare provider",
          "Begin implementing priority symptom management strategies",
          "Track symptom patterns over time to assess improvement"
        ],
        detailedAnalysis: {
          clinicalContext: aiAnalysis,
          strengths: ['Assessment completed', 'Symptom awareness documented'],
          riskFactors: ['Continue monitoring symptoms'],
          timeline: 'Review symptom patterns with healthcare team within 4-8 weeks.'
        }
      }],
      summary: aiAnalysis,
      assessmentType
    };
  }
}
function anaesthesiaRiskParseAIResponse(aiAnalysis, assessmentType) {
  try {
    const scoreMatch = aiAnalysis.match(/OVERALL_SCORE:\s*(\d+)/i);
    const overallScore = scoreMatch ? parseInt(scoreMatch[1]) : 75;

    const ratingMatch = aiAnalysis.match(/OVERALL_RATING:\s*([^\n]+)/i);
    const overallRating = ratingMatch ? ratingMatch[1].trim() : "Safe with Precautions";

    const categorySection = aiAnalysis.match(/CATEGORY_ANALYSIS:(.*?)(?=DETAILED_ANALYSIS:|$)/is);
    const results = [];

    const detailedSection = aiAnalysis.match(/DETAILED_ANALYSIS:(.*?)(?=DETAILED_SUMMARY:|$)/is);
    const detailedAnalysisMap = new Map();

    if (detailedSection) {
      const categories = [
        'Airway Management Risk',
        'Sleep Apnoea Risk',
        'Medication Interactions',
        'Substance Use Impact',
        'Previous Anaesthesia History',
        'Allergy & Reaction Risk'
      ];

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

    if (categorySection) {
      const categories = [
        'Airway Management Risk',
        'Sleep Apnoea Risk',
        'Medication Interactions',
        'Substance Use Impact',
        'Previous Anaesthesia History',
        'Allergy & Reaction Risk'
      ];

      categories.forEach(category => {
        const categoryRegex = new RegExp(`${category}:\\s*([^\\n]+)`, 'i');
        const categoryMatch = categorySection[1].match(categoryRegex);

        if (categoryMatch) {
          const parts = categoryMatch[1].split('|').map(p => p.trim());

          if (parts.length >= 4) {
            const score = parseInt(parts[0]) || 75;
            const level = parts[1].toLowerCase();
            const description = parts[2];
            const recommendations = parts.slice(3).filter(r => r.length > 0);

            const detailedAnalysis = detailedAnalysisMap.get(category) || {
              clinicalContext: `Your ${category.toLowerCase()} assessment reveals important factors for anaesthesia safety planning.`,
              strengths: ['Baseline assessment completed', 'Standard protocols appropriate'],
              riskFactors: ['Requires anaesthesia team review'],
              timeline: 'Discuss with anaesthesia team before surgery.'
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

    if (results.length === 0) {
      console.log("Creating fallback structure for Anaesthesia Risk");

      const fallbackCategories = [
        {
          name: 'Airway Management Risk',
          desc: 'Your airway assessment indicates manageable risk for anaesthesia delivery.',
          context: 'Airway assessment is crucial for safe anaesthesia. Proper evaluation predicts 80-90% of potential difficulties.',
          strengths: [
            'Good neck mobility and mouth opening',
            'No previous airway difficulties reported',
            'Standard airway management appropriate'
          ],
          risks: [
            'Standard monitoring protocols required'
          ]
        },
        {
          name: 'Sleep Apnoea Risk',
          desc: 'Sleep-related factors may require consideration during anaesthesia.',
          context: 'Obstructive sleep apnoea affects 10-15% of adults and increases perioperative complications 2-3x.',
          strengths: [
            'Awareness of sleep patterns',
            'No severe daytime sleepiness',
            'Willing to cooperate with monitoring'
          ],
          risks: [
            'May benefit from sleep study evaluation',
            'Extended post-operative monitoring may be advised'
          ]
        },
        {
          name: 'Medication Interactions',
          desc: 'Current medications require review for anaesthetic interactions.',
          context: 'Drug interactions with anaesthetic agents can impact safety. Proper review prevents 70% of complications.',
          strengths: [
            'Good medication compliance',
            'Clear medication documentation',
            'Regular medication reviews'
          ],
          risks: [
            'Some medications require timing adjustments',
            'Drug interaction assessment needed'
          ]
        },
        {
          name: 'Substance Use Impact',
          desc: 'Substance use history requires consideration for anaesthetic planning.',
          context: 'Alcohol and substance use significantly affects anaesthetic requirements and recovery outcomes.',
          strengths: [
            'Willing to modify habits for surgery',
            'Understands anaesthetic implications',
            'Open communication with team'
          ],
          risks: [
            'May require adjusted anaesthetic doses',
            'Cessation timeline important'
          ]
        },
        {
          name: 'Previous Anaesthesia History',
          desc: 'Your previous anaesthesia experiences provide valuable safety insights.',
          context: 'Previous experiences are strong predictors with 90% likelihood of similar outcomes.',
          strengths: [
            'Previous anaesthesia experiences documented',
            'No major complications reported',
            'Good historical information available'
          ],
          risks: [
            'Minor post-operative nausea previously'
          ]
        },
        {
          name: 'Allergy & Reaction Risk',
          desc: 'Known allergies require precautionary measures during anaesthesia.',
          context: 'Perioperative allergic reactions occur in 1:10,000-1:20,000 cases. Proper identification prevents 95% of serious complications.',
          strengths: [
            'Allergies well documented',
            'Previous procedures without allergic reactions',
            'Emergency protocols available'
          ],
          risks: [
            'Requires allergy documentation review',
            'Precautionary medications may be needed'
          ]
        }
      ];

      fallbackCategories.forEach(cat => {
        results.push({
          category: cat.name,
          score: Math.floor(Math.random() * 20) + 70,
          maxScore: 100,
          level: 'moderate',
          description: cat.desc,
          recommendations: [
            'Discuss assessment results with your anaesthesia team',
            'Follow all pre-operative fasting and medication instructions',
            'Inform team of any changes to health status before surgery'
          ],
          detailedAnalysis: {
            clinicalContext: cat.context,
            strengths: cat.strengths,
            riskFactors: cat.risks,
            timeline: 'Review with anaesthesia team 1-2 weeks before scheduled surgery.'
          }
        });
      });
    }

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
    console.error("Error parsing Anaesthesia Risk AI response:", error);

    return {
      overallScore: 75,
      overallRating: "Safe with Precautions",
      results: [{
        category: "Overall Assessment",
        score: 75,
        maxScore: 100,
        level: "moderate",
        description: "Your anaesthesia risk assessment has been completed. Please discuss these results with your anaesthesia team.",
        recommendations: [
          "Share this assessment with your anaesthetist during pre-operative consultation",
          "Follow all pre-operative instructions carefully",
          "Inform team of any health changes before surgery"
        ],
        detailedAnalysis: {
          clinicalContext: aiAnalysis,
          strengths: ['Assessment completed', 'Information documented'],
          riskFactors: ['Requires anaesthesia team review'],
          timeline: 'Discuss with anaesthesia team before surgery date.'
        }
      }],
      summary: aiAnalysis,
      assessmentType
    };
  }
}
function mobilityStrengthParseAIResponse(aiAnalysis, assessmentType) {
  try {
    const scoreMatch = aiAnalysis.match(/OVERALL_SCORE:\s*(\d+)/i);
    const overallScore = scoreMatch ? parseInt(scoreMatch[1]) : 75;

    const ratingMatch = aiAnalysis.match(/OVERALL_RATING:\s*([^\n]+)/i);
    const overallRating = ratingMatch ? ratingMatch[1].trim() : "Strong Baseline";

    const categorySection = aiAnalysis.match(/CATEGORY_ANALYSIS:(.*?)(?=DETAILED_ANALYSIS:|$)/is);
    const results = [];

    const detailedSection = aiAnalysis.match(/DETAILED_ANALYSIS:(.*?)(?=DETAILED_SUMMARY:|$)/is);
    const detailedAnalysisMap = new Map();

    if (detailedSection) {
      const categories = [
        'Cardiovascular Endurance',
        'Lower Body Strength',
        'Balance & Stability',
        'Upper Body Strength',
        'Functional Independence',
        'Pain & Limitations',
        'Activity Baseline'
      ];

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

    if (categorySection) {
      const categories = [
        'Cardiovascular Endurance',
        'Lower Body Strength',
        'Balance & Stability',
        'Upper Body Strength',
        'Functional Independence',
        'Pain & Limitations',
        'Activity Baseline'
      ];

      categories.forEach(category => {
        const categoryRegex = new RegExp(`${category}:\\s*([^\\n]+)`, 'i');
        const categoryMatch = categorySection[1].match(categoryRegex);

        if (categoryMatch) {
          const parts = categoryMatch[1].split('|').map(p => p.trim());

          if (parts.length >= 4) {
            const score = parseInt(parts[0]) || 75;
            const level = parts[1].toLowerCase();
            const description = parts[2];
            const recommendations = parts.slice(3).filter(r => r.length > 0);

            const detailedAnalysis = detailedAnalysisMap.get(category) || {
              clinicalContext: `Your ${category.toLowerCase()} assessment reveals important factors for recovery planning.`,
              strengths: ['Baseline assessment completed', 'Standard protocols appropriate'],
              riskFactors: ['Could benefit from targeted training'],
              timeline: 'Begin conditioning 4-6 weeks before surgery.'
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

    if (results.length === 0) {
      console.log("Creating fallback structure for Mobility & Strength");

      const fallbackCategories = [
        {
          name: 'Cardiovascular Endurance',
          desc: 'Your walking ability and endurance indicate good cardiovascular fitness for recovery.',
          context: 'Cardiovascular fitness is strongly predictive of surgical outcomes. Good pre-operative fitness reduces recovery time by 30-40% and complications by 50%.',
          strengths: [
            'Can walk reasonable distances',
            'Good stamina during activities',
            'No severe breathlessness'
          ],
          risks: [
            'Could improve with consistent walking routine',
            'Gradual increase in duration recommended'
          ]
        },
        {
          name: 'Lower Body Strength',
          desc: 'Good lower body strength provides a foundation for post-surgical mobility.',
          context: 'Lower body strength is crucial for post-surgical mobility. Strong leg muscles reduce fall risk by 40% and enable earlier mobilization.',
          strengths: [
            'Daily activities maintained',
            'Good functional leg capacity',
            'Can manage stairs'
          ],
          risks: [
            'Some strengthening exercises beneficial',
            'Focus on chair rises and squats'
          ]
        },
        {
          name: 'Balance & Stability',
          desc: 'Your balance is adequate but could benefit from improvement to reduce fall risk.',
          context: 'Balance is critical for safe mobility and fall prevention. Poor balance increases post-operative fall risk by 300%.',
          strengths: [
            'No recent falls',
            'Confident during movement',
            'Good spatial awareness'
          ],
          risks: [
            'Dynamic balance could improve',
            'Practice single-leg stands recommended'
          ]
        },
        {
          name: 'Upper Body Strength',
          desc: 'Good functional strength supports independent recovery activities.',
          context: 'Upper body and grip strength correlate with overall muscle mass and predict 90% of functional recovery outcomes.',
          strengths: [
            'Adequate grip strength',
            'Can perform daily tasks',
            'Good arm coordination'
          ],
          risks: [
            'Some upper body strengthening beneficial'
          ]
        },
        {
          name: 'Functional Independence',
          desc: 'High level of independence in daily activities suggests excellent recovery potential.',
          context: 'Pre-operative independence strongly predicts post-operative outcomes. High baseline independence leads to 50% better recovery.',
          strengths: [
            'Fully independent in self-care',
            'Good problem-solving skills',
            'High baseline function'
          ],
          risks: [
            'Plan temporary support for immediate post-op'
          ]
        },
        {
          name: 'Pain & Limitations',
          desc: 'Current discomfort is manageable and shouldn\'t significantly impact recovery with proper planning.',
          context: 'Existing pain affects but doesn\'t prevent successful recovery when well-managed with appropriate strategies.',
          strengths: [
            'Good pain awareness',
            'Effective coping strategies',
            'Willing to follow pain protocols'
          ],
          risks: [
            'Optimize pain management before surgery',
            'Discuss perioperative control strategies'
          ]
        },
        {
          name: 'Activity Baseline',
          desc: 'Your regular activity level provides a good foundation for rehabilitation.',
          context: 'Current activity level provides foundation for recovery. Active patients have 40% faster recovery and better long-term outcomes.',
          strengths: [
            'Regular physical activity',
            'Good exercise tolerance',
            'Positive attitude toward movement'
          ],
          risks: [
            'Activity will need modification post-surgery'
          ]
        }
      ];

      fallbackCategories.forEach(cat => {
        results.push({
          category: cat.name,
          score: Math.floor(Math.random() * 20) + 70,
          maxScore: 100,
          level: 'moderate',
          description: cat.desc,
          recommendations: [
            'Maintain current activity levels before surgery',
            'Practice recommended exercises daily',
            'Focus on areas identified for improvement'
          ],
          detailedAnalysis: {
            clinicalContext: cat.context,
            strengths: cat.strengths,
            riskFactors: cat.risks,
            timeline: 'Begin conditioning program 4-6 weeks before scheduled surgery.'
          }
        });
      });
    }

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
    console.error("Error parsing Mobility & Strength AI response:", error);

    return {
      overallScore: 75,
      overallRating: "Strong Baseline",
      results: [{
        category: "Overall Assessment",
        score: 75,
        maxScore: 100,
        level: "moderate",
        description: "Your mobility and strength assessment has been completed. This baseline will help track your recovery progress.",
        recommendations: [
          "Maintain current activity levels until surgery",
          "Focus on daily walking and strength exercises",
          "Follow physiotherapist recommendations for conditioning"
        ],
        detailedAnalysis: {
          clinicalContext: aiAnalysis,
          strengths: ['Assessment completed', 'Baseline documented'],
          riskFactors: ['Continue conditioning program'],
          timeline: 'Begin pre-operative conditioning 4-6 weeks before surgery.'
        }
      }],
      summary: aiAnalysis,
      assessmentType
    };
  }
}
function surgeryParseAIResponse(aiAnalysis, assessmentType){
  try {
    // Extract overall score and rating
    const scoreMatch = aiAnalysis.match(/OVERALL_SCORE:\s*(\d+)/i);
    const overallScore = scoreMatch ? parseInt(scoreMatch[1]) : 70;

    const ratingMatch = aiAnalysis.match(/OVERALL_RATING:\s*([^\n]+)/i);
    const overallRating = ratingMatch ? ratingMatch[1].trim() : "Good";

    // Extract category analysis section
    const categorySection = aiAnalysis.match(/CATEGORY_ANALYSIS:(.*?)(?=DETAILED_ANALYSIS:|$)/is);
    const results = [];

    // Extract detailed analysis section
    const detailedSection = aiAnalysis.match(/DETAILED_ANALYSIS:(.*?)(?=DETAILED_SUMMARY:|$)/is);
    const detailedAnalysisMap = new Map();

    // Parse detailed analysis first - Surgery Readiness specific categories
    if (detailedSection) {
      const categories = [
        'Physical Readiness',
        'Metabolic Health',
        'Recovery Potential',
        'Risk Factors',
        'Preparation Status'
      ];

      categories.forEach(category => {
        const regex = new RegExp(`${category}\\|([^|]+)\\|([^|]+)\\|([^|]+)\\|([^\\n]+)`, 'i');
        const match = detailedSection[1].match(regex);

        if (match) {
          detailedAnalysisMap.set(category, {
            clinicalContext: match[1].trim(),
            evidenceBase: match[2].trim().split(',').map(s => s.trim()).filter(s => s.length > 0),
            riskFactors: match[3].trim().split(',').map(r => r.trim()).filter(r => r.length > 0),
            timeline: match[4].trim()
          });
        }
      });
    }

    // Parse category analysis
    if (categorySection) {
      const categories = [
        'Physical Readiness',
        'Metabolic Health',
        'Recovery Potential',
        'Risk Factors',
        'Preparation Status'
      ];

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
              clinicalContext: `Your ${category.toLowerCase()} assessment reveals important factors for surgical preparation.`,
              evidenceBase: ['Evidence-based assessment completed', 'Consult healthcare provider for detailed guidance'],
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
      console.log("Creating fallback structure for Surgery Readiness");

      const fallbackCategories = [
        {
          name: 'Physical Readiness',
          desc: 'Your physical condition shows good preparation for surgical procedures.',
          context: 'Based on your exercise patterns and fitness levels, your physical readiness is on track.',
          evidence: [
            'NHS guidelines recommend 150 minutes of moderate exercise weekly for surgical preparation',
            'ERAS protocols show that prehabilitation improves surgical outcomes',
            'Regular physical activity is associated with reduced postoperative complications'
          ],
          risks: [
            'Sedentary lifestyle may increase surgical risks',
            'Limited cardiovascular fitness could affect recovery'
          ]
        },
        {
          name: 'Metabolic Health',
          desc: 'Your metabolic markers indicate room for optimization before surgery.',
          context: 'Metabolic stability and blood glucose control are important factors for surgical outcomes.',
          evidence: [
            'NICE guidelines emphasize optimal glycemic control before elective surgery',
            'Diabetes UK research shows improved metabolic control enhances healing',
            'Nutritional optimization supports better wound healing and recovery'
          ],
          risks: [
            'Uncontrolled blood sugar may affect healing',
            'Metabolic imbalances can increase complication risk'
          ]
        },
        {
          name: 'Recovery Potential',
          desc: 'Excellent indicators for post-surgical healing and recovery.',
          context: 'Your sleep quality, stress management, and overall recovery markers show positive signs.',
          evidence: [
            'Research shows 7-9 hours sleep supports immune function and healing',
            'Stress management is associated with improved surgical recovery',
            'Adequate vitamin D levels support bone health and immune function'
          ],
          risks: [
            'Sleep deprivation may affect immune response',
            'Chronic stress can impact healing processes'
          ]
        },
        {
          name: 'Risk Factors',
          desc: 'Some risk factors identified that should be addressed pre-surgery.',
          context: 'Modifiable risk factors can be optimized to improve surgical outcomes.',
          evidence: [
            'NICE guidelines recommend smoking cessation 4 weeks before surgery',
            'Royal College of Surgeons emphasizes preoperative risk modification',
            'Medication optimization reduces perioperative complications'
          ],
          risks: [
            'Smoking significantly increases surgical complications',
            'Unmanaged chronic conditions may increase risk'
          ]
        },
        {
          name: 'Preparation Status',
          desc: 'Your preparation efforts are on track but could be enhanced.',
          context: 'Comprehensive preoperative preparation improves outcomes and patient experience.',
          evidence: [
            'ERAS protocols reduce hospital stay and improve outcomes',
            'NHS guidance emphasizes preoperative education importance',
            'Structured preparation programs reduce anxiety and complications'
          ],
          risks: [
            'Inadequate preparation may increase anxiety',
            'Limited surgical knowledge can affect recovery'
          ]
        }
      ];

      fallbackCategories.forEach(cat => {
        results.push({
          category: cat.name,
          score: Math.floor(Math.random() * 20) + 70,
          maxScore: 100,
          level: 'moderate',
          description: cat.desc,
          recommendations: [
            'Consult with your healthcare provider for personalized guidance',
            'Follow preoperative preparation protocols carefully',
            'Ensure all medical information is shared with your surgical team'
          ],
          detailedAnalysis: {
            clinicalContext: cat.context,
            evidenceBase: cat.evidence,
            riskFactors: cat.risks,
            timeline: 'Begin optimization 4-8 weeks before scheduled surgery for best results.'
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
    console.error("Error parsing Surgery Readiness AI response:", error);

    return {
      overallScore: 70,
      overallRating: "Good",
      results: [{
        category: "Overall Assessment",
        score: 70,
        maxScore: 100,
        level: "moderate",
        description: "Your surgical readiness assessment has been completed. Please consult with your healthcare provider.",
        recommendations: [
          "Discuss your readiness assessment results with your surgical team",
          "Follow all preoperative preparation instructions carefully",
          "Ensure complete medical disclosure to optimize your surgical outcomes"
        ],
        detailedAnalysis: {
          clinicalContext: aiAnalysis,
          evidenceBase: ['Assessment completed', 'Consultation recommended'],
          riskFactors: ['Requires medical consultation'],
          timeline: 'Consult with healthcare team as soon as possible.'
        }
      }],
      summary: aiAnalysis,
      assessmentType
    };
  }
}

function recoverySpeedParseAIResponse(aiAnalysis, assessmentType) {
  try {
    // Extract overall score and rating
    const scoreMatch = aiAnalysis.match(/OVERALL_SCORE:\s*(\d+)/i);
    const overallScore = scoreMatch ? parseInt(scoreMatch[1]) : 75;

    const ratingMatch = aiAnalysis.match(/OVERALL_RATING:\s*([^\n]+)/i);
    const overallRating = ratingMatch ? ratingMatch[1].trim() : "Good Recovery";

    // Extract category analysis section
    const categorySection = aiAnalysis.match(/CATEGORY_ANALYSIS:(.*?)(?=DETAILED_ANALYSIS:|$)/is);
    const results = [];

    // Extract detailed analysis section
    const detailedSection = aiAnalysis.match(/DETAILED_ANALYSIS:(.*?)(?=DETAILED_SUMMARY:|$)/is);
    const detailedAnalysisMap = new Map();

    // Parse detailed analysis first - Recovery Speed specific categories
    if (detailedSection) {
      const categories = [
        'Nutritional Foundation',
        'Mental Readiness',
        'Support System Strength',
        'Home Environment Readiness',
        'Sleep Quality Impact',
        'Physical Baseline'
      ];

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
      const categories = [
        'Nutritional Foundation',
        'Mental Readiness',
        'Support System Strength',
        'Home Environment Readiness',
        'Sleep Quality Impact',
        'Physical Baseline'
      ];

      categories.forEach(category => {
        const categoryRegex = new RegExp(`${category}:\\s*([^\\n]+)`, 'i');
        const categoryMatch = categorySection[1].match(categoryRegex);

        if (categoryMatch) {
          const parts = categoryMatch[1].split('|').map(p => p.trim());

          if (parts.length >= 4) {
            const score = parseInt(parts[0]) || 75;
            const level = parts[1].toLowerCase();
            const description = parts[2];
            const recommendations = parts.slice(3).filter(r => r.length > 0);

            // Get detailed analysis for this category
            const detailedAnalysis = detailedAnalysisMap.get(category) || {
              clinicalContext: `Your ${category.toLowerCase()} assessment reveals important factors for recovery prediction.`,
              strengths: ['Baseline assessment completed', 'Areas identified for optimization'],
              riskFactors: ['Consult healthcare provider for personalized guidance'],
              timeline: 'Discuss optimization timeline with your medical team.'
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
      console.log("Creating fallback structure for Recovery Speed");

      const fallbackCategories = [
        {
          name: 'Nutritional Foundation',
          desc: 'Your nutrition habits provide a foundation for healing and tissue repair.',
          context: 'Nutrition plays a crucial role in surgical recovery, with optimal nutrition supporting 30-40% faster healing.',
          strengths: [
            'Adequate protein intake for tissue repair',
            'Good hydration habits',
            'Balanced micronutrient profile'
          ],
          risks: [
            'Could benefit from increased vitamin C',
            'Zinc levels may need optimization'
          ]
        },
        {
          name: 'Mental Readiness',
          desc: 'Your mental preparation will support your recovery experience.',
          context: 'Psychological preparation significantly impacts recovery, with mentally prepared patients experiencing 25% shorter recovery times.',
          strengths: [
            'Positive outlook towards surgery',
            'Good stress management techniques',
            'Realistic recovery expectations'
          ],
          risks: [
            'Mild anxiety about surgical outcome',
            'Limited meditation or relaxation practice'
          ]
        },
        {
          name: 'Support System Strength',
          desc: 'Your support network will influence your recovery timeline.',
          context: 'Strong support systems accelerate recovery, with patients showing 20-30% faster healing with robust networks.',
          strengths: [
            'Strong family support network',
            'Adequate help for daily activities',
            'Good communication with healthcare team'
          ],
          risks: [
            'Limited backup support options'
          ]
        },
        {
          name: 'Home Environment Readiness',
          desc: 'Your home preparation is progressing for recovery.',
          context: 'Home environment significantly impacts recovery safety and comfort during the healing period.',
          strengths: [
            'Safe recovery space identified',
            'Basic accessibility considerations made',
            'Planning for equipment needs'
          ],
          risks: [
            'Additional safety modifications needed',
            'Meal preparation could be optimized'
          ]
        },
        {
          name: 'Sleep Quality Impact',
          desc: 'Your sleep quality will support healing processes.',
          context: 'Quality sleep is essential for healing, with poor sleep extending recovery time by 40-50%.',
          strengths: [
            'Regular sleep schedule',
            'Good sleep hygiene awareness',
            'Adequate sleep duration'
          ],
          risks: [
            'Occasional sleep interruptions',
            'Pre-surgical anxiety affecting sleep'
          ]
        },
        {
          name: 'Physical Baseline',
          desc: 'Your current fitness level provides a recovery foundation.',
          context: 'Physical fitness before surgery strongly predicts recovery speed according to ERAS protocols.',
          strengths: [
            'Good cardiovascular fitness',
            'Adequate muscle strength',
            'Good mobility baseline'
          ],
          risks: [
            'Could improve core stability',
            'Flexibility needs enhancement'
          ]
        }
      ];

      fallbackCategories.forEach(cat => {
        results.push({
          category: cat.name,
          score: Math.floor(Math.random() * 20) + 70,
          maxScore: 100,
          level: 'moderate',
          description: cat.desc,
          recommendations: [
            'Consult with your healthcare provider for personalized guidance',
            'Follow evidence-based recovery optimization protocols',
            'Monitor and adjust based on your surgical team\'s recommendations'
          ],
          detailedAnalysis: {
            clinicalContext: cat.context,
            strengths: cat.strengths,
            riskFactors: cat.risks,
            timeline: 'Begin optimization 4-6 weeks before scheduled surgery for best results.'
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
    console.error("Error parsing Recovery Speed AI response:", error);

    return {
      overallScore: 75,
      overallRating: "Good Recovery",
      results: [{
        category: "Overall Assessment",
        score: 75,
        maxScore: 100,
        level: "moderate",
        description: "Your recovery speed assessment has been completed. Please consult with your healthcare provider for personalized recovery planning.",
        recommendations: [
          "Discuss your recovery timeline with your surgical team",
          "Follow all pre and post-operative instructions carefully",
          "Optimize modifiable factors to accelerate healing"
        ],
        detailedAnalysis: {
          clinicalContext: aiAnalysis,
          strengths: ['Assessment completed', 'Consultation recommended'],
          riskFactors: ['Requires medical consultation for personalized plan'],
          timeline: 'Consult with healthcare team to develop recovery optimization strategy.'
        }
      }],
      summary: aiAnalysis,
      assessmentType
    };
  }
}

function complicationParseAIResponse(aiAnalysis, assessmentType){
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



// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'admin@luther.health',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Full Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p style="margin: 10px 0;"><strong>Service Interest:</strong> ${service || 'Not specified'}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Message:</h3>
            <p style="background-color: #ffffff; padding: 15px; border-left: 4px solid #4F46E5; border-radius: 4px;">
              ${message}
            </p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
            <p>This email was sent from the Luther Health contact form.</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Full Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Service Interest: ${service || 'Not specified'}

Message:
${message}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});




app.post("/api/send-email-report", async (req, res) => {
  try {
    const { userEmail, userName, assessmentType, report, reportId, pageUrl } = req.body;

    if (!userEmail || !userName || !assessmentType || !report || !pageUrl) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    console.log(`📸 Capturing screenshots for ${userName}...`);
    console.log(`Assessment Type: ${assessmentType}`);

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: '/home/ubuntu/.cache/puppeteer/chrome/linux-141.0.7390.76/chrome-linux64/chrome',
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"]
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // ✅ FIX: Use the assessmentType from the request instead of hardcoding
    await page.evaluateOnNewDocument((reportData, userInfoData, assessType) => {
      sessionStorage.setItem('assessmentReport', JSON.stringify(reportData));
      sessionStorage.setItem('assessmentType', assessType); // ✅ Dynamic now
      sessionStorage.setItem('userInfo', JSON.stringify(userInfoData));
      sessionStorage.setItem('currentUser', JSON.stringify(userInfoData));
    }, report, {
      email: userEmail,
      first_name: userName.split(' ')[0],
      last_name: userName.split(' ').slice(1).join(' ')
    }, assessmentType); // ✅ Pass assessmentType as third parameter

    // Navigate to page
    await page.goto(pageUrl, { waitUntil: 'domcontentloaded', timeout: 0 });

    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 3000));

    const screenshots = [];
    let tabs;
    if (assessmentType === 'Surgery Readiness') {
      tabs = ['Overview', 'Detailed Results', 'Recommendations'];
    } else if (assessmentType === 'Anaesthesia Risk') {
      tabs = ['Overview', 'Detailed Results', 'Safety Measures'];
    } else if (assessmentType === 'Complication Risk') {
      tabs = ['Overview', 'Detailed Results', 'Recommendations'];
    } else if (assessmentType === 'Recovery Speed') {
      tabs = ['Overview', 'Detailed Results', 'Speed Boosters'];
    } else if (assessmentType === 'Mobility Strength') {
      tabs = ['Overview', 'Detailed Results', 'Training Plan'];
    } else if (assessmentType === 'Symptom Severity') {
      tabs = ['Overview', 'Detailed Results', 'Management Plan'];
    } else if (assessmentType === 'Inflammation Risk') {
      tabs = ['Overview', 'Detailed Results', 'Anti-Inflammation Plan'];
    } else if (assessmentType === 'Medication Burden') {
      tabs = ['Overview', 'Detailed Results', 'Optimization Plan'];
    } else if (assessmentType === 'Daily Energy') {
      tabs = ['Overview', 'Detailed Results', 'Energy Optimization'];
    } else if (assessmentType === 'Lifestyle Limiter') {
      tabs = ['Overview', 'Detailed Results', 'Adaptation Strategies'];
    } else if (assessmentType === 'Biological Age') {
      tabs = ['Overview', 'Detailed Results', 'Longevity Plan'];
    } else if (assessmentType === 'Health Concierge') {
      tabs = ['Overview', 'Detailed Analysis', 'Your Roadmap'];
    } else if (assessmentType === 'Cardiometabolic Risk') {
      tabs = ['Overview', 'Detailed Results', 'Prevention Plan'];
    } else if (assessmentType === 'Resilience Index') {
      tabs = ['Overview', 'Detailed Results', 'Resilience Plan'];
    } else if (assessmentType === 'Nutrition Composition') {
      tabs = ['Overview', 'Detailed Results', 'Nutrition Plan'];
    } else if (assessmentType === 'Functional Fitness') {
      tabs = ['Overview', 'Detailed Results', 'Fitness Plan'];
    } else if (assessmentType === 'Surgery Preparation Bundle') {
      tabs = ['Overview', 'Detailed Results', 'Preparation Plan'];
    } else if (assessmentType === 'Chronic Symptoms Bundle') {
      tabs = ['Overview', 'Detailed Results', 'Management Plan'];
    } else if (assessmentType === 'Longevity Wellness Bundle') {
      tabs = ['Overview', 'Detailed Results', 'Optimization Plan'];
    } else {
      // Default tabs for other assessments
      tabs = ['Overview', 'Detailed Results', 'Recommendations'];
    }

    console.log(`📋 Tab names for ${assessmentType}:`, tabs);

    // Capture each tab
    for (let i = 0; i < tabs.length; i++) {
      const tabName = tabs[i];
      console.log(`📸 Capturing ${tabName} tab...`);

      try {
        // Click the tab button
        await page.evaluate((index, tabList) => {
          const buttons = Array.from(document.querySelectorAll('button'));
          const tabButtons = buttons.filter(btn =>
            tabList.some(tab => btn.textContent.trim() === tab)
          );
          if (tabButtons[index]) {
            tabButtons[index].click();
          }
        }, i, tabs);

        // Wait for tab content to load
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Scroll to top
        await page.evaluate(() => window.scrollTo(0, 0));
        await new Promise(resolve => setTimeout(resolve, 500));

        // Take screenshot
        const screenshot = await page.screenshot({ fullPage: true });
        screenshots.push({ name: tabName, buffer: screenshot });

        console.log(`✅ ${tabName} captured (${screenshot.length} bytes)`);
      } catch (error) {
        console.error(`❌ Error capturing ${tabName}:`, error.message);
      }
    }

    await page.close();
    await browser.close();

    if (screenshots.length === 0) {
      throw new Error('Failed to capture any screenshots');
    }

    console.log(`✅ All ${screenshots.length} tabs captured`);

    // Convert screenshots to PDF
    const doc = new PDFDocument({ autoFirstPage: false });
    const chunks = [];

    doc.on("data", chunk => chunks.push(chunk));
    doc.on("error", (err) => {
      console.error('PDF Error:', err);
      throw err;
    });

    // Add each screenshot as a separate page
    screenshots.forEach((screenshot, index) => {
      const img = doc.openImage(screenshot.buffer);
      doc.addPage({ size: [img.width, img.height] });
      doc.image(img, 0, 0);
    });

    doc.end();

    // Wait until PDF is complete
    const pdfBuffer = await new Promise((resolve, reject) => {
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);
    });

    console.log('✅ PDF created with all tabs');

    // Send Email with PDF
    const mailOptions = {
      from: `"Luther Health" <${process.env.GMAIL_USER}>`,
      to: userEmail,
      subject: `Your ${assessmentType} Assessment Results - Luther Health`,
      html: generateEmailBodyWithAttachment(userName, assessmentType),
      attachments: [
        {
          filename: `Luther-Health-${assessmentType.replace(/\s+/g, "-")}-Report.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    console.log('📧 Email sent:', userEmail);

    res.json({
      success: true,
      message: "Email sent successfully",
      tabsCaptured: screenshots.length
    });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Email template (keep as is)
function generateEmailBodyWithAttachment(userName, assessmentType) {
  const date = new Date().toLocaleDateString("en-GB");
  return `
    <div style="font-family: Arial, sans-serif; color:#333; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 28px;">Luther Health</h1>
        <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Your Health Assessment Results</p>
      </div>

      <div style="padding: 30px; background: white;">
        <p style="font-size: 16px; line-height: 1.6;">Dear <strong>${userName}</strong>,</p>

        <p style="font-size: 14px; line-height: 1.6; color: #555;">
          Thank you for completing your <strong>${assessmentType}</strong> assessment with Luther Health.
        </p>

        <div style="background: #f8f9fa; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #333;">
            📄 Your comprehensive assessment report is attached as a PDF document, including:
          </p>
          <ul style="margin: 10px 0 0 0; padding-left: 20px; font-size: 13px; color: #555;">
            <li>Complete overview of all assessment categories</li>
            <li>Detailed analysis with benchmarks</li>
            <li>Personalized safety recommendations</li>
            <li>Evidence-based action plan</li>
          </ul>
        </div>

        <p style="font-size: 13px; line-height: 1.6; color: #666; border-top: 1px solid #eee; padding-top: 15px; margin-top: 20px;">
          <strong>Important:</strong> This assessment is for informational purposes.
          Please share these results with your healthcare provider for personalized medical guidance.
        </p>

        <p style="font-size: 12px; color: #999; margin-top: 20px;">
          <em>Assessment Date: ${date}</em>
        </p>
      </div>

      <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
        <p style="margin: 0; font-size: 12px; color: #666;">
          Best regards,<br>
          <strong style="color: #667eea;">The Luther Health Team</strong>
        </p>
      </div>
    </div>
  `;
}

// ----------------------------
const server = app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);

// Set timeouts to prevent 504 errors
server.timeout = 300000; // 5 minutes
server.keepAliveTimeout = 300000;
server.headersTimeout = 300000;