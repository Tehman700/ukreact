import React from "react";

export function PaymentGate({ productName }: { productName: string }) {
  const handlePayment = async () => {
    try {
      const response = await fetch("/api/create-payment-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: [
            {
              item_name: productName,
              price: 29.99, // your quiz price
              quantity: 1,
            },
          ],
          email: "", // optionally pass logged-in user email
        }),
      });

      const data = await response.json();
      if (data.url) {
        // Save sessionId so quiz page can check later
        sessionStorage.setItem("stripe_session_id", data.sessionId);
        window.location.href = data.url;
      } else {
        alert("Payment session creation failed.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Error creating payment session.");
    }
  };

  return (
    <button
      onClick={handlePayment}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        background: "#635bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
      }}
    >
      Pay Now to Unlock
    </button>
  );
}
