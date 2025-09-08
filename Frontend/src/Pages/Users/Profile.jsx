import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Edit, LogOut } from 'lucide-react';
import { useAppSelector } from '../../store/hooks';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../contexts/ToastContext';
import Navbar from '../../components/Users/Navbar';
import Footer from '../../components/Users/Footer';
import { orderAPI } from '../../services/api';
import AddressCard from '../../components/Users/Profile/AddressCard';
const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [originalProfile, setOriginalProfile] = useState(null);
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

  // Deduplicate addresses for display (by id/address/label fallback)
  const uniqueAddresses = useMemo(() => {
    if (!Array.isArray(addresses)) return [];
    const seen = new Set();
    const normalize = (s = '') =>
      s
        .toString()
        .toLowerCase()
        .replace(/[.,]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    return addresses.filter((a) => {
      if (!a || typeof a !== 'object') return false;
      const parts = [
        a.address, // full address
        a.line1,
        a.line2,
        a.city,
        a.state,
        a.postalCode,
        a.label,
        a.name,
        a.email,
        a.phone
      ];
      const key = normalize(parts.filter(Boolean).join(' | '));
      if (!key) return false;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [addresses]);

  // wishlist from redux for dynamic count
  const { items: wishlistItems } = useAppSelector(state => state.wishlist || { items: [] });

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
    try {
      // Preserve savedAddresses across logout
      const savedAddresses = localStorage.getItem('savedAddresses');
      // remove sensitive/user-specific keys but keep savedAddresses
      const keep = { savedAddresses };
      // Clear everything then restore preserved keys
      localStorage.clear();
      if (keep.savedAddresses) localStorage.setItem('savedAddresses', keep.savedAddresses);
      sessionStorage.clear();
    } catch (e) {
      console.warn('Failed to clear storage on logout', e);
    }
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

  // Helpers for stats
  const getOrderAmount = (o) => {
    return Number(o.amount || o.total || o.totalAmount || o.orderTotal || 0) || 0;
  };

  const statusBadgeClass = (status) => {
    if (!status) return 'bg-gray-100 text-gray-700';
    const s = status.toString().toLowerCase();
    if (s.includes('deliv') || s.includes('delivered')) return 'bg-green-100 text-green-800';
    if (s.includes('paid')) return 'bg-green-50 text-green-800';
    if (s.includes('ship') || s.includes('shipped')) return 'bg-blue-100 text-blue-800';
    if (s.includes('cancel')) return 'bg-red-100 text-red-800';
    if (s.includes('failed') || s.includes('payment failed')) return 'bg-red-50 text-red-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  const ordersCount = orders.length;
  const wishlistCount = Array.isArray(wishlistItems) ? wishlistItems.length : 0;
  const totalSpent = orders.reduce((sum, o) => sum + getOrderAmount(o), 0);

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
      // Primary approach: fetch all orders from backend and filter by logged-in user
      let allOrders = [];
      try {
        const allOrdersRes = await orderAPI.getAllOrders();
        if (allOrdersRes) {
          if (Array.isArray(allOrdersRes)) allOrders = allOrdersRes;
          else if (allOrdersRes.success && Array.isArray(allOrdersRes.orders)) allOrders = allOrdersRes.orders;
          else if (Array.isArray(allOrdersRes.orders)) allOrders = allOrdersRes.orders;
        }
      } catch (e) {
        // If listing all orders is restricted, fall back to the authenticated user's orders endpoint
        try {
          const mine = await orderAPI.getMyOrders();
          if (mine) {
            if (Array.isArray(mine)) allOrders = mine;
            else if (mine.success && Array.isArray(mine.orders)) allOrders = mine.orders;
            else if (Array.isArray(mine.orders)) allOrders = mine.orders;
          }
        } catch (e2) {
          // swallow - we'll still try to merge any local orders
          console.warn('Failed to fetch orders via getAllOrders and getMyOrders', e, e2);
        }
      }

      // normalize user keys
      const matchEmail = (user && (user.email || user.emailOrPhone) || '').toString().toLowerCase();
      const matchName = (user && (user.name || user.fullName) || '').toString().toLowerCase();
      const matchPhone = (user && user.phone || '').toString().toLowerCase();

      const filtered = allOrders.filter(order => {
        try {
          const oemail = (order.email || '').toString().toLowerCase();
          const ocust = (order.customer || '').toString().toLowerCase();
          const ophone = (order.phoneNumber || order.phone || '').toString().toLowerCase();
          if (matchEmail && oemail && oemail === matchEmail) return true;
          if (matchPhone && ophone && ophone === matchPhone) return true;
          if (matchName && ocust && ocust.includes(matchName)) return true;
          return false;
        } catch (e) { return false; }
      });

      // If backend returned nothing for this user, still try merging any local orders for resilience
      const localMatches = [];
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (!key || !key.startsWith('orders_')) continue;
          try {
            const arr = JSON.parse(localStorage.getItem(key) || '[]');
            if (!Array.isArray(arr)) continue;
            arr.forEach(o => {
              try {
                const oid = o._id || o.id || o.orderId;
                const exists = filtered.some(f => (f._id || f.id || f.orderId) === oid);
                if (!exists) {
                  const oemail = (o.email || o.orderEmail || '').toString().toLowerCase();
                  const ocust = (o.customer || '').toString().toLowerCase();
                  const ophone = (o.phoneNumber || o.phone || '').toString().toLowerCase();
                  if ((matchEmail && oemail === matchEmail) || (matchName && ocust && ocust.includes(matchName)) || (matchPhone && ophone === matchPhone)) {
                    localMatches.push(o);
                  }
                }
              } catch (e) {}
            });
          } catch (e) {}
        }
      } catch (e) {}

      const merged = [...localMatches, ...filtered];
      setOrders(merged);
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

  // Also fetch orders once when user becomes available so profile stats show up without opening Orders tab
  useEffect(() => {
    if (!user) return;
    // don't force open the Orders tab UI, just load orders for stats
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
                <button
                  onClick={() => {
                    setOriginalProfile(profileData);
                    setIsEditing(true);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>

            {/* Profile Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{ordersCount}</div>
                <div className="text-sm text-gray-600">Orders</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{wishlistCount}</div>
                <div className="text-sm text-gray-600">Wishlist Items</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">₹{totalSpent.toLocaleString()}</div>
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
                <div className="text-gray-900">{profileData.firstName}</div>
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <div className="text-gray-900">{profileData.lastName}</div>
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
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <div className="text-gray-900">{profileData.phone}</div>
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <div className="text-gray-900">{profileData.dateOfBirth}</div>
              </div>

              {/* Address removed from Personal Information (moved to Addresses tab) */}
            </div>
          </div>

          {/* Edit Profile Modal */}
          {isEditing && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
              <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }} className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Edit Profile</h3>
                  <button onClick={() => { setProfileData(originalProfile || profileData); setIsEditing(false); }} className="text-gray-500 hover:text-gray-800">Close</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input name="firstName" value={profileData.firstName} onChange={handleInputChange} className="w-full mt-1 border border-gray-300 rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input name="lastName" value={profileData.lastName} onChange={handleInputChange} className="w-full mt-1 border border-gray-300 rounded px-3 py-2" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input name="email" value={profileData.email} onChange={handleInputChange} className="w-full mt-1 border border-gray-300 rounded px-3 py-2" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input name="phone" value={profileData.phone} onChange={handleInputChange} className="w-full mt-1 border border-gray-300 rounded px-3 py-2" />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button onClick={() => { setProfileData(originalProfile || profileData); setIsEditing(false); }} className="px-4 py-2 bg-gray-100 rounded-md">Cancel</button>
                  <button onClick={() => { handleSave(); setIsEditing(false); }} className="px-4 py-2 bg-black text-white rounded-md">Save changes</button>
                </div>
              </motion.div>
            </div>
          )}

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
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-auto max-h-[90vh]">
                  <div className="p-4 border-b flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">Order Details</h3>
                      <div className="text-sm text-gray-500">#{selectedOrder._id || selectedOrder.id}</div>
                    </div>
                    <div className="ml-auto text-right">
                      <div className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${statusBadgeClass(selectedOrder.status)}`}>
                        {selectedOrder.status || 'Pending'}
                      </div>
                      <div className="text-xs text-gray-500 mt-2">{new Date(selectedOrder.createdAt || selectedOrder.date || selectedOrder.updatedAt).toLocaleString()}</div>
                    </div>
                    <button onClick={() => { setShowOrderModal(false); setSelectedOrder(null); }} className="text-gray-600 hover:text-gray-900">Close</button>
                  </div>

                  <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                      <div className="bg-gray-50 p-4 rounded">
                        <h4 className="font-semibold mb-2">Shipping</h4>
                        <div className="text-sm text-gray-700">{selectedOrder.shippingAddress?.street}</div>
                        <div className="text-sm text-gray-700">{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} {selectedOrder.shippingAddress?.postalCode}</div>
                        <div className="text-sm text-gray-700">{selectedOrder.shippingAddress?.country}</div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Items</h4>
                        {selectedOrder.products && selectedOrder.products.length > 0 ? (
                          <div className="space-y-3">
                            {selectedOrder.products.map((p, idx) => (
                              <div key={idx} className="flex items-center justify-between border rounded p-3">
                                <div className="flex items-center gap-4">
                                  <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                                    {p.photo ? <img src={p.photo} alt={p.name} className="w-full h-full object-cover" /> : <div className="text-xs text-gray-400">No Image</div>}
                                  </div>
                                  <div>
                                    <div className="font-medium">{p.name}</div>
                                    <div className="text-sm text-gray-500">Size: {p.size || 'N/A'} • Color: {p.color || 'N/A'}</div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-semibold">₹{p.price}</div>
                                  <div className="text-sm text-gray-500">Qty: {p.quantity}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-700">No product details available.</div>
                        )}
                      </div>
                    </div>

                    <aside className="bg-white border rounded p-4">
                      <h4 className="font-semibold mb-2">Summary</h4>
                      <div className="text-sm text-gray-600">Payment: {selectedOrder.payment || '—'}</div>
                      {selectedOrder.paymentIntentId && <div className="text-sm text-gray-600">Payment ID: {selectedOrder.paymentIntentId}</div>}
                      <div className="mt-4 text-lg font-bold">Total: ₹{Number(selectedOrder.amount || 0).toLocaleString()}</div>
                    </aside>
                  </div>
                </motion.div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Saved Addresses</h2>
                {uniqueAddresses.length === 0 ? (
                  <div>No saved addresses.</div>
                ) : (
                  <div className="space-y-4">
                    {uniqueAddresses.map((a, i) => (
                      <AddressCard key={a.id || i} a={a} index={i} />
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
