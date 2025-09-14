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




import 'dotenv/config';
import express from "express";
import Stripe from "stripe";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});
console.log("Stripe Secret Key in use:", process.env.STRIPE_SECRET_KEY.slice(0, 10));

app.post("/api/create-checkout-session", async (req, res) => {
  try {
    console.log("Incoming body:", req.body);

    const { products } = req.body;
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "No products provided" });
    }

    const line_items = products.map((item) => ({
      price_data: {
        currency: "gbp",
        product_data: { name: item.item_name },
        unit_amount: Math.round(item.price * 100), // Ensure integer
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "https://luther.health/Health-Audit.html#success",
      cancel_url: "https://luther.health/Health-Audit.html#cancel",
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe session creation failed:", err);

    let message = "An unknown error occurred with Stripe.";
    switch (err.type) {
      case "StripeCardError":
        message = err.message; // e.g. "Your card's expiration year is invalid."
        break;
      case "StripeRateLimitError":
        message = "Too many requests made to Stripe API too quickly.";
        break;
      case "StripeInvalidRequestError":
        message = "Invalid parameters were supplied to Stripe's API.";
        break;
      case "StripeAPIError":
        message = "An internal error occurred with Stripe's API.";
        break;
      case "StripeConnectionError":
        message = "A network error occurred while communicating with Stripe.";
        break;
      case "StripeAuthenticationError":
        message = "Invalid Stripe API key was used.";
        break;
      default:
        message = err.message || "Unexpected Stripe error.";
        break;
    }

    res.status(500).json({ error: message });
  }
});

app.listen(8000, () => console.log("Server running on port 8000"));
