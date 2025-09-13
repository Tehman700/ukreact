import React from "react";
import { CheckCircle } from "lucide-react";

export default function Success() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
      <h1 className="text-2xl font-bold text-green-700">Payment Successful</h1>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        Thank you for your purchase! Your payment has been processed successfully.
        You’ll receive an email confirmation shortly.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Back to Home
      </a>
    </div>
  );
}
