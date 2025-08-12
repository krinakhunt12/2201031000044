import { useState } from 'react';
import { useAppSelector } from '../store/hooks';

export const useAuth = () => {
  const { isAuthenticated, user, isAdmin } = useAppSelector(state => state.auth);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

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

  return {
    isAuthenticated,
    user,
    isAdmin,
    showAuthModal,
    authMode,
    openLoginModal,
    openSignUpModal,
    closeAuthModal,
  };
};
