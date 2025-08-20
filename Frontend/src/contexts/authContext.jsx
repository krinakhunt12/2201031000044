import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ToastContext';
import { useDispatch } from 'react-redux';
import { clearCart, addToCart } from '../features/cart/cartSlice';
import { clearWishlist, addToWishlist } from '../features/wishlist/wishlistSlice';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage if available
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const dispatch = useDispatch();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const navigate = useNavigate();
  const { showSuccess } = useToast();

  const isAuthenticated = !!user;
  const isAdmin = user?.isAdmin || false;

  const login = (userData, token) => {
    setUser(userData);
    if (token) localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    // Use emailOrPhone for keys
    const cartKey = `cart_${userData.emailOrPhone}`;
    const wishlistKey = `wishlist_${userData.emailOrPhone}`;
    // Load cart
    const savedCart = localStorage.getItem(cartKey);
    dispatch(clearCart());
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart);
        items.forEach(item => dispatch(addToCart(item)));
      } catch {}
    }
    // Load wishlist
    const savedWishlist = localStorage.getItem(wishlistKey);
    dispatch(clearWishlist());
    if (savedWishlist) {
      try {
        const items = JSON.parse(savedWishlist);
        items.forEach(item => dispatch(addToWishlist(item)));
      } catch {}
    }
    showSuccess(`Welcome back, ${userData.name}!`);
    closeAuthModal();
  };

  const signup = (userData, token) => {
    setUser(userData);
    if (token) localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    // Use emailOrPhone for keys
    const cartKey = `cart_${userData.emailOrPhone}`;
    const wishlistKey = `wishlist_${userData.emailOrPhone}`;
    // Load cart
    const savedCart = localStorage.getItem(cartKey);
    dispatch(clearCart());
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart);
        items.forEach(item => dispatch(addToCart(item)));
      } catch {}
    }
    // Load wishlist
    const savedWishlist = localStorage.getItem(wishlistKey);
    dispatch(clearWishlist());
    if (savedWishlist) {
      try {
        const items = JSON.parse(savedWishlist);
        items.forEach(item => dispatch(addToWishlist(item)));
      } catch {}
    }
    showSuccess(`Welcome to Stylon, ${userData.name}!`);
    closeAuthModal();
  };

  const logout = () => {
    if (user && user.emailOrPhone) {
      const cartKey = `cart_${user.emailOrPhone}`;
      const wishlistKey = `wishlist_${user.emailOrPhone}`;
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
      const wishlistItems = JSON.parse(localStorage.getItem(`wishlist_${user.emailOrPhone}`)) || [];
      localStorage.setItem(wishlistKey, JSON.stringify(wishlistItems));
    }
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    dispatch(clearCart());
    dispatch(clearWishlist());
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

