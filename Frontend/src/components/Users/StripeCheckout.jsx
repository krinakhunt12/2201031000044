import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Razorpay checkout component — kept file name to avoid import changes elsewhere
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || '';

function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error('Razorpay SDK failed to load'));
    document.body.appendChild(script);
  });
}

const CheckoutForm = ({ amount, orderId, onSuccess, onError, prefill = {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // nothing initially
  }, []);

  const handlePay = async () => {
    setError('');
    if (!RAZORPAY_KEY) {
      setError('Razorpay not configured. Set VITE_RAZORPAY_KEY_ID in Frontend/.env');
      return;
    }

    try {
      setIsLoading(true);
      await loadRazorpayScript();

      // Create order on backend
          const apiBase = import.meta.env.VITE_API_URL || '';
          const resp = await fetch(`${apiBase}/api/payments/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency: 'INR', orderId })
      });
      const data = await resp.json();
      if (!data.success || !data.razorpayOrder) {
        throw new Error(data.message || 'Failed to create order');
      }

      const order = data.razorpayOrder;

      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: prefill.name || 'Stylon',
        description: 'Order Payment',
        order_id: order.id,
        handler: async function (response) {
          // verify payment on server
          try {
            const verifyResp = await fetch(`${apiBase}/api/payments/verify-razorpay`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId
              })
            });

            const verifyData = await verifyResp.json();
            if (verifyData.success) {
              onSuccess && onSuccess(verifyData);
            } else {
              onError && onError(verifyData);
            }
          } catch (err) {
            onError && onError(err);
          }
        },
        prefill: {
          name: prefill.name || '',
          email: prefill.email || '',
          contact: prefill.contact || ''
        },
        theme: { color: '#000000' }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Payment initialization failed');
      onError && onError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Payment Details</h3>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total: ₹{amount}</span>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handlePay}
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          {isLoading ? 'Processing...' : `Pay ₹${amount}`}
        </motion.button>
      </div>
    </div>
  );
};

const StripeCheckout = ({ amount, orderId, onSuccess, onError, prefill }) => {
  return (
    <CheckoutForm amount={amount} orderId={orderId} onSuccess={onSuccess} onError={onError} prefill={prefill} />
  );
};

export default StripeCheckout;
