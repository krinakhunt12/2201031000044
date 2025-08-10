import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

const SignUp = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative font-poppins">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-2">Create your account</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Welcome! Please fill in the details to get started.</p>

        {/* Google Auth Button */}
        <button className="w-full flex items-center justify-center gap-2 border rounded-md py-2 font-medium hover:bg-gray-50">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="mx-2 text-sm text-gray-400">or</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>

        {/* Email Input */}
        <div className="mb-3">
          <label className="text-sm font-medium text-gray-700 block mb-1">Email address</label>
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
          />
          <button
            type="button"
            className="absolute top-9 right-3 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Continue Button */}
        <button className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900">
          Continue
        </button>

        {/* Login link */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span className="text-purple-600 font-medium hover:underline cursor-pointer">Sign in</span>
        </p>

        {/* Footer note */}
        <div className="text-center text-xs text-gray-400 mt-4">
          <span className="text-gray-500">Secured by</span> <strong>Stylon Auth</strong>
          <div className="text-orange-500 font-semibold mt-1">Development mode</div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
