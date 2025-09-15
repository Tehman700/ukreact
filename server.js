//import 'dotenv/config';
//import express from "express";
//import Stripe from "stripe";
//import cors from "cors";
//
//const app = express();
//app.use(cors());
//app.use(express.json());
//
//const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//  apiVersion: "2022-11-15",
//});
//console.log("Stripe Secret Key in use:", process.env.STRIPE_SECRET_KEY.slice(0, 10));
//
//app.post("/api/create-checkout-session", async (req, res) => {
//  try {
//    console.log("Incoming body:", req.body);
//
//    const { products } = req.body;
//    if (!products || !Array.isArray(products) || products.length === 0) {
//      return res.status(400).json({ error: "No products provided" });
//    }
//
//    const line_items = products.map((item) => ({
//      price_data: {
//        currency: "gbp",
//        product_data: { name: item.item_name },
//        unit_amount: Math.round(item.price * 100), // Ensure integer
//      },
//      quantity: item.quantity || 1,
//    }));
//
//    const session = await stripe.checkout.sessions.create({
//      payment_method_types: ["card"],
//      line_items,
//      mode: "payment",
//      success_url: "https://luther.health/Health-Audit.html#success",
//      cancel_url: "https://luther.health/Health-Audit.html#cancel",
//    });
//
//    res.json({ id: session.id });
//  } catch (err) {
//    console.error("Stripe session creation failed:", err);
//    res.status(500).json({ error: err.message });
//  }
//});
//
//
//app.listen(8000, () => console.log("Server running on port 8000"));




//import 'dotenv/config';
//import express from "express";
//import Stripe from "stripe";
//import cors from "cors";
//
//const app = express();
//app.use(cors());
//app.use(express.json());
//
//const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//  apiVersion: "2022-11-15",
//});
//console.log("Stripe Secret Key in use:", process.env.STRIPE_SECRET_KEY.slice(0, 10));
//
//app.post("/api/create-checkout-session", async (req, res) => {
//  try {
//    console.log("Incoming body:", req.body);
//
//    const { products } = req.body;
//    if (!products || !Array.isArray(products) || products.length === 0) {
//      return res.status(400).json({ error: "No products provided" });
//    }
//
//    const line_items = products.map((item) => ({
//      price_data: {
//        currency: "gbp",
//        product_data: { name: item.item_name },
//        unit_amount: Math.round(item.price * 100), // Ensure integer
//      },
//      quantity: item.quantity || 1,
//    }));
//
//    const session = await stripe.checkout.sessions.create({
//      payment_method_types: ["card"],
//      line_items,
//      mode: "payment",
//      success_url: "https://luther.health/Health-Audit.html#success",
//      cancel_url: "https://luther.health/Health-Audit.html#cancel",
//    });
//
//    res.json({ id: session.id });
//  } catch (err) {
//    console.error("Stripe session creation failed:", err);
//
//    let message = "An unknown error occurred with Stripe.";
//    switch (err.type) {
//      case "StripeCardError":
//        message = err.message; // e.g. "Your card's expiration year is invalid."
//        break;
//      case "StripeRateLimitError":
//        message = "Too many requests made to Stripe API too quickly.";
//        break;
//      case "StripeInvalidRequestError":
//        message = "Invalid parameters were supplied to Stripe's API.";
//        break;
//      case "StripeAPIError":
//        message = "An internal error occurred with Stripe's API.";
//        break;
//      case "StripeConnectionError":
//        message = "A network error occurred while communicating with Stripe.";
//        break;
//      case "StripeAuthenticationError":
//        message = "Invalid Stripe API key was used.";
//        break;
//      default:
//        message = err.message || "Unexpected Stripe error.";
//        break;
//    }
//
//    res.status(500).json({ error: message });
//  }
//});
//
//app.listen(8000, () => console.log("Server running on port 8000"));









// After the SQL Database change
import 'dotenv/config';
import express from "express";
import Stripe from "stripe";
import cors from "cors";
import fetch from "node-fetch";  // needed for Meta API call
import pkg from "pg";

const { Pool } = pkg;
const app = express();
app.use(cors());
app.use(express.json());

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
      customer_email: email,  // ✅ capture user email
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
// 4. Stripe Webhook → Send Meta Conversion API
// ----------------------------
app.post("/api/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  let event;

  try {
    event = JSON.parse(req.body);
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("✅ Payment success:", session);

    // ----------------------------
    // Send Conversion API Event to Meta
    // ----------------------------
    const payload = {
      data: [
        {
          event_name: "Purchase",
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_source_url: "https://luther.health/Health-Audit.html#success",
          user_data: {
            em: [session.customer_email], // hash automatically handled by Meta if raw
          },
          custom_data: {
            currency: session.currency.toUpperCase(),
            value: session.amount_total / 100,
          },
        },
      ],
    };

    try {
      const fbRes = await fetch(
        `https://graph.facebook.com/v17.0/${process.env.META_PIXEL_ID}/events?access_token=${process.env.META_ACCESS_TOKEN}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const fbData = await fbRes.json();
      console.log("📡 Meta Conversion API response:", fbData);
    } catch (err) {
      console.error("Meta API error:", err);
    }
  }

  res.json({ received: true });
});

// ----------------------------
app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);














