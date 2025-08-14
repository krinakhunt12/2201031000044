import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../features/auth/authSlice';
import { useToast } from './ToastContext';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const isAuthenticated = !!user;
  const isAdmin = user?.isAdmin || false;

  const login = (userData) => {
    setUser(userData);
    showSuccess(`Welcome back, ${userData.name}!`);
    closeAuthModal();
  };

  const signup = (userData) => {
    setUser(userData);
    showSuccess(`Welcome to our platform, ${userData.name}!`);
    closeAuthModal();
  };

  const logout = () => {
    setUser(null);
    dispatch(logout());
    showSuccess('Logged out successfully');
    navigate('/');
  };

  const openLoginModal = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const openSignUpModal = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        showAuthModal,
        authMode,
        login,
        signup,
        logout,
        openLoginModal,
        openSignUpModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};