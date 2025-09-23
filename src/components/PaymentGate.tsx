import React, { useEffect, useState } from "react";

interface PaymentGateProps {
  children: React.ReactNode;
  redirectUrl?: string; // where to send unpaid users
}

export function PaymentGate({ children, redirectUrl = "/payment-required" }: PaymentGateProps) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sessionId = sessionStorage.getItem("stripe_session_id");

    if (!sessionId) {
      setAllowed(false);
      setLoading(false);
      return;
    }

    fetch(`https://luther.health/api/check-payment?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.paid) {
          setAllowed(true);
        } else {
          window.location.href = redirectUrl;
        }
      })
      .catch((err) => {
        console.error("Payment check failed:", err);
        setAllowed(false);
      })
      .finally(() => setLoading(false));
  }, [redirectUrl]);

  if (loading) return <p>Loading...</p>;
  if (!allowed) return <p>Redirecting to payment...</p>;

  return <>{children}</>;
}
