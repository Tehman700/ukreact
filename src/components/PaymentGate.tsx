import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Lock, CreditCard, CheckCircle, AlertTriangle } from 'lucide-react';

interface PaymentGateProps {
  children: React.ReactNode;
  assessmentType: string;
  requiredProduct: string;
  fallbackRoute?: string;
}

interface PaymentStatus {
  hasPaid: boolean;
  loading: boolean;
  error: string | null;
}

export function PaymentGate({
  children,
  assessmentType,
  requiredProduct,
  fallbackRoute = 'complication-risk-checker-upsell'
}: PaymentGateProps) {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({
    hasPaid: false,
    loading: true,
    error: null
  });

  useEffect(() => {
    checkPaymentStatus();
  }, []);

  const checkPaymentStatus = async () => {
    try {
      setPaymentStatus(prev => ({ ...prev, loading: true, error: null }));

      // Get current user
      const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
      if (!user.email) {
        throw new Error('Please complete user information first');
      }

      // First check if we have a payment session for THIS USER
      const paymentSession = sessionStorage.getItem('paymentCompleted');
      const paymentProduct = sessionStorage.getItem('paymentProduct');
      const paymentUser = sessionStorage.getItem('paymentUser');

      console.log('Checking local payment session:', {
        session: paymentSession,
        product: paymentProduct,
        user: paymentUser,
        currentUser: user.email
      });

      // Verify the session belongs to current user
      if (paymentSession === 'true' &&
          paymentProduct && paymentProduct.includes(requiredProduct) &&
          paymentUser === user.email) {
        console.log('Payment verified from local session for user:', user.email);
        setPaymentStatus({
          hasPaid: true,
          loading: false,
          error: null
        });
        return;
      }

      // Check URL for success parameter (from Stripe redirect)
      const urlParams = new URLSearchParams(window.location.search);
      const urlHash = window.location.hash;

      if (urlHash.includes('success') || urlParams.get('payment') === 'success') {
        console.log('Payment success detected from URL for user:', user.email);
        // Store payment completion for THIS USER
        sessionStorage.setItem('paymentCompleted', 'true');
        sessionStorage.setItem('paymentProduct', requiredProduct);
        sessionStorage.setItem('paymentUser', user.email);

        setPaymentStatus({
          hasPaid: true,
          loading: false,
          error: null
        });
        return;
      }

      // Fallback: Check database for THIS USER's payment
      const apiUrl = window.location.hostname === 'localhost'
        ? 'http://localhost:5000/api/check-user-payment'
        : 'https://luther.health/api/check-user-payment';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: user.email,
          requiredProduct: requiredProduct
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('Database payment check for user:', user.email, data);

      if (data.hasPaid) {
        // Store successful verification for THIS USER
        sessionStorage.setItem('paymentCompleted', 'true');
        sessionStorage.setItem('paymentProduct', requiredProduct);
        sessionStorage.setItem('paymentUser', user.email);
      }

      setPaymentStatus({
        hasPaid: data.hasPaid,
        loading: false,
        error: null
      });

      // If not paid, redirect to payment page
      if (!data.hasPaid) {
        console.log(`No payment found for user ${user.email}, redirecting to:`, fallbackRoute);
        setTimeout(() => {
          window.location.hash = fallbackRoute;
        }, 2000);
      }

    } catch (error) {
      console.error('Payment verification error:', error);
      setPaymentStatus({
        hasPaid: false,
        loading: false,
        error: error instanceof Error ? error.message : 'Payment verification failed'
      });

      // Redirect to payment on error
      setTimeout(() => {
        window.location.hash = fallbackRoute;
      }, 3000);
    }
  };

  const handleGoToPayment = () => {
    window.location.hash = fallbackRoute;
  };

  if (paymentStatus.loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-medium mb-2">Verifying Access</h3>
            <p className="text-muted-foreground">Please wait while we verify your payment...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (paymentStatus.error || !paymentStatus.hasPaid) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-orange-600" />
            </div>
            <CardTitle className="text-xl">Payment Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            {paymentStatus.error ? (
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                  <span className="font-medium text-red-800">Access Error</span>
                </div>
                <p className="text-red-700 text-sm">{paymentStatus.error}</p>
              </div>
            ) : (
              <p className="text-muted-foreground">
                To access the {assessmentType}, you need to complete your purchase first.
              </p>
            )}

            <Button onClick={handleGoToPayment} className="w-full" size="lg">
              <CreditCard className="w-4 h-4 mr-2" />
              Complete Purchase
            </Button>

            <p className="text-xs text-muted-foreground">
              Redirecting automatically in a few seconds...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Payment verified - show the protected content
  return (
    <div>
      {/* Optional: Show payment verified indicator */}
      <div className="bg-green-50 border-l-4 border-green-400 p-3 mb-4">
        <div className="flex items-center">
          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
          <span className="text-green-800 text-sm font-medium">
            Access verified - Welcome to {assessmentType}
          </span>
        </div>
      </div>

      {children}
    </div>
  );
}