import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Modal from '../components/ui/Modal';

const SignUp = ({
  isOpen,
  onClose,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  signupFormData,
  handleSignupInputChange,
  handleSignupSubmit,
  isLoading,
  handleSwitchMode,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create account"
      size="md"
    >
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <p className="text-gray-600">Join Stylon and start shopping</p>
        </div>

        {/* Google Button */}
        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 px-4 font-medium hover:bg-gray-50 transition-colors mb-6">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center mb-4">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="mx-4 text-sm text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignupSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              required
              value={signupFormData.name}
              onChange={handleSignupInputChange}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          {/* Email or Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address or Mobile number
            </label>
            <input
              name="emailOrPhone"
              type="text"
              required
              value={signupFormData.emailOrPhone}
              onChange={handleSignupInputChange}
              placeholder="Enter your email or mobile number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={signupFormData.password}
                onChange={handleSignupInputChange}
                placeholder="Create a password"
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={signupFormData.confirmPassword}
                onChange={handleSignupInputChange}
                placeholder="Confirm your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent pr-12"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              required
              className="mt-1 h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
            />
            <label className="text-sm text-gray-600">
              I agree to the{' '}
              <button type="button" className="text-black font-medium hover:underline">
                Terms of Service
              </button>{' '}
              and{' '}
              <button type="button" className="text-black font-medium hover:underline">
                Privacy Policy
              </button>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        {/* Switch to Login */}
        <div className="text-center mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={handleSwitchMode}
              className="text-black font-medium hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default SignUp;
