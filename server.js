import 'dotenv/config';
import express from "express";
import Stripe from "stripe";
import cors from "cors";
import pkg from "pg";
// Import Facebook Business SDK
import bizSdk from "facebook-nodejs-business-sdk";

const { Pool } = pkg;
const app = express();
app.use(cors());

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
    const { products, email } = req.body;
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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer_email: email,
      success_url: "https://luther.health/Health-Audit.html#success",
      cancel_url: "https://luther.health/Health-Audit.html#cancel",
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe session creation failed:", err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------
// 4. Enhanced Stripe Webhook → Store Data + Send Meta Conversion API
// ----------------------------
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
      // Create stripe_payments table if it doesn't exist
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
          created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Get line items from Stripe session
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      const productName = lineItems.data.map(item => item.description).join(', ');

      // Store payment in database
      const paymentResult = await pool.query(`
        INSERT INTO stripe_payments (
          stripe_session_id,
          customer_email,
          amount_total,
          currency,
          status,
          product_name,
          line_items
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (stripe_session_id) DO UPDATE SET
          status = EXCLUDED.status,
          updated = CURRENT_TIMESTAMP
        RETURNING *
      `, [
        session.id,
        session.customer_email,
        session.amount_total,
        session.currency,
        session.payment_status,
        productName,
        JSON.stringify(lineItems.data)
      ]);

      console.log("💾 Payment stored in database:", paymentResult.rows[0]);

      // ----------------------------
      // Send Conversion API Event to Meta using Business SDK
      // ----------------------------
      const currentTimestamp = Math.floor(Date.now() / 1000);

      console.log("🎯 Preparing to send Meta Conversion API event...");
      console.log("📧 Customer email:", session.customer_email);
      console.log("💰 Purchase amount:", session.amount_total / 100);
      console.log("💱 Currency:", session.currency.toUpperCase());

      // Create user data
      const userData = (new UserData())
        .setEmails([session.customer_email]);

      // Create custom data with purchase information
      const customData = (new CustomData())
        .setValue(session.amount_total / 100)
        .setCurrency(session.currency.toUpperCase());

      // Create server event
      const serverEvent = (new ServerEvent())
        .setEventName("Purchase")
        .setEventTime(currentTimestamp)
        .setUserData(userData)
        .setCustomData(customData)
        .setActionSource("website")
        .setEventSourceUrl("https://luther.health/Health-Audit.html#success");

      // Create event request
      const eventRequest = (new EventRequest(process.env.META_ACCESS_TOKEN, process.env.META_PIXEL_ID))
        .setEvents([serverEvent]);

      // Execute the request
      const response = await eventRequest.execute();
      console.log("✅ Meta Conversion API SUCCESS!");
      console.log("📡 Full response:", JSON.stringify(response, null, 2));

      // Check if there are any errors in the response
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

// server.js
app.get("/api/verify-payment/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;

    const result = await pool.query(
      `SELECT * FROM stripe_payments WHERE stripe_session_id = $1 LIMIT 1`,
      [sessionId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ paid: false, message: "No payment found" });
    }

    const payment = result.rows[0];

    // Stripe marks it as "paid"
    if (payment.status === "paid" || payment.status === "complete" || payment.status === "complete_payment_intent") {
      return res.json({ paid: true, email: payment.customer_email });
    }

    res.json({ paid: false, message: "Payment not completed" });
  } catch (err) {
    console.error("Payment verify error:", err);
    res.status(500).json({ paid: false, error: "Server error" });
  }
});

// ----------------------------
app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);