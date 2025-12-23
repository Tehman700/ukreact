import React from "react";
import { CheckCircle } from "lucide-react";

export function PurchaseThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <CheckCircle className="w-20 h-20 text-green-600 mb-6" />

      <h1 className="text-3xl font-bold text-green-700 mb-3">Thank You!</h1>

      <p className="text-gray-700 text-center max-w-lg text-lg mb-2">
        Your purchase was successful.
      </p>
      
      <p className="text-gray-600 text-center max-w-md mb-8">
        We've sent a confirmation email with your receipt and next steps.
      </p>

      <a
        href="/#surgery-readiness-assessment-questions"
        className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium"
      >
        Continue
      </a>
    </div>
  );
}
