import React, { useState } from 'react';
import { Eye, EyeOff, Shield, User, Lock, Mail } from 'lucide-react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const res = await fetch(
      `http://localhost:5000/admin/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }
    );

    const data = await res.json();

    if (res.ok) {
      // Save admin info in local storage (session-based could be better)
      localStorage.setItem('adminInfo', JSON.stringify(data.admin));
      
      alert('✅ Admin login successful!');
      window.location.href = '/admin/dashboard';
    } else {
      alert(data.message || '❌ Admin login failed');
    }
  } catch (err) {
    console.error('Admin login error:', err);
    alert('⚠️ Something went wrong. Please try again.');
  } finally {
    setIsLoading(false);
  }
};


  const handleGoogleSignIn = () => {
    alert('🔐 Google sign-in for admin will be implemented here.');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">


      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-2xl shadow-blue-100/50">
            {/* Header with Icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded-2xl mb-4 shadow-lg shadow-blue-200/50">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Portal</h1>
              <p className="text-gray-600">Secure access to your dashboard</p>
            
            </div>

            {/* Google Sign-in Button */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full group relative overflow-hidden bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 mb-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-gray-100"
            >
              <div className="flex items-center justify-center gap-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center border border-gray-100">
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-4 h-4"
                  />
                </div>
                <span className="font-medium text-gray-700">Continue with Google</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/50 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>

            {/* Divider */}
            <div className="flex items-center mb-6">
              <div className="flex-grow h-px bg-gray-200"></div>
              <span className="mx-4 text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-100">or continue with email</span>
              <div className="flex-grow h-px bg-gray-200"></div>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                    <Mail className={`w-5 h-5 transition-colors duration-200 ${
                      focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    placeholder="Enter your admin email"
                    className="w-full bg-white/70 border border-gray-200 rounded-2xl pl-12 pr-4 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-200 backdrop-blur-sm"
                  />
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-100/50 to-purple-100/50 opacity-0 transition-opacity duration-200 pointer-events-none ${
                    focusedField === 'email' ? 'opacity-100' : ''
                  }`}></div>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                    <Lock className={`w-5 h-5 transition-colors duration-200 ${
                      focusedField === 'password' ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                  </div>
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    placeholder="Enter your password"
                    className="w-full bg-white/70 border border-gray-200 rounded-2xl pl-12 pr-14 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-200 backdrop-blur-sm"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-100/50 to-purple-100/50 opacity-0 transition-opacity duration-200 pointer-events-none ${
                    focusedField === 'password' ? 'opacity-100' : ''
                  }`}></div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full relative overflow-hidden bg-gradient-to-r from-gray-400 to-gray-600 rounded-2xl py-4 px-6 font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-200/50 group"
              >
                <div className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      <span>Access Dashboard</span>
                    </>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-gray-500 text-sm">
                Secured by enterprise-grade encryption
              </p>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              Protected by advanced security protocols
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;