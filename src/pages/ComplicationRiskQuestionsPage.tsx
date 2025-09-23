import React, { useState, useEffect } from 'react';
import { QuizTemplate, QuizConfig } from '../components/QuizTemplate';

// Payment verification component
const PaymentGate: React.FC<{ onPaymentVerified: () => void }> = ({ onPaymentVerified }) => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'checking' | 'verified' | 'required' | 'error'>('checking');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    verifyPaymentStatus();
  }, []);

  const verifyPaymentStatus = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');

      if (!user.email) {
        setPaymentStatus('required');
        setIsVerifying(false);
        return;
      }

      setUserEmail(user.email);

      // Check if user has made a payment
      const response = await fetch(`https://luther.health/api/verify-payment?email=${encodeURIComponent(user.email)}`);
      const data = await response.json();

      if (data.success && data.hasPaid) {
        setPaymentStatus('verified');
        onPaymentVerified();
      } else {
        setPaymentStatus('required');
      }
    } catch (error) {
      console.error('Error verifying payment status:', error);
      setPaymentStatus('error');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleProceedToPayment = () => {
    // Redirect to payment page
    window.location.hash = 'payment';
  };

  const handleBackToAssessments = () => {
    // Redirect back to assessments list
    window.location.hash = 'assessments';
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Verifying Access</h2>
            <p className="text-gray-600">Please wait while we check your payment status...</p>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Verification Error</h2>
            <p className="text-gray-600 mb-6">We encountered an error while verifying your payment status. Please try again.</p>
            <div className="space-y-3">
              <button
                onClick={verifyPaymentStatus}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={handleBackToAssessments}
                className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors"
              >
                Back to Assessments
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'required') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full mx-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Premium Assessment</h2>
            <p className="text-gray-600 mb-6">
              The Complication Risk Checker is a premium assessment that requires payment to access.
              This comprehensive tool provides detailed analysis of your surgical risk factors.
            </p>

            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">What you'll get:</h3>
              <ul className="text-left text-gray-700 space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Comprehensive risk assessment
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Personalized recommendations
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Detailed risk factor analysis
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Professional-grade insights
                </li>
              </ul>
            </div>

            {userEmail && (
              <p className="text-sm text-gray-500 mb-6">
                Account: {userEmail}
              </p>
            )}

            <div className="space-y-3">
              <button
                onClick={handleProceedToPayment}
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                Proceed to Payment
              </button>
              <button
                onClick={handleBackToAssessments}
                className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors"
              >
                Back to Assessments
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null; // Payment verified, component will be unmounted
};

