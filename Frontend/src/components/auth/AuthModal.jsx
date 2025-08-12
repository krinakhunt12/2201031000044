import React, { useState } from 'react';
import Modal from '../ui/Modal';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSuccess = () => {
    onClose();
  };

  const handleSwitchMode = () => {
    if (mode === 'login') {
      setMode('signup');
    } else {
      setMode('login');
    }
  };

  const handleSwitchToAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  const getModalTitle = () => {
    if (mode === 'login') {
      return isAdmin ? 'Admin Login' : 'Sign In';
    }
    return 'Create Account';
  };

  const getModalSize = () => {
    return isAdmin ? 'lg' : 'md';
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={getModalTitle()}
      size={getModalSize()}
    >
      {mode === 'login' ? (
        <LoginForm
          isAdmin={isAdmin}
          onSuccess={handleSuccess}
          onSwitchMode={handleSwitchToAdmin}
        />
      ) : (
        <SignUpForm
          onSuccess={handleSuccess}
          onSwitchToLogin={handleSwitchMode}
        />
      )}
      
      {/* Mode Switch Button */}
      <div className="text-center mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={handleSwitchMode}
            className="text-black font-medium hover:underline"
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </Modal>
  );
};

export default AuthModal;
