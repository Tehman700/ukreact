import React, { useEffect, useState } from "react";

interface PaymentGateProps {
  children: React.ReactNode;
  requiredFunnel: string; // Which funnel this gate protects
  redirectUrl?: string;
}

export function PaymentGate({
  children,
  requiredFunnel,
  redirectUrl = "/payment-required"
}: PaymentGateProps) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Check for screenshot bypass token
    const urlParams = new URLSearchParams(window.location.search);
    let hashParams = new URLSearchParams();
    if (window.location.hash.includes('?')) {
      hashParams = new URLSearchParams(window.location.hash.split('?')[1]);
    }

    const screenshotToken = urlParams.get('screenshot_token') || hashParams.get('screenshot_token');

    // Use a secure token - change this to something secret
    if (screenshotToken === 'YOUR_SECRET_TOKEN_HERE_12345') {
      setAllowed(true);
      setLoading(false);
      console.log('✅ Screenshot bypass token validated');
      return;
    }

    // Rest of your existing code...
    let urlSessionId = urlParams.get('session_id');

    if (!urlSessionId && window.location.hash.includes('?')) {
      urlSessionId = hashParams.get('session_id');
    }

    if (urlSessionId) {
      sessionStorage.setItem("stripe_session_id", urlSessionId);
      console.log(`✅ Stored session ID from URL: ${urlSessionId}`);

      const hashBase = window.location.hash.split('?')[0];
      window.history.replaceState({}, document.title, window.location.pathname + hashBase);
    }

    const sessionId = sessionStorage.getItem("stripe_session_id");

    if (!sessionId) {
      setAllowed(false);
      setErrorMessage(`Payment required to access ${requiredFunnel} assessment`);
      setLoading(false);
      return;
    }

    fetch(`https://luther.health/api/check-payment?session_id=${sessionId}&funnel_type=${requiredFunnel}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.paid) {
          setAllowed(true);
          console.log(`✅ Access granted to ${requiredFunnel} funnel`);
        } else {
          setAllowed(false);
          setErrorMessage(`This payment doesn't include access to ${requiredFunnel}. Please purchase the correct assessment.`);
        }
      })
      .catch((err) => {
        console.error("Payment check failed:", err);
        setAllowed(false);
        setErrorMessage("Unable to verify payment. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [requiredFunnel, redirectUrl]);

  // Rest of component remains the same...
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="ml-3">Verifying access...</p>
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-red-50 border border-red-200 rounded-lg text-center">
        <div className="text-red-600 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-red-800 mb-2">Access Denied</h3>
        <p className="text-red-700 mb-4">{errorMessage}</p>
        <button
          onClick={() => window.location.href = redirectUrl}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Purchase Access
        </button>
      </div>
    );
  }

  return <>{children}</>;
}