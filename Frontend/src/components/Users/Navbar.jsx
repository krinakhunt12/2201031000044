import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Search,
  Heart,
  Menu,
  X,
  ChevronRight,
  User,
  LogOut,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
// Remove Redux login import, keep logout for state cleanup if needed
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../hooks/useAuth';
import { useSearch } from '../../hooks/useSearch';
import Modal from './ui/Modal';
import SearchSuggestions from './search/SearchSuggestions';
import SignUp from "../../Pages/Users/SignUp";
import Login from "../../Pages/Users/Login";

const categoryData = [
  {
    name: "Men",
    path: "/category/men",
    subcategories: ["T-Shirts", "Shirts", "Jackets", "Jeans", "Shorts", "Sweaters"],
  },
  {
    name: "Women",
    path: "/category/women",
    subcategories: ["Dresses", "Tops", "Skirts", "Jeans", "Jackets", "Sweaters"],
  },
  {
    name: "Kids",
    path: "/category/kids",
    subcategories: ["T-Shirts", "Dresses", "Pants", "Jackets", "Sweaters", "Shorts"],
  },
];

const mainMenuItems = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "#" },
  { name: "Collections", path: "/collections" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest('.profile-menu')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileMenu]);

  const navigate = useNavigate();
  const { totalQuantity: cartCount } = useAppSelector(state => state.cart);
  const { items: wishlistItems } = useAppSelector(state => state.wishlist);
  const { showSuccess } = useToast();

  // AuthContext
  const {
    isAuthenticated,
    user,
    isAdmin: userIsAdmin,
    showAuthModal,
    authMode,
    openLoginModal,
    openSignUpModal,
    closeAuthModal,
    login,
    signup,
    logout
  } = useAuth();
  
  const {
    searchQuery,
    suggestions,
    isLoading: searchLoading,
    showSuggestions,
    handleSearchChange,
    handleSuggestionSelect,
    handleSearchSubmit,
    hideSuggestions,
    setShowSuggestions,
  } = useSearch();

  const handleLogout = () => {
    // Use logout from useAuth context
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    showSuccess('Logged out successfully');
    navigate('/');
  };

  // Auth form handlers
  const handleLoginInputChange = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignupInputChange = (e) => {
    setSignupFormData({
      ...signupFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser = {
        id: 1,
        name: isAdmin ? 'Admin User' : 'John Doe',
        email: loginFormData.email,
        isAdmin: isAdmin
      };
      // Use AuthContext login
      if (typeof authLogout === 'function') {
        // Defensive: if context provides login
        if (typeof user === 'undefined' || !user) {
          if (typeof useAuth().login === 'function') {
            useAuth().login(mockUser);
          }
        }
      }
      showSuccess(`Welcome back, ${mockUser.name}!`);
      closeAuthModal();
    } catch (error) {
      showError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupFormData.password !== signupFormData.confirmPassword) {
      showError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser = {
        id: 1,
        name: signupFormData.name,
        email: signupFormData.email,
        isAdmin: false
      };
      // Use AuthContext signup
      if (typeof authLogout === 'function') {
        if (typeof user === 'undefined' || !user) {
          if (typeof useAuth().signup === 'function') {
            useAuth().signup(mockUser);
          }
        }
      }
      showSuccess(`Welcome to Stylon, ${mockUser.name}!`);
      closeAuthModal();
    } catch (error) {
      showError('Sign up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchMode = () => {
    if (authMode === 'login') {
      openSignUpModal();
    } else {
      openLoginModal();
    }
  };

  const handleSwitchToAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleSearchSubmit(searchQuery);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="font-poppins fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-2xl font-bold text-black tracking-tight"
          >
            Stylon
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 relative">
            {mainMenuItems.map(({ name, path }) =>
              name === "Shop" ? (
                <div key={name} className="relative group">
                  <span className="cursor-pointer text-gray-800 hover:text-black font-medium">
                    {name}
                  </span>
                  <div className="absolute top-full left-0 mt-2 flex bg-white shadow-lg border border-gray-100 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-40">
                    <div className="w-56 py-2">
                      {categoryData.map((cat) => (
                        <div key={cat.name} className="relative group-hover:flex group/sub">
                          <Link
                            to={cat.path}
                            className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-black flex justify-between items-center w-full"
                          >
                            {cat.name}
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Link>
                          <div className="absolute top-0 left-full ml-1 w-48 bg-white border border-gray-200 shadow-lg rounded-md opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 z-50">
                            {cat.subcategories.map((sub, idx) => (
                              <Link
                                key={idx}
                                to={`${cat.path}/${sub
                                  .toLowerCase()
                                  .replace(/[^a-z0-9]/g, "")}`}
                                className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-black"
                              >
                                {sub}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={name}
                  to={path}
                  className="relative group text-gray-800 hover:text-black font-medium transition-all duration-300"
                >
                  {name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                </Link>
              )
            )}
          </nav>

          {/* Desktop Icons & Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Button */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            {/* Wishlist Button */}
            <Link
              to="/wishlist"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 text-gray-600" />
            </Link>

            {/* Cart Button */}
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingBag className="w-5 h-5 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-black rounded-full text-xs flex items-center justify-center text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Profile Button - Shows when authenticated */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                  <User className="w-5 h-5 text-gray-600" />
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg border border-gray-100 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-40">
                  {userIsAdmin && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-5 py-1.5 border border-gray-300 text-sm rounded-full font-medium text-gray-800 hover:text-black transition-all"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="px-5 py-1.5 bg-black text-white text-sm rounded-full font-medium hover:opacity-90 transition-all"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="bg-white border-t border-gray-100 py-4">
          <div className="max-w-2xl mx-auto px-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={hideSuggestions}
                placeholder="Search for products..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                autoFocus
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Search
              </button>
              
              <SearchSuggestions
                suggestions={suggestions}
                isVisible={showSuggestions}
                onSelectSuggestion={handleSuggestionSelect}
                searchQuery={searchQuery}
                isLoading={searchLoading}
              />
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white/95 backdrop-blur-md transform transition-all duration-300 ${
          isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden border-t border-gray-100`}
      >
        <div className="px-4 py-4 space-y-4">
          {mainMenuItems.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-800 hover:text-black font-medium transition-colors"
            >
              {name}
            </Link>
          ))}
          
          <div className="pt-2">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={hideSuggestions}
                placeholder="Search products..."
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              
              <SearchSuggestions
                suggestions={suggestions}
                isVisible={showSuggestions}
                onSelectSuggestion={handleSuggestionSelect}
                searchQuery={searchQuery}
                isLoading={searchLoading}
              />
            </form>
          </div>

          {isAuthenticated ? (
            <div className="space-y-2 pt-2 border-t border-gray-200">
              <div className="text-sm text-gray-600 px-2">Welcome, {user?.name}</div>
              {userIsAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-2 py-2 text-gray-800 hover:text-black"
                >
                  Admin Dashboard
                </Link>
              )}
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="block px-2 py-2 text-gray-800 hover:text-black"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-2 py-2 text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-2 pt-2 border-t border-gray-200">
              <button
                onClick={() => {
                  openLoginModal();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-center px-6 py-2 border border-gray-300 text-gray-800 rounded-full font-medium hover:text-black"
              >
                Login
              </button>
              <button
                onClick={() => {
                  openSignUpModal();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-center px-6 py-2 bg-black text-white rounded-full font-medium hover:opacity-90"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
      
  {/* Removed modal-based Login/SignUp rendering. Use <Route path="/login" element={<Login />} /> and <Route path="/signup" element={<SignUp />} /> in your router. */}
    </header>
  );
};

export default Navbar;