const complicationRiskQuiz: QuizConfig = {
  title: 'Complication Risk Checker',
  questions: [
    {
      id: 'medical-conditions',
      question: 'Do you have any of the following medical conditions?',
      subtitle: 'Select all that apply - this helps us assess your surgical risk profile',
      multiSelect: true,
      options: [
        { id: 'diabetes', label: 'Diabetes (Type 1 or 2)' },
        { id: 'heart-disease', label: 'Heart Disease or Cardiovascular Issues' },
        { id: 'high-blood-pressure', label: 'High Blood Pressure' },
        { id: 'kidney-disease', label: 'Kidney Disease' },
        { id: 'liver-disease', label: 'Liver Disease' },
        { id: 'lung-disease', label: 'Lung Disease (COPD, Asthma)' },
        { id: 'autoimmune', label: 'Autoimmune Disorders' },
        { id: 'blood-clots', label: 'History of Blood Clots' },
        { id: 'none', label: 'None of the above' },
      ],
    },
    {
      id: 'lifestyle-factors',
      question: 'Which lifestyle factors apply to you?',
      subtitle: 'These factors can significantly impact surgical outcomes',
      multiSelect: true,
      options: [
        { id: 'smoking', label: 'Current smoker' },
        { id: 'former-smoker', label: 'Former smoker (quit within last 2 years)' },
        { id: 'heavy-drinking', label: 'Regular alcohol consumption (>14 units/week)' },
        { id: 'sedentary', label: 'Sedentary lifestyle (minimal exercise)' },
        { id: 'poor-diet', label: 'Poor nutritional habits' },
        { id: 'high-stress', label: 'High stress levels' },
        { id: 'sleep-issues', label: 'Sleep problems or disorders' },
        { id: 'none', label: 'None of the above' },
      ],
    },
    {
      id: 'medications',
      question: 'Are you currently taking any of these medications?',
      subtitle: 'Some medications can increase surgical complications',
      multiSelect: true,
      options: [
        { id: 'blood-thinners', label: 'Blood thinners (Warfarin, Aspirin, etc.)' },
        { id: 'diabetes-meds', label: 'Diabetes medications' },
        { id: 'heart-meds', label: 'Heart medications' },
        { id: 'immunosuppressants', label: 'Immunosuppressive drugs' },
        { id: 'steroids', label: 'Long-term steroid use' },
        { id: 'herbal-supplements', label: 'Herbal supplements or alternative medicines' },
        { id: 'pain-meds', label: 'Regular pain medications' },
        { id: 'none', label: 'None of the above' },
      ],
    },
    {
      id: 'previous-surgery',
      question: 'What is your surgical history?',
      subtitle: 'Previous surgical experiences can indicate potential risks',
      options: [
        { id: 'no-surgery', label: 'No Previous Surgery', description: 'This would be my first surgical procedure' },
        { id: 'minor-surgery', label: 'Minor Surgery Only', description: 'Outpatient procedures, dental surgery, etc.' },
        { id: 'major-surgery-good', label: 'Major Surgery - Good Recovery', description: 'Had major surgery with no complications' },
        { id: 'major-surgery-complications', label: 'Major Surgery - With Complications', description: 'Experienced complications during or after surgery' },
        { id: 'multiple-surgeries', label: 'Multiple Major Surgeries', description: 'Several major surgical procedures' },
      ],
    },
    {
      id: 'bmi-category',
      question: 'What is your current weight status?',
      subtitle: 'Weight significantly impacts surgical risk and recovery',
      options: [
        { id: 'underweight', label: 'Underweight', description: 'BMI under 18.5' },
        { id: 'normal', label: 'Normal Weight', description: 'BMI 18.5-24.9' },
        { id: 'overweight', label: 'Overweight', description: 'BMI 25-29.9' },
        { id: 'obese-1', label: 'Obese Class I', description: 'BMI 30-34.9' },
        { id: 'obese-2', label: 'Obese Class II', description: 'BMI 35-39.9' },
        { id: 'obese-3', label: 'Obese Class III', description: 'BMI 40+' },
      ],
    },
    {
      id: 'age-group',
      question: 'What is your age range?',
      subtitle: 'Age is a key factor in surgical risk assessment',
      options: [
        { id: 'under-40', label: 'Under 40' },
        { id: '40-49', label: '40-49' },
        { id: '50-59', label: '50-59' },
        { id: '60-69', label: '60-69' },
        { id: '70-79', label: '70-79' },
        { id: '80-plus', label: '80+' },
      ],
    },
  ],
};

export function ComplicationRiskQuestionsPage() {
  const [hasPaymentAccess, setHasPaymentAccess] = useState(false);

  // Convert answer IDs → labels
  const convertAnswersToLabels = (answers: Record<string, any>) => {
    const converted: Array<{ question: string; answer: string }> = [];
    complicationRiskQuiz.questions.forEach((q) => {
      const answer = answers[q.id];
      if (!answer) return;

      let labels: string;
      if (q.multiSelect && Array.isArray(answer)) {
        labels = answer.map((id) => q.options.find((o) => o.id === id)?.label || id).join(', ');
      } else {
        const selectedId = Array.isArray(answer) ? answer[0] : answer;
        labels = q.options.find((o) => o.id === selectedId)?.label || selectedId || '';
      }

      converted.push({ question: q.question, answer: labels });
    });
    return converted;
  };

  const quizWithSubmit: QuizConfig = {
    ...complicationRiskQuiz,
    informationPageRoute: 'complication-risk-checker-information',
    onComplete: async (answers) => {
      console.log('Complication Risk Assessment completed with answers:', answers);
      const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');

      try {
        const convertedAnswers = convertAnswersToLabels(answers);

        await fetch('https://luther.health/api/assessments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: user.id,
            assessment_type: 'Complication Risk',
            answers: convertedAnswers,
          }),
        });

        window.location.hash = 'complication-risk-checker-information';
      } catch (err) {
        console.error('Error saving complication risk assessment:', err);
      }
    },
    onBack: () => {
      window.location.hash = 'complication-risk-checker-learn-more';
    },
  };

  // Show payment gate if user hasn't paid
  if (!hasPaymentAccess) {
    return <PaymentGate onPaymentVerified={() => setHasPaymentAccess(true)} />;
  }

  // Show quiz if payment verified
  return <QuizTemplate config={quizWithSubmit} />;
}