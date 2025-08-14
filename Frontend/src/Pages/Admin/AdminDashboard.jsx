import React, { useState } from 'react';
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
  <div className="min-h-screen bg-gray-50 flex">
    {/* Mobile sidebar overlay */}
    {showMobileMenu && (
      <div className="md:hidden fixed inset-0 z-40">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setShowMobileMenu(false)}></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setShowMobileMenu(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
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
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md w-full ${
                      activeTab === tab.id
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon
                      className={`mr-4 flex-shrink-0 h-6 w-6 ${
                        activeTab === tab.id ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'
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
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button 
                className="md:hidden mr-2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowMobileMenu(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900 capitalize">{activeTab}</h1>
            </div>
            
            {/* ... (keep your existing header content) ... */}
          </div>
        </div>
      </header>

      {/* Scrollable main content */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {activeTab === 'overview' && (
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