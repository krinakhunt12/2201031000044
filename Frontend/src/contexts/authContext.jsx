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
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return null;
      // guard against the string "undefined" or malformed JSON
      if (storedUser === 'undefined' || storedUser === 'null') return null;
      return JSON.parse(storedUser);
    } catch (err) {
      console.warn('Could not parse stored user:', err);
      return null;
    }
  });
  const dispatch = useDispatch();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const navigate = useNavigate();
  const { showSuccess } = useToast();

  const isAuthenticated = !!user;
  const isAdmin = user?.isAdmin || false;

  // Helper to derive a stable identifier for per-user storage keys
  const getUserIdentifier = (u) => {
    if (!u) return null;
    return u.emailOrPhone || u.email || u.id || null;
  };

  const login = (userData, token) => {
    setUser(userData);
    if (token) localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Get current guest cart items (includes any recent changes like removals)
    const currentCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('🔄 Login: Current guest cart items:', currentCartItems.length);
    
  // Use a stable identifier (emailOrPhone, email, or id) for keys
  const identifier = getUserIdentifier(userData);
  const cartKey = identifier ? `cart_${identifier}` : 'cart';
  const wishlistKey = identifier ? `wishlist_${identifier}` : 'wishlist';
    
    // Load user's previously saved cart
    const savedCart = localStorage.getItem(cartKey);
    console.log('💾 Login: Found saved user cart:', !!savedCart);
    
    dispatch(clearCart());
    
    // Smart merge: prioritize current guest cart, then add any missing items from saved cart
    if (savedCart) {
      try {
        const savedItems = JSON.parse(savedCart);
        console.log('📦 Login: Saved cart has', savedItems.length, 'items');
        
        // Start with current guest cart (preserves recent changes like removals)
        const mergedItems = [...currentCartItems];
        
        // Add any items from saved cart that aren't already in guest cart
        savedItems.forEach(savedItem => {
          const exists = mergedItems.some(currentItem => 
            currentItem.id === savedItem.id && 
            currentItem.selectedSize === savedItem.selectedSize
          );
          if (!exists) {
            mergedItems.push(savedItem);
            console.log('➕ Adding saved item to cart:', savedItem.name, savedItem.selectedSize);
          } else {
            console.log('⏭️ Skipping saved item (already in guest cart):', savedItem.name, savedItem.selectedSize);
          }
        });
        
        console.log('🔀 Final merged cart has', mergedItems.length, 'items');
        mergedItems.forEach(item => dispatch(addToCart(item)));
      } catch (error) {
        console.error('Error merging carts:', error);
        // Fallback: just use current guest cart
        currentCartItems.forEach(item => dispatch(addToCart(item)));
      }
    } else {
      // No saved cart - just keep current guest cart
      console.log('📦 No saved cart found, keeping guest cart');
      currentCartItems.forEach(item => dispatch(addToCart(item)));
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
    const displayNameLogin = (userData && (userData.name || userData.email || getUserIdentifier(userData))) || 'User';
    showSuccess(`Welcome back, ${displayNameLogin}!`);
    closeAuthModal();
  };

  const signup = (userData, token) => {
    setUser(userData);
    if (token) localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  // Use a stable identifier (emailOrPhone, email, or id) for keys
  const identifier = getUserIdentifier(userData);
  const cartKey = identifier ? `cart_${identifier}` : 'cart';
  const wishlistKey = identifier ? `wishlist_${identifier}` : 'wishlist';
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
    const displayNameSignup = (userData && (userData.name || userData.email || getUserIdentifier(userData))) || 'User';
    showSuccess(`Welcome to Stylon, ${displayNameSignup}!`);
    closeAuthModal();
  };

  const logout = () => {
    const identifier = getUserIdentifier(user);
    if (identifier) {
      const cartKey = `cart_${identifier}`;
      const wishlistKey = `wishlist_${identifier}`;
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
      const wishlistItems = JSON.parse(localStorage.getItem(wishlistKey)) || [];
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

