import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

const ProfileMenu = ({ user, showMenu, onLogout, isAdmin }) => {
  if (!showMenu) return null;

  return (
    <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-xl border border-gray-100">
      <div className="px-4 py-2 border-b border-gray-100">
        <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
        <p className="text-xs text-gray-500">{user?.email || ''}</p>
      </div>
      <Link
        to="/profile"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        Profile Settings
      </Link>
      <Link
        to="/orders"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        My Orders
      </Link>
      {isAdmin && (
        <Link
          to="/admin"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          Admin Dashboard
        </Link>
      )}
      <button
        onClick={onLogout}
        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </button>
    </div>
  );
};

export default ProfileMenu;
