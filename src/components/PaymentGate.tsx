import React, { useEffect, useState } from "react";

type PaymentGateProps = {
  children: React.ReactNode;
  productName: string; // so you can reuse PaymentGate for other products
};

export const PaymentGate: React.FC<PaymentGateProps> = ({ children, productName }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Grab session_id from URL
    const url = new URL(window.location.href);
    const sessionId = url.searchParams.get("session_id");

    if (!sessionId) {
      setLoading(false);
      return;
    }

    // Call backend to verify payment
    fetch("https://luther.health/api/verify-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, productName })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.verified) {
          setUnlocked(true);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Payment verification failed:", err);
        setLoading(false);
      });
  }, [productName]);

  if (loading) {
    return <p>Checking payment...</p>;
  }

  if (!unlocked) {
    return (
      <div className="locked-message">
        <h2>🔒 Locked</h2>
        <p>Please complete your payment to access this content.</p>
      </div>
    );
  }

  // If verified, render the gated content
  return <>{children}</>;
};
