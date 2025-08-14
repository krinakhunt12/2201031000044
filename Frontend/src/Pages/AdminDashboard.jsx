import React, { useState } from 'react';
import { 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  ChevronDown,
  Settings,
  LogOut,
  User,
  Bell,
  MessageSquare
} from 'lucide-react';
import Overview from '../components/Admin/Overview';
import Products from '../components/Admin/Products';
import Orders from '../components/Admin/Orders';
import Users from '../components/Admin/Users';
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [stats] = useState({
    totalUsers: 1247,
    totalProducts: 89,
    totalOrders: 156,
    revenue: 125000,
    newUsers: 32,
    conversionRate: '4.2%',
    avgOrderValue: 801.28
  });

  const [products, setProducts] = useState([
    { id: 1, name: "Premium Black Tee", category: "T-Shirts", price: 1299, stock: 45, status: "active", sales: 124 },
    { id: 2, name: "Classic White Tee", category: "T-Shirts", price: 999, stock: 32, status: "active", sales: 89 },
    { id: 3, name: "Slim Fit Jeans", category: "Pants", price: 1999, stock: 12, status: "low stock", sales: 42 },
    { id: 4, name: "Canvas Sneakers", category: "Footwear", price: 1599, stock: 8, status: "low stock", sales: 67 },
    { id: 5, name: "Denim Jacket", category: "Outerwear", price: 2499, stock: 0, status: "out of stock", sales: 23 },
  ]);

  const [orders] = useState([
    { id: "ORD001", customer: "John Doe", amount: 2498, status: "pending", date: "2024-01-15", items: 2, payment: "Credit Card" },
    { id: "ORD002", customer: "Jane Smith", amount: 1799, status: "shipped", date: "2024-01-14", items: 1, payment: "PayPal" },
    { id: "ORD003", customer: "Robert Johnson", amount: 3297, status: "delivered", date: "2024-01-12", items: 3, payment: "Credit Card" },
    { id: "ORD004", customer: "Emily Davis", amount: 999, status: "pending", date: "2024-01-16", items: 1, payment: "Cash on Delivery" },
  ]);

  const [users] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", status: "active", joinDate: "2024-01-01", role: "customer", lastActive: "2 hours ago" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "active", joinDate: "2024-01-02", role: "customer", lastActive: "1 day ago" },
    { id: 3, name: "Admin User", email: "admin@example.com", status: "active", joinDate: "2023-12-15", role: "admin", lastActive: "30 minutes ago" },
    { id: 4, name: "Inactive User", email: "inactive@example.com", status: "inactive", joinDate: "2023-11-20", role: "customer", lastActive: "1 month ago" },
  ]);

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

  const filteredProducts = sortedProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
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
    switch (role) {
      case 'admin': return 'bg-indigo-100 text-indigo-800';
      case 'customer': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button 
                className="md:hidden mr-2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="w-5 h-5" />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg overflow-hidden z-10">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b bg-gray-50">
                        <p className="text-sm font-medium text-gray-700">Notifications</p>
                      </div>
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`px-4 py-3 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                        >
                          <p className="text-sm text-gray-700">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                      <div className="px-4 py-2 border-t bg-gray-50 text-center">
                        <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800">View all</a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="hidden md:inline text-sm font-medium text-gray-700">Admin</span>
                  <ChevronDown className="hidden md:inline w-4 h-4 text-gray-500" />
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <User className="inline w-4 h-4 mr-2" /> Profile
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Settings className="inline w-4 h-4 mr-2" /> Settings
                    </a>
                    <div className="border-t border-gray-100"></div>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <LogOut className="inline w-4 h-4 mr-2" /> Sign out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <nav className="flex flex-col space-y-2">
              {[
                { id: 'overview', label: 'Overview', icon: TrendingUp },
                { id: 'products', label: 'Products', icon: Package },
                { id: 'orders', label: 'Orders', icon: ShoppingCart },
                { id: 'users', label: 'Users', icon: User },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setShowMobileMenu(false);
                    }}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-black text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-2 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'orders', label: 'Orders', icon: ShoppingCart },
            { id: 'users', label: 'Users', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {activeTab === 'overview' && (
            <Overview stats={stats} orders={orders}/>
          )}

          {activeTab === 'products' && (
<Products searchQuery={searchQuery}
setSearchQuery={setSearchQuery}
filteredProducts={filteredProducts}
sortConfig={sortConfig}
handleSort={handleSort}
getStatusColor={getStatusColor}/>
          )}

          {activeTab === 'orders' && (
        <Orders searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        filteredOrders={filteredOrders} getStatusColor={getStatusColor}/>
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
    </div>
  );
};

export default AdminDashboard;