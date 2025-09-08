import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import StripeCheckout from '../../components/Users/StripeCheckout';
import PlaceholderImage from '../../components/ui/PlaceholderImage';
import { clearCart } from '../../features/cart/cartSlice';
import { useToast } from '../../contexts/ToastContext';
import { orderAPI } from '../../services/api';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showSuccess, showError } = useToast();
  
  const { items: cartItems } = useAppSelector(state => state.cart);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState(null);
  
  // Shipping information
  const { user } = useAuth();
  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || '',
    email: user?.email || user?.emailOrPhone || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    postalCode: ''
  });

  // Address management
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('new');
  const [showAddressForm, setShowAddressForm] = useState(true);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 100; // Free shipping over ₹1000
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shipping + tax;

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
    
    // Load saved addresses
    try {
      const saved = localStorage.getItem('savedAddresses');
      if (saved) {
        setSavedAddresses(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved addresses:', error);
    }
    // If user exists, prefill name / email / phone
    try {
      const authRaw = localStorage.getItem('user');
      const authUser = authRaw ? JSON.parse(authRaw) : (user || null);
      if (authUser) {
        setShippingInfo(prev => ({
          ...prev,
          name: prev.name || authUser.name || '',
          email: authUser.email || authUser.emailOrPhone || prev.email,
          phone: prev.phone || authUser.phone || ''
        }));
      }
    } catch (e) {}
  }, [cartItems, navigate]);

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleAddressSelect = (e) => {
    const addressId = e.target.value;
    setSelectedAddressId(addressId);
    
    if (addressId === 'new') {
      setShowAddressForm(true);
      setShippingInfo({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        postalCode: ''
      });
    } else {
      const selectedAddress = savedAddresses.find(addr => addr.id === addressId);
      if (selectedAddress) {
        setShippingInfo(selectedAddress);
        setShowAddressForm(false);
      }
    }
  };

  const saveAddress = () => {
    if (isFormValid() && selectedAddressId === 'new') {
      const newAddress = {
        ...shippingInfo,
        id: Date.now().toString(),
        label: `${shippingInfo.name} - ${shippingInfo.city}`
      };
      
      const updatedAddresses = [...savedAddresses, newAddress];
      setSavedAddresses(updatedAddresses);
      
      try {
        localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
      } catch (error) {
        console.error('Error saving address:', error);
      }
    }
  };

  const createOrder = async () => {
    try {
      // Save address before creating order
      saveAddress();
      
      // prefer logged-in user email/name/phone when available
      let authUser = null;
      try { authUser = JSON.parse(localStorage.getItem('user') || 'null'); } catch (e) { authUser = null; }

      // small helper to avoid sending invalid ObjectId values to the backend
      const isValidObjectId = (id) => {
        return typeof id === 'string' && /^[a-f\d]{24}$/i.test(id);
      };

      const orderData = {
        customer: shippingInfo.name || (authUser && authUser.name) || '',
        email: (authUser && (authUser.email || authUser.emailOrPhone)) || shippingInfo.email,
        phoneNumber: (authUser && authUser.phone) || shippingInfo.phone,
        amount: total,
        items: cartItems.length,
        payment: 'Razorpay', // Updated to show Razorpay instead of Stripe
        shippingAddress: {
          street: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          postalCode: shippingInfo.postalCode,
          country: 'India'
        },
        products: cartItems.map(item => ({
          // only send productId when it's a valid 24-char hex ObjectId; otherwise send null
          productId: isValidObjectId(item._id) ? item._id : null,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color
        }))
      };

      const response = await orderAPI.createOrder(orderData);
      
      if (response.success) {
        setOrderId(response.order._id);
        return response.order._id;
      } else {
        throw new Error(response.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Order creation failed:', error);
      showError('Failed to create order. Please try again.');
      return null;
    }
  };

  const handlePaymentSuccess = async (verifyResponse) => {
    setIsProcessing(true);

    try {
      // verifyResponse may be the server response object from verifyRazorpay
      const orderObj = verifyResponse && verifyResponse.order ? verifyResponse.order : (verifyResponse && verifyResponse.data && verifyResponse.data.order ? verifyResponse.data.order : null);
      const paymentIntentId = orderObj ? (orderObj.paymentIntentId || orderObj.payment_id || '') : '';

      if (orderObj && orderObj._id) {
        setOrderId(orderObj._id);
        // Persist last placed order so Profile can refresh
        try {
          localStorage.setItem('lastOrderPlaced', orderObj._id);
        } catch (e) {
          // ignore
        }

        // Also store the full order object under multiple keys: order email, order customer, and current logged-in user
        try {
          const keys = new Set();
          if (orderObj.email) keys.add(`orders_${orderObj.email}`);
          if (orderObj.customer) keys.add(`orders_${orderObj.customer.replace(/\s+/g,'_')}`);
          // attempt to get current logged-in user from localStorage
          try {
            const rawUser = localStorage.getItem('user');
            if (rawUser) {
              const cur = JSON.parse(rawUser);
              const curEmail = cur.email || cur.emailOrPhone || cur.emailOrPhone;
              if (curEmail) keys.add(`orders_${curEmail}`);
            }
          } catch (e) {
            // ignore parse errors
          }

          keys.forEach(userKey => {
            try {
              const raw = localStorage.getItem(userKey);
              const existing = raw ? JSON.parse(raw) : [];
              const exists = existing.find(o => (o._id || o.id) === orderObj._id);
              if (!exists) {
                existing.unshift(orderObj);
                const trimmed = existing.slice(0, 20);
                localStorage.setItem(userKey, JSON.stringify(trimmed));
              }
            } catch (e) {
              // ignore per-key failures
            }
          });
        } catch (e) {
          console.warn('Failed to persist order locally', e);
        }

        // Dispatch a custom event so Profile in the same tab can react
        try { window.dispatchEvent(new CustomEvent('orderPlaced', { detail: orderObj._id })); } catch (e) {}
      }

      showSuccess('Payment successful! Order confirmed.');

      // Clear cart
      dispatch(clearCart());

      // Redirect to order confirmation
      navigate(`/order-confirmation/${orderId || (orderObj && orderObj._id)}`, {
        state: { paymentIntentId }
      });

    } catch (error) {
      console.error('Post-payment processing failed:', error);
      showError('Payment succeeded but order processing failed. Please contact support.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
    showError('Payment failed. Please try again.');
  };

  const isFormValid = () => {
    return Object.values(shippingInfo).every(value => value.trim() !== '');
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Shipping Information */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              
              {/* Address Selection */}
              {savedAddresses.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Address
                  </label>
                  <select
                    value={selectedAddressId}
                    onChange={handleAddressSelect}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="new">+ Add New Address</option>
                    {savedAddresses.map((addr) => (
                      <option key={addr.id} value={addr.id}>
                        {addr.label} ({addr.city}, {addr.state})
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              {/* Address Form */}
              {showAddressForm && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={shippingInfo.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>
                    
                    {/* Email is taken from logged-in account and no longer editable here */}
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Show selected address info when not editing */}
              {!showAddressForm && selectedAddressId !== 'new' && (
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-medium">{shippingInfo.name}</p>
                  <p>{shippingInfo.address}</p>
                  <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.postalCode}</p>
                  <p>{shippingInfo.email} | {shippingInfo.phone}</p>
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit Address
                  </button>
                </div>
              )}
            </div>

            {/* Payment Section */}
            <div className="mt-8">
              {!isFormValid() ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 flex flex-col items-center"
                >
                  <svg className="w-10 h-10 text-yellow-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                  </svg>
                  <p className="text-yellow-800 text-base font-medium mb-2">Complete your shipping information to proceed.</p>
                  <p className="text-yellow-700 text-sm">All fields are required for delivery and payment.</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
                >
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Payment</h3>
                  {(() => {
                    const prefill = {
                      name: shippingInfo.name || (user && user.name) || '',
                      email: (user && (user.email || user.emailOrPhone)) || shippingInfo.email || '',
                      contact: shippingInfo.phone || (user && user.phone) || ''
                    };
                    return (
                      <StripeCheckout
                        amount={total}
                        orderId={orderId}
                        createOrder={createOrder}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                        prefill={prefill}
                      />
                    );
                  })()}
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={`${item._id}-${item.size}`} className="flex items-center space-x-4">
                    {item.photos?.[0] ? (
                      <img
                        src={item.photos[0]}
                        alt={item.name}
                        className="w-15 h-15 object-cover rounded"
                      />
                    ) : (
                      <PlaceholderImage className="w-15 h-15 rounded" alt={item.name} />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18% GST)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
              
              {!isFormValid() && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-yellow-800 text-sm">
                    Please fill in all shipping information to proceed with payment.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
