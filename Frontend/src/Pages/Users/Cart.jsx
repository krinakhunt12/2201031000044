import React, { useMemo } from "react";
import { ShoppingBag, X, ArrowLeft, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeFromCart, updateQuantity } from '../../features/cart/cartSlice';
import { useToast } from '../../contexts/ToastContext';
import Navbar from '../../components/Users/Navbar';
import Footer from '../../components/Users/Footer';
import { useAuth } from '../../hooks/useAuth';

const Cart = () => {
  const dispatch = useAppDispatch();
  const { items: cartItems, totalAmount, totalQuantity } = useAppSelector(state => state.cart);
  const { showSuccess, showError } = useToast();
  const { isAuthenticated } = useAuth();

  const handleRemoveItem = (item) => {
    if (!isAuthenticated) {
      showError('Please log in to your account.');
      return;
    }
    dispatch(removeFromCart({ id: item.id, selectedSize: item.selectedSize }));
    showSuccess('Item removed from cart');
  };

  const handleUpdateQuantity = (item, newQuantity) => {
    if (!isAuthenticated) {
      showError('Please log in to your account.');
      return;
    }
    if (newQuantity <= 0) {
      handleRemoveItem(item);
    } else {
      dispatch(updateQuantity({ 
        id: item.id, 
        selectedSize: item.selectedSize, 
        quantity: newQuantity 
      }));
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              to="/" 
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>

            <div className="bg-white rounded-xl shadow-lg p-12 border border-gray-200">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
              <p className="text-gray-600 mb-6">Looks like you haven't added any items yet</p>
              <Link
                to="/shop"
                className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <div className="text-gray-500">
              {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3">
            <ShoppingBag className="w-7 h-7 text-black" />
            Your Shopping Cart
          </h2>

          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  className="p-4 flex items-center justify-between border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                        {/* Use a stable URL for product photo served by backend. */}
                        {(() => {
                          const apiBase = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL
                            ? import.meta.env.VITE_API_URL
                            : `${window.location.protocol}//${window.location.host}`;
                          let photoUrl;
                          if (item.photos && item.photos.length > 0) {
                            const firstPhoto = item.photos[0];
                            if (typeof firstPhoto === 'string' && /^https?:\/\//i.test(firstPhoto)) {
                              photoUrl = firstPhoto;
                            } else if (typeof firstPhoto === 'string') {
                              photoUrl = `${apiBase.replace(/\/$/, '')}${firstPhoto.startsWith('/') ? firstPhoto : '/' + firstPhoto}`;
                            } else {
                              photoUrl = `${apiBase}/api/products/${item.id}/photo/0`;
                            }
                          } else if (item.image) {
                            photoUrl = item.image;
                          } else {
                            photoUrl = `https://picsum.photos/seed/${item.id}/120/120`;
                          }
                          return (
                            <img
                              src={photoUrl}
                              alt={item.name}
                              className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border border-gray-200"
                            />
                          );
                        })()}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        ₹{item.onSale ? item.salePrice : item.price} each
                      </p>
                      {item.selectedSize && (
                        <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                      )}
                      {item.selectedColor && (
                        <p className="text-sm text-gray-500">Color: {item.selectedColor}</p>
                      )}
                      <div className="flex items-center mt-3">
                        <button
                          onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
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
                          onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                          className="px-3 py-1 rounded-r border border-gray-300 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end ml-4">
                    <button
                      onClick={() => handleRemoveItem(item)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Remove item"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <p className="mt-4 font-semibold text-gray-900 text-lg">
                      ₹{item.totalPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-700">Subtotal</h3>
                <p className="text-lg font-medium text-gray-900">₹{totalAmount}</p>
              </div>
              <p className="text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout</p>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <Link
                  to="/shop"
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-center"
                >
                  Continue Shopping
                </Link>
                <Link
                  to="/checkout"
                  className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all shadow-md hover:shadow-lg font-medium text-center"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;