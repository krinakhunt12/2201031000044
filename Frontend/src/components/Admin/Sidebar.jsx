import React from 'react';
import { Package, ShoppingCart, TrendingUp, User, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'users', label: 'Users', icon: User },
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 h-screen fixed border-r border-gray-200 bg-white shadow-sm">
        {/* Sidebar Header */}
        <div className="px-6 py-5 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <span className="bg-blue-100 text-blue-800 rounded-lg w-9 h-9 flex items-center justify-center mr-3">
              A
            </span>
            Admin
          </h1>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 shadow-xs'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${
                      activeTab === tab.id ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
                    }`}
                  />
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-blue-500"></span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center mb-3">
            <div className="relative">
              <img 
                className="w-10 h-10 rounded-full border-2 border-white shadow-xs" 
                src="https://randomuser.me/api/portraits/women/44.jpg" 
                alt="Admin user"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-50"></span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">Sarah Johnson</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
          <div className="space-y-1">
            <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-4 h-4 mr-3 text-gray-400" />
              Settings
            </button>
            <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <LogOut className="w-4 h-4 mr-3 text-gray-400" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;