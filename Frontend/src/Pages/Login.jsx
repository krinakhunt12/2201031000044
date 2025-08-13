import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Modal from '../components/ui/Modal';

const Login = ({ isOpen, onClose, handleSwitchMode }) => {
  const [loginFormData, setLoginFormData] = useState({
    emailOrPhone: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginFormData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        alert('✅ Login successful!');
        onClose();
        window.location.reload();
      } else {
        alert(data.message || '❌ Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('⚠️ Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Welcome back" size="md">
      <div className="w-full max-w-md mx-auto">
        {/* Header Message */}
        <div className="text-center mb-6">
          <p className="text-gray-600">Sign in to your Stylon account</p>
        </div>

        {/* Google Button */}
        <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 px-4 font-medium hover:bg-gray-50 transition-colors mb-6">
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
          {/* Email or Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address or Mobile number
            </label>
            <input
              name="emailOrPhone"
              type="text"
              required
              value={loginFormData.emailOrPhone}
              onChange={handleLoginInputChange}
              placeholder="Enter your email or phone"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
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
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent pr-12"
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
            className="w-full py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-black text-white hover:bg-gray-800"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

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
