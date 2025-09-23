import React, { useState, useEffect } from 'react';

interface PaymentGateProps {
  children: React.ReactNode;
  requiredProduct?: string;
}

export function PaymentGate({ children, requiredProduct }: PaymentGateProps) {
  const [isVerifying, setIsVerifying] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    verifyPaymentAccess();
  }, []);

  const verifyPaymentAccess = async () => {
    try {
      // Check for session ID in URL params
      const urlParams = new URLSearchParams(window.location.search);
      let sessionId = urlParams.get('session_id');

      // If not in URL, check localStorage
      if (!sessionId) {
        sessionId = localStorage.getItem('stripe_session_id');
      } else {
        // Store session ID in localStorage for future visits
        localStorage.setItem('stripe_session_id', sessionId);
      }

      if (!sessionId) {
        setError('No payment session found');
        setIsVerifying(false);
        return;
      }

      // Verify payment with backend
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          productName: requiredProduct
        }),
      });

      const data = await response.json();

      if (data.success && data.verified) {
        setHasAccess(true);
        console.log('Payment verified:', data.payment);
      } else {
        setError('Payment not found or incomplete');
      }

    } catch (err) {
      console.error('Payment verification error:', err);
      setError('Unable to verify payment');
    } finally {
      setIsVerifying(false);
    }
  };

  // Loading state
  if (isVerifying) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        flexDirection: 'column'
      }}>
        <div>Verifying payment...</div>
      </div>
    );
  }

  // Payment required state
  if (!hasAccess) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        flexDirection: 'column',
        textAlign: 'center'
      }}>
        <h2>Payment Required</h2>
        <p>You need to complete payment to access this assessment.</p>
        <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>
        <button
          onClick={() => window.location.href = '#payment'}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007cba',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Complete Payment
        </button>
      </div>
    );
  }

  // Payment verified - show content
  return (
    <>
      <div style={{
        backgroundColor: '#d4edda',
        color: '#155724',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        fontSize: '14px'
      }}>
        ✅ Payment verified - Access granted
      </div>
      {children}
    </>
  );
}