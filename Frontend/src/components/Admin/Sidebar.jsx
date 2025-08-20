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
      <div className="flex flex-col w-64 h-screen fixed border-r border-gray-200 bg-gradient-to-br from-white to-gray-100 shadow-xl rounded-r-2xl">
        {/* Sidebar Header */}
        <div className="px-6 py-8 border-b border-gray-100 flex items-center justify-between">
          <img src="/Stylon.png" alt="Logo" className="h-10 w-auto rounded-xl shadow" />
          <span className="font-extrabold text-xl text-gray-900 tracking-tight">Stylon Admin</span>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-8 px-4">
          <nav className="space-y-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-5 py-3 rounded-xl font-semibold text-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 shadow-lg scale-[1.03]'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <Icon className={`mr-4 h-6 w-6 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}`} />
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
  <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center mb-4">
            <div className="relative">
              <img 
                className="w-12 h-12 rounded-full border-2 border-white shadow-lg" 
                src="https://randomuser.me/api/portraits/women/44.jpg" 
                alt="Admin user"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-50"></span>
            </div>
            <div className="ml-4">
              <p className="text-base font-semibold text-gray-800">Sarah Johnson</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
          <div className="space-y-2">
            <button className="flex items-center w-full px-4 py-2 text-base font-medium text-gray-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Settings className="w-5 h-5 mr-3 text-gray-400" />
              Settings
            </button>
            <button className="flex items-center w-full px-4 py-2 text-base font-medium text-gray-600 hover:bg-blue-50 rounded-lg transition-colors">
              <LogOut className="w-5 h-5 mr-3 text-gray-400" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;