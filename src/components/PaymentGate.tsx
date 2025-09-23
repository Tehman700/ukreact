import React, { useEffect, useState } from "react";

type PaymentGateProps = {
  children: React.ReactNode;
  productName: string; // so you can reuse PaymentGate for other products
};

export const PaymentGate: React.FC<PaymentGateProps> = ({ children, productName }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session_id");

  if (sessionId) {
    fetch("/api/verify-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        productName, // e.g. "Complication Risk Checker"
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.verified) {
          setVerified(true);
        }
      });
  }
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
