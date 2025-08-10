import React, { useState } from "react";

const Payment = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can integrate Stripe or another payment provider here
    console.log("Payment submitted", form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
        <div className="bg-white rounded-xl shadow-md p-10 text-center max-w-md">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Payment Successful!</h2>
          <p className="text-gray-600">Thank you for your purchase. A confirmation email has been sent to <strong>{form.email}</strong>.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Checkout & Payment</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <input
              name="cardNumber"
              type="text"
              value={form.cardNumber}
              onChange={handleChange}
              required
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input
                name="expiry"
                type="text"
                value={form.expiry}
                onChange={handleChange}
                required
                placeholder="MM/YY"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
              <input
                name="cvc"
                type="text"
                value={form.cvc}
                onChange={handleChange}
                required
                placeholder="123"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-purple-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Pay Now
          </button>
        </form>
      </div>
    </section>
  );
};

export default Payment;
