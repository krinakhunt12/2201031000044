import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Edit, Save, X, LogOut } from 'lucide-react';
import { useAppSelector } from '../../store/hooks';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../contexts/ToastContext';
import Navbar from '../../components/Users/Navbar';
import Footer from '../../components/Users/Footer';
import { orderAPI } from '../../services/api';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    address: '123 Fashion Street, Mumbai, Maharashtra 400001',
    dateOfBirth: '1990-01-01'
  });

  const navigate = useNavigate();
  const { user, logout: authLogout } = useAuth();
  const { showSuccess } = useToast();

  // Orders tab state
  const [activeTab, setActiveTab] = useState('account'); // account | orders | addresses
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState('');
  const [ordersRefreshTrigger, setOrdersRefreshTrigger] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Addresses
  const [addresses, setAddresses] = useState([]);

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // In a real app, this would be an API call
    showSuccess('Profile updated successfully');
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original data
    setProfileData({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+91 98765 43210',
      address: '123 Fashion Street, Mumbai, Maharashtra 400001',
      dateOfBirth: '1990-01-01'
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    authLogout();
    showSuccess('Logged out successfully');
    navigate('/');
  };

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Sync profile form with authenticated user when available
  useEffect(() => {
    if (!user) return;
    setProfileData(prev => ({
      firstName: user.firstName || (user.name ? user.name.split(' ')[0] : prev.firstName),
      lastName: user.lastName || (user.name ? user.name.split(' ').slice(1).join(' ') : prev.lastName),
      email: user.email || user.emailOrPhone || prev.email,
      phone: user.phone || prev.phone,
      address: user.address || prev.address,
      dateOfBirth: user.dateOfBirth || prev.dateOfBirth
    }));
  }, [user]);

  if (!user) return null;

  useEffect(() => {
    // load saved addresses from localStorage (updated storage key)
    try {
      const savedAddressesRaw = localStorage.getItem('savedAddresses');
      if (savedAddressesRaw) {
        const savedAddresses = JSON.parse(savedAddressesRaw);
        setAddresses(savedAddresses);
      } else {
        // Fallback to old addresses storage
        const oldAddressesRaw = localStorage.getItem('addresses');
        if (oldAddressesRaw) {
          setAddresses(JSON.parse(oldAddressesRaw));
        }
      }
    } catch (error) {
      console.error('Error loading addresses:', error);
    }
  }, [user]);

  // Fetch orders when orders tab opens or when refresh trigger increments
  const fetchOrders = async () => {
    setOrdersLoading(true);
    setOrdersError('');
    try {
      let res;
      if (user && (user.email || user.emailOrPhone)) {
        // Try getMyOrders first
        try {
          res = await orderAPI.getMyOrders();
        } catch (primaryError) {
          // Fallback: get all and filter locally
          const allOrdersRes = await orderAPI.getAllOrders();
          if (allOrdersRes.success) {
            const userEmail = user.email || user.emailOrPhone;
            const userOrders = allOrdersRes.orders.filter(order => (
              order.email === userEmail ||
              (order.customer && user.name && order.customer.toLowerCase().includes(user.name.toLowerCase())) ||
              order.phoneNumber === user.phone
            ));
            res = { success: true, orders: userOrders };
          } else {
            throw primaryError;
          }
        }
      } else {
        res = await orderAPI.getMyOrders();
      }

      // Merge any locally stored orders for this user into the fetched results
      const getLocalMatches = () => {
        try {
          const matchKey = (user && (user.email || user.emailOrPhone) || '').toString().toLowerCase();
          const nameKey = (user && (user.name || user.fullName) || '').toString().toLowerCase();
          const matches = [];
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (!key || !key.startsWith('orders_')) continue;
            const lk = key.toString().toLowerCase();
            try {
              // if key includes email or name, prefer it
              if ((matchKey && lk.includes(matchKey)) || (nameKey && lk.includes(nameKey))) {
                const arr = JSON.parse(localStorage.getItem(key) || '[]');
                if (Array.isArray(arr)) matches.push(...arr);
                continue;
              }
              // otherwise inspect content
              const arr = JSON.parse(localStorage.getItem(key) || '[]');
              if (!Array.isArray(arr)) continue;
              arr.forEach(o => {
                try {
                  const oemail = (o.email || o.orderEmail || '').toString().toLowerCase();
                  const ocust = (o.customer || '').toString().toLowerCase();
                  const ophone = (o.phoneNumber || o.phone || '').toString().toLowerCase();
                  if ((matchKey && (oemail === matchKey || ophone === matchKey)) || (nameKey && ocust && ocust.includes(nameKey))) {
                    matches.push(o);
                  }
                } catch (e) {}
              });
            } catch (e) {}
          }
          return matches;
        } catch (e) { return []; }
      };

      const localMatches = getLocalMatches();

      if (res && res.success) {
        // dedupe by _id or id
        const fetched = res.orders || [];
        const fetchedIds = new Set(fetched.map(o => o._id || o.id));
        const toAdd = localMatches.filter(o => !(fetchedIds.has(o._id || o.id)));
        setOrders([...toAdd, ...fetched]);
      } else if (localMatches.length > 0) {
        // no server data, but local has orders
        setOrders(localMatches);
      } else {
        setOrdersError((res && res.message) || 'Failed to load orders');
      }
    } catch (err) {
      console.error('Error loading orders:', err);
      setOrdersError(err.message || 'Failed to load orders');
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab !== 'orders') return;
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, user, ordersRefreshTrigger]);

  // Merge any locally stored orders for this user into the orders list (dedupe by _id)
  useEffect(() => {
    if (!user) return;
    try {
      // First try to find keys that include the user's email or name (faster and more reliable)
      const matchKey = (user.email || user.emailOrPhone || '').toString().toLowerCase();
      const nameKey = (user.name || user.fullName || '').toString().toLowerCase();
      const matchingArrays = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key || !key.startsWith('orders_')) continue;
        const lk = key.toString().toLowerCase();
        try {
          if ((matchKey && lk.includes(matchKey)) || (nameKey && lk.includes(nameKey))) {
            const raw = localStorage.getItem(key);
            const arr = raw ? JSON.parse(raw) : [];
            if (Array.isArray(arr) && arr.length > 0) matchingArrays.push(...arr);
          }
        } catch (e) {}
      }

      let matches = matchingArrays;

      // Fallback: scan all orders_* content and filter by email/customer/phone if no direct key matches
      if (matches.length === 0) {
        const localOrdersAll = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('orders_')) {
            try {
              const raw = localStorage.getItem(key);
              const arr = raw ? JSON.parse(raw) : [];
              if (Array.isArray(arr) && arr.length > 0) localOrdersAll.push(...arr);
            } catch (e) {}
          }
        }

        if (localOrdersAll.length === 0) return;

        matches = localOrdersAll.filter(o => {
          try {
            const oemail = (o.email || o.orderEmail || '').toString().toLowerCase();
            const ocust = (o.customer || '').toString().toLowerCase();
            const ophone = (o.phoneNumber || o.phone || '').toString().toLowerCase();
            if (matchKey && oemail && oemail === matchKey) return true;
            if (nameKey && ocust && ocust.includes(nameKey)) return true;
            if (matchKey && ophone && ophone === matchKey) return true;
            return false;
          } catch (e) { return false; }
        });
      }

      if (!matches || matches.length === 0) return;

      setOrders(prev => {
        const existingIds = new Set(prev.map(o => o._id || o.id));
        const merged = [...matches.filter(o => !(existingIds.has(o._id || o.id))), ...prev];
        return merged;
      });
    } catch (e) {
      console.warn('Failed to merge local orders', e);
    }
  }, [user, ordersRefreshTrigger]);

  // Refresh orders when a recent order is placed in another component/tab
  useEffect(() => {
    function onOrderPlaced(e) {
      // increment trigger to refetch when Orders tab is visible
      setOrdersRefreshTrigger(n => n + 1);
      // clear localStorage marker
      try { localStorage.removeItem('lastOrderPlaced'); } catch (e) {}
    }

    window.addEventListener('orderPlaced', onOrderPlaced);

    // If there was a stored lastOrderPlaced (from previous flow), trigger a single refresh
    try {
      const last = localStorage.getItem('lastOrderPlaced');
      if (last) {
        setOrdersRefreshTrigger(n => n + 1);
        localStorage.removeItem('lastOrderPlaced');
      }
    } catch (err) {}

    return () => window.removeEventListener('orderPlaced', onOrderPlaced);
  }, []);

  // Open a modal with full order details. Try API first, then fallback to localStorage or all-orders search.
  const handleViewOrder = async (id) => {
    if (!id) return;
    setOrdersLoading(true);
    setOrdersError('');
    try {
      // Try fetching single order by id from server
      try {
        const res = await orderAPI.getOrderById(id);
        // API may return { success: true, order } or the order object directly
        if (res) {
          const orderObj = res.order || res.data || res;
          setSelectedOrder(orderObj);
          setShowOrderModal(true);
          return;
        }
      } catch (apiErr) {
        // ignore and try local fallback
        console.warn('getOrderById failed, falling back to localStorage/allOrders', apiErr);
      }

      // Fallback: search localStorage orders_* keys
      let found = null;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key || !key.startsWith('orders_')) continue;
        try {
          const arr = JSON.parse(localStorage.getItem(key) || '[]');
          if (Array.isArray(arr)) {
            const match = arr.find(o => (o._id === id || o.id === id || o.orderId === id));
            if (match) { found = match; break; }
          }
        } catch (e) { }
      }

      if (found) {
        setSelectedOrder(found);
        setShowOrderModal(true);
        return;
      }

      // Last-resort: fetch all orders and find the matching one (requires admin/backend support)
      try {
        const all = await orderAPI.getAllOrders();
        if (all && all.success && Array.isArray(all.orders)) {
          const match = all.orders.find(o => (o._id === id || o.id === id || o.orderId === id));
          if (match) {
            setSelectedOrder(match);
            setShowOrderModal(true);
            return;
          }
        }
      } catch (e) { /* ignore */ }

      setOrdersError('Order details not found');
    } catch (err) {
      console.error('Error loading order details:', err);
      setOrdersError(err.message || 'Failed to load order details');
    } finally {
      setOrdersLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-gray-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {user?.name ? user.name : `${profileData.firstName} ${profileData.lastName}`}
                  </h1>
                  <p className="text-gray-600">{user?.email || profileData.email}</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Profile Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">12</div>
                <div className="text-sm text-gray-600">Orders</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">8</div>
                <div className="text-sm text-gray-600">Wishlist Items</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">₹24,500</div>
                <div className="text-sm text-gray-600">Total Spent</div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                ) : (
                  <div className="text-gray-900">{profileData.firstName}</div>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                ) : (
                  <div className="text-gray-900">{profileData.lastName}</div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <div className="text-gray-900">{profileData.email}</div>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <div className="text-gray-900">{profileData.phone}</div>
                  </div>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={profileData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                ) : (
                  <div className="text-gray-900">{profileData.dateOfBirth}</div>
                )}
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                ) : (
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="text-gray-900">{profileData.address}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8">
            <div className="flex space-x-2 mb-4">
              <button onClick={() => setActiveTab('account')} className={`px-4 py-2 rounded ${activeTab==='account' ? 'bg-black text-white' : 'bg-white border'}`}>Account</button>
              <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 rounded ${activeTab==='orders' ? 'bg-black text-white' : 'bg-white border'}`}>Orders</button>
              <button onClick={() => setActiveTab('addresses')} className={`px-4 py-2 rounded ${activeTab==='addresses' ? 'bg-black text-white' : 'bg-white border'}`}>Addresses</button>
            </div>

            {activeTab === 'account' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Actions</h2>
                <div className="space-y-4">
                  <button className="w-full md:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Change Password</button>
                  <button className="w-full md:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Privacy Settings</button>
                  <button onClick={handleLogout} className="w-full md:w-auto px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"><LogOut className="w-4 h-4" /><span>Logout</span></button>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">My Orders</h2>
                {ordersLoading ? (
                  <div className="py-8 text-center text-gray-500">Loading orders...</div>
                ) : ordersError ? (
                  <div className="text-red-600">{ordersError}</div>
                ) : orders.length === 0 ? (
                  <div className="py-8 text-center">
                    <div className="text-gray-400 mb-3">You haven't placed any orders yet.</div>
                    <button onClick={() => navigate('/shop')} className="px-6 py-2 bg-black text-white rounded-lg">Start Shopping</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {orders.map(o => {
                      const id = o._id || o.id || o.orderId;
                      const when = o.createdAt ? new Date(o.createdAt) : (o.date ? new Date(o.date) : null);
                      const total = Number(o.amount || 0).toLocaleString();
                      const status = o.status || 'pending';
                      return (
                        <div key={id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                          <div className="flex items-start space-x-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                              {o.products && o.products[0] && o.products[0].photo ? (
                                // prefer product photo if available
                                <img src={o.products[0].photo} alt={o.products[0].name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="text-gray-400 text-sm">No Image</div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="text-sm text-gray-500">Order</div>
                                  <div className="font-medium text-gray-900">#{id}</div>
                                  <div className="text-xs text-gray-400 mt-1">{when ? when.toLocaleString() : '—'}</div>
                                </div>
                                <div className="text-right">
                                  <div className="font-semibold text-gray-900">₹{total}</div>
                                  <div className="mt-2">
                                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${status === 'Delivered' ? 'bg-green-100 text-green-800' : status === 'Shipped' ? 'bg-blue-100 text-blue-800' : status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                      {status}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-3 text-sm text-gray-700">
                                {o.products && o.products.length > 0 ? (
                                  <ul className="space-y-1">
                                    {o.products.slice(0,3).map((p, idx) => (
                                      <li key={idx} className="flex justify-between">
                                        <span className="truncate max-w-[200px]">{p.name}</span>
                                        <span className="text-sm text-gray-600">x{p.quantity} • ₹{p.price}</span>
                                      </li>
                                    ))}
                                    {o.products.length > 3 && (
                                      <li className="text-xs text-gray-500">+{o.products.length - 3} more items</li>
                                    )}
                                  </ul>
                                ) : (
                                  <div>Items: {o.items || 'N/A'}</div>
                                )}
                              </div>

                              <div className="mt-4 flex items-center justify-between">
                                <div className="text-xs text-gray-500">Payment: {o.payment || o.paymentMethod || '—'}</div>
                                <div className="flex items-center space-x-2">
                                  <button onClick={() => handleViewOrder(id)} className="px-3 py-1 text-sm bg-black text-white rounded">View</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Order details modal */}
            {showOrderModal && selectedOrder && (
              <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black bg-opacity-50">
                <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl overflow-auto max-h-[90vh]">
                  <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Order Details — #{selectedOrder._id || selectedOrder.id}</h3>
                    <button onClick={() => { setShowOrderModal(false); setSelectedOrder(null); }} className="text-gray-600 hover:text-gray-900">Close</button>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold">Customer</h4>
                        <p className="text-sm text-gray-700">{selectedOrder.customer}</p>
                        {selectedOrder.email && <p className="text-sm text-gray-700">{selectedOrder.email}</p>}
                        {selectedOrder.phoneNumber && <p className="text-sm text-gray-700">{selectedOrder.phoneNumber}</p>}
                      </div>
                      <div>
                        <h4 className="font-semibold">Payment & Status</h4>
                        <p className="text-sm text-gray-700">Method: {selectedOrder.payment || '—'}</p>
                        <p className="text-sm text-gray-700">Status: {selectedOrder.status}</p>
                        {selectedOrder.paymentIntentId && <p className="text-sm text-gray-700">Payment ID: {selectedOrder.paymentIntentId}</p>}
                      </div>
                    </div>

                    {selectedOrder.shippingAddress && (
                      <div className="p-4 bg-gray-50 rounded">
                        <h4 className="font-semibold mb-2">Shipping Address</h4>
                        <p className="text-sm text-gray-700">{selectedOrder.shippingAddress.street}</p>
                        <p className="text-sm text-gray-700">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.postalCode}</p>
                        <p className="text-sm text-gray-700">{selectedOrder.shippingAddress.country}</p>
                      </div>
                    )}

                    <div>
                      <h4 className="font-semibold mb-2">Items</h4>
                      {selectedOrder.products && selectedOrder.products.length > 0 ? (
                        <div className="space-y-2">
                          {selectedOrder.products.map((p, idx) => (
                            <div key={idx} className="flex justify-between items-center border-b pb-2">
                              <div>
                                <div className="font-medium">{p.name}</div>
                                <div className="text-sm text-gray-500">Size: {p.size || 'N/A'} • Color: {p.color || 'N/A'}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">₹{p.price}</div>
                                <div className="text-sm text-gray-500">Qty: {p.quantity}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-700">No product details available.</div>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="text-sm text-gray-600">Placed on: {new Date(selectedOrder.createdAt || selectedOrder.date || selectedOrder.updatedAt).toLocaleString()}</div>
                      <div className="text-lg font-bold">Total: ₹{Number(selectedOrder.amount || 0).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Saved Addresses</h2>
                {addresses.length === 0 ? (
                  <div>No saved addresses.</div>
                ) : (
                  <div className="space-y-4">
                    {addresses.map((a, i) => (
                      <div key={a.id || i} className="border rounded p-4">
                        <div className="font-medium">{a.label || a.name || `Address ${i+1}`}</div>
                        <div className="text-sm text-gray-700">{a.address || a.line1 || ''}</div>
                        <div className="text-sm text-gray-500">
                          {a.city || ''} {a.state || ''} {a.postalCode || ''}
                        </div>
                        {(a.email || a.phone) && (
                          <div className="text-sm text-gray-500 mt-1">
                            {a.email} {a.phone && `| ${a.phone}`}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
