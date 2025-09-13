import React from "react";
import { XCircle } from "lucide-react";

export default function Cancel() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-6">
      <XCircle className="w-16 h-16 text-red-600 mb-4" />
      <h1 className="text-2xl font-bold text-red-700">Payment Cancelled</h1>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        It looks like you cancelled the payment. Don’t worry — your basket is still saved.
        You can try again whenever you’re ready.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Back to Home
      </a>
    </div>
  );
}
