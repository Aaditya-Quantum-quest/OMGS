'use client';

import { Check, Home, Package } from 'lucide-react';

export default function ThankYouPage() {
  const handleGoHome = () => {
    // In Next.js, you would use: router.push('/')
    // For this demo, we'll show an alert
    alert('Navigating to home page...');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-green-100 rounded-full p-4">
            <Check className="w-16 h-16 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Thank You!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Your photo frame order has been successfully placed.
        </p>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center gap-2 text-blue-700 mb-2">
            <Package className="w-5 h-5" />
            <span className="font-semibold">Order Confirmation</span>
          </div>
          <p className="text-sm text-gray-700">
            We've sent a confirmation email with your order details and tracking information.
          </p>
        </div>

        {/* <div className="space-y-3 mb-6 text-left bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Order Number:</span>
            <span className="font-semibold text-gray-800">#PF{Math.floor(Math.random() * 100000)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Estimated Delivery:</span>
            <span className="font-semibold text-gray-800">5-7 business days</span>
          </div>
        </div> */}

        <button
          onClick={handleGoHome}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </button>

        <p className="text-xs text-gray-500 mt-6">
          Need help? Contact us at support@premcolorlab.com
        </p>
      </div>
    </div>
  );
}