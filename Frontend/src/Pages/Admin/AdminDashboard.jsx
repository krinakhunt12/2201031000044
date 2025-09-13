import React, { useState, useEffect } from 'react';
import { productAPI, orderAPI } from "../../services/api";
import { 
  Package, 
  ShoppingCart, 
  TrendingUp, 
   User as UserIcon,
  ChevronDown,
  Settings,
  LogOut,
  Bell,
    Menu,
} from 'lucide-react';
import Overview from '../../components/Admin/Overview';
import Products from '../../components/Admin/Products';
import Orders from '../../components/Admin/Orders';
import Users from '../../components/Admin/Users';
import Sidebar from '../../components/Admin/Sidebar';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching dashboard data...');

        // Fetch products using productAPI
        const productsRes = await productAPI.getAllProducts();
        console.log('Products response:', productsRes);

        // Fetch orders using orderAPI
        let ordersData = [];
        try {
          const ordersRes = await orderAPI.getAllOrders();
          console.log('Orders response:', ordersRes);
          ordersData = ordersRes.orders || [];
        } catch (orderError) {
          console.error('Error fetching orders:', orderError);
          // Use mock data if orders API fails
          ordersData = [
            { 
              _id: 'ORD001', 
              customer: 'John Doe', 
              status: 'delivered', 
              amount: 2498, 
              date: '2024-01-15',
              email: 'john@example.com',
              items: 'T-Shirt, Jeans',
              quantity: 2,
              payment: 'Credit Card',
              time: '10:30 AM'
            },
            { 
              _id: 'ORD002', 
              customer: 'Jane Smith', 
              status: 'shipped', 
              amount: 1899, 
              date: '2024-01-14',
              email: 'jane@example.com',
              items: 'Dress',
              quantity: 1,
              payment: 'PayPal',
              time: '2:15 PM'
            },
            { 
              _id: 'ORD003', 
              customer: 'Mike Johnson', 
              status: 'pending', 
              amount: 3200, 
              date: '2024-01-13',
              email: 'mike@example.com',
              items: 'Jacket, Shoes',
              quantity: 2,
              payment: 'Credit Card',
              time: '4:45 PM'
            },
          ];
        }

        // Transform orders data for display
        const transformedOrders = ordersData.map(order => ({
          ...order,
          id: order._id,
          customer: order.customer || 'Unknown Customer',
          email: order.email || 'No email provided',
          items: order.products?.map(p => p.name).join(', ') || order.items || 'Unknown items',
          quantity: order.products?.reduce((sum, p) => sum + p.quantity, 0) || order.quantity || 1,
          payment: order.payment || 'Unknown',
          date: new Date(order.date || order.createdAt).toLocaleDateString(),
          time: new Date(order.date || order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          amount: order.amount || 0
        }));

        // Deduplicate products by _id (safety-net in case duplicates exist)
        const uniqueProductsMap = new Map();
        (productsRes.products || []).forEach(p => {
          if (p && (p._id || p.id)) {
            uniqueProductsMap.set(p._id || p.id, p);
          }
        });
        const uniqueProducts = Array.from(uniqueProductsMap.values());

        // Calculate stats from real data
        const stats = {
          totalUsers: 150, // Keep mock for now
          totalProducts: uniqueProducts.length || 0,
          totalOrders: transformedOrders.length,
          revenue: transformedOrders.reduce((sum, order) => sum + (order.amount || 0), 0),
          newUsers: 12, // Keep mock for now
          conversionRate: '3.2%', // Keep mock for now
          avgOrderValue: transformedOrders.length > 0 
            ? (transformedOrders.reduce((sum, order) => sum + (order.amount || 0), 0) / transformedOrders.length).toFixed(2)
            : '0'
        };

        const mockUsers = [
          { _id: '1', name: 'John Doe', email: 'john@example.com', role: 'customer' },
          { _id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'customer' },
          { _id: '3', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
        ];

  setStats(stats);
  setProducts(uniqueProducts);
        setOrders(transformedOrders);
        setUsers(mockUsers);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load dashboard data');
        
        // Set fallback data
        setStats({
          totalUsers: 0,
          totalProducts: 0,
          totalOrders: 0,
          revenue: 0,
          newUsers: 0,
          conversionRate: '0%',
          avgOrderValue: '0'
        });
        setProducts([]);
        setOrders([]);
        setUsers([]);
      }
      setLoading(false);
    };

    fetchData();
    const onAdminUpdate = () => fetchData();
    window.addEventListener('adminDataUpdated', onAdminUpdate);
    return () => window.removeEventListener('adminDataUpdated', onAdminUpdate);
  }, []);

  const [notifications] = useState([
    { id: 1, message: "New order received from John Doe", time: "10 mins ago", read: false },
    { id: 2, message: "Payment of ₹2498 received for ORD001", time: "1 hour ago", read: true },
    { id: 3, message: "Inventory low for Slim Fit Jeans", time: "2 days ago", read: true },
  ]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOrders = orders.filter(order =>
    order._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.status?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-purple-100 text-purple-800';
      case 'low stock': return 'bg-orange-100 text-orange-800';
      case 'out of stock': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin': return 'bg-indigo-100 text-indigo-800';
      case 'customer': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-lg">Loading dashboard...</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-red-50 text-lg text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex">
      {/* Mobile sidebar overlay */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="fixed inset-0 bg-gray-700 bg-opacity-70" onClick={() => setShowMobileMenu(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white rounded-r-2xl shadow-2xl">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setShowMobileMenu(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <svg className="h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {[
                  { id: 'overview', label: 'Overview', icon: TrendingUp },
                  { id: 'products', label: 'Products', icon: Package },
                  { id: 'orders', label: 'Orders', icon: ShoppingCart },
                  { id: 'users', label: 'Users', icon: UserIcon },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setShowMobileMenu(false);
                      }}
                      className={`group flex items-center px-2 py-2 text-base font-medium rounded-md w-full transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gray-100 text-gray-900 shadow'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon
                        className={`mr-4 flex-shrink-0 h-6 w-6 ${
                          activeTab === tab.id ? 'text-blue-500' : 'text-gray-400 group-hover:text-blue-500'
                        }`}
                      />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar - now fixed */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main content area with margin for fixed sidebar */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Header */}
        <header className="bg-white shadow-md border-b sticky top-0 z-10 rounded-b-xl">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button 
                  className="md:hidden mr-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowMobileMenu(true)}
                >
                  <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900 capitalize tracking-tight">{activeTab}</h1>
              </div>
              {/* ... (keep your existing header content) ... */}
            </div>
          </div>
        </header>

        {/* Scrollable main content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-white to-gray-100">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              {activeTab === 'overview' && stats && (
                <Overview stats={stats} orders={orders}/>
              )}

              {activeTab === 'products' && (
                <Products 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  filteredProducts={filteredProducts}
                  sortConfig={sortConfig}
                  handleSort={handleSort}
                  getStatusColor={getStatusColor}
                />
              )}

              {activeTab === 'orders' && (
                <Orders 
                  searchQuery={searchQuery} 
                  setSearchQuery={setSearchQuery}
                  filteredOrders={filteredOrders} 
                  getStatusColor={getStatusColor}
                />
              )}

              {activeTab === 'users' && (
                <Users 
                  searchQuery={searchQuery} 
                  setSearchQuery={setSearchQuery} 
                  filteredUsers={filteredUsers} 
                  getStatusColor={getStatusColor} 
                  getRoleColor={getRoleColor}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;