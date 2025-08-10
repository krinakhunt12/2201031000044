import React from "react";
import { ShoppingBag, X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = ({ cartItems = [], onRemove, onUpdateQuantity }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/shop"
            className="flex items-center text-purple-600 hover:text-purple-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Shop
          </Link>
          <div className="text-gray-500">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3">
          <ShoppingBag className="w-7 h-7 text-purple-600" />
          Your Shopping Cart
        </h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-3">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Looks like you haven't added any items yet</p>
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all shadow-md hover:shadow-lg"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 flex items-center justify-between border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={`https://picsum.photos/seed/${item.id}/120/120`}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border border-gray-200"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                      <div className="flex items-center mt-3">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className={`px-3 py-1 rounded-l border border-gray-300 hover:bg-gray-100 ${
                            item.quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-t border-b border-gray-300 bg-gray-50 text-center min-w-[40px]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 rounded-r border border-gray-300 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end ml-4">
                    <button
                      onClick={() => onRemove(item.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <p className="mt-4 font-semibold text-gray-900 text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-700">Subtotal</h3>
                <p className="text-lg font-medium text-gray-900">${total.toFixed(2)}</p>
              </div>
              <p className="text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout</p>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <Link
                  to="/shop"
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-center"
                >
                  Continue Shopping
                </Link>
                <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all shadow-md hover:shadow-lg font-medium">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;