import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Modal from '../components/ui/Modal';

const Login = ({
  isOpen,
  onClose,
  isAdmin,
  showPassword,
  setShowPassword,
  loginFormData,
  handleLoginInputChange,
  handleLoginSubmit,
  isLoading,
  handleSwitchToAdmin,
  handleSwitchMode,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isAdmin ? 'Admin Login' : 'Welcome back'}
      size="md"
    >
      <div className="w-full max-w-md mx-auto">
        {/* Header Message */}
        <div
          className={`text-center mb-6 ${
            isAdmin
              ? 'bg-red-50 p-4 rounded-lg border border-red-200'
              : ''
          }`}
        >
          <h2
            className={`text-2xl font-bold mb-2 ${
              isAdmin ? 'text-red-800' : 'text-gray-900'
            }`}
          >
            {isAdmin ? 'Admin Login' : 'Welcome back'}
          </h2>
          <p
            className={`${
              isAdmin ? 'text-red-600' : 'text-gray-600'
            }`}
          >
            {isAdmin
              ? 'Sign in to your admin account'
              : 'Sign in to your Stylon account'}
          </p>
          {isAdmin && (
            <div className="mt-2 text-xs text-red-500">
              Demo: admin@stylon.com / admin123
            </div>
          )}
        </div>

        {/* Google Button */}
        <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 px-4 font-medium hover:bg-gray-50 transition-colors mb-6">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="mx-4 text-sm text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              name="email"
              type="email"
              required
              value={loginFormData.email}
              onChange={handleLoginInputChange}
              placeholder="Enter your email address"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={loginFormData.password}
                onChange={handleLoginInputChange}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent pr-12"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button type="button" className="text-sm text-gray-600 hover:text-black">
              Forgot your password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
              isAdmin
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* Switch to Admin */}
        <div className="text-center mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            {isAdmin ? 'Need a user account?' : 'Admin login?'}{' '}
            <button
              onClick={handleSwitchToAdmin}
              className="text-black font-medium hover:underline"
            >
              Click here
            </button>
          </p>
        </div>

        {/* Switch to Signup */}
        <div className="text-center mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={handleSwitchMode}
              className="text-black font-medium hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default Login;
