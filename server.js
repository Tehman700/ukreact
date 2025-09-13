import express from "express";
import Stripe from "stripe";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { products } = req.body;

    const line_items = products.map((item: any) => ({
      price_data: {
        currency: "gbp",
        product_data: { name: item.item_name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://18.134.97.224/#success",
      cancel_url: "http://18.134.97.224/#cancel",
    });

    res.json({ id: session.id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(8000, () => console.log("Server running on port 8000"));
