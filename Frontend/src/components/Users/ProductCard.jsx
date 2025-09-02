import React, { useState, useEffect, useMemo } from "react";
import QuickViewModal from '../ui/QuickViewModal';
import { motion } from "framer-motion";
import { StarIcon, HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addToCart } from '../../features/cart/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../features/wishlist/wishlistSlice';
import { useToast } from '../../contexts/ToastContext';

const ProductCard = ({ product, showColors = true, showRating = true }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.color || 'Default');
  const [selectedSize, setSelectedSize] = useState(product.size || "");
  const [showQuickView, setShowQuickView] = useState(false);
  
  const dispatch = useAppDispatch();
  const { items: wishlistItems } = useAppSelector(state => state.wishlist);
  const { showSuccess, showError } = useToast();
  
  // Check if product is in wishlist
  useEffect(() => {
    setIsWishlisted(wishlistItems.some(item => item.id === product._id));
  }, [wishlistItems, product._id]);

  // Robust, memoized product image URL. Handles absolute URLs returned by the API
  // or relative paths. Falls back to product.image or placeholder.
  const productImage = useMemo(() => {
    if (product.photos && product.photos.length > 0) {
      // Use the photo URL directly as returned by backend
      const photoUrl = product.photos[0];
      // Ensure the URL is absolute
      if (photoUrl && !photoUrl.startsWith('http')) {
        return `${window.location.protocol}//${window.location.host}${photoUrl}`;
      }
      return photoUrl;
    }
    return product.image || 'https://via.placeholder.com/400x500?text=No+Image';
  }, [product.photos, product.image]);

  // Format price with commas
  const formattedPrice = product.price ? product.price.toLocaleString('en-IN') : "0";
  const formattedSalePrice = product.salePrice ? product.salePrice.toLocaleString('en-IN') : null;

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist({ id: product._id }));
      showSuccess('Removed from wishlist');
    } else {
      dispatch(addToWishlist(product));
      showSuccess('Added to wishlist');
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // If product has a single size value, add directly to cart; otherwise open quick view
    const sizeValue = product.size || (product.sizes && product.sizes.length === 1 && product.sizes[0]);
    const itemId = product._id || product.id || Math.random().toString(36).slice(2,9);
    if (sizeValue) {
      const price = product.price || product.salePrice || 0;
      dispatch(addToCart({
        id: itemId,
        _id: product._id,
        name: product.name,
        price,
        photos: product.photos || [],
        image: product.image || product.photos?.[0] || null,
        selectedSize: sizeValue,
        quantity: 1,
        totalPrice: price * 1,
      }));
      showSuccess('Added to cart');
      return;
    }
    setShowQuickView(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group"
      >
      <div className="relative">
        <Link to={`/product/${product._id}`}>
          <img
            src={productImage}
            alt={product.name}
            className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              if (e.currentTarget.dataset.hasError) return;
              e.currentTarget.dataset.hasError = 'true';
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://via.placeholder.com/400x500?text=No+Image';
            }}
          />
        </Link>
        
        {/* Sale Badge */}
        {product.onSale && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
            SALE
          </div>
        )}
        
        {/* Wishlist button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? (
            <HeartIcon className="w-5 h-5 text-red-500" />
          ) : (
            <HeartOutline className="w-5 h-5 text-gray-600" />
          )}
        </motion.button>
        
        {/* Quick view button (appears on hover) */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-800 transition-colors"
        >
          Quick View
        </motion.button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product._id}`} className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 hover:text-black transition-colors">
              {product.name}
            </h3>
          </Link>
          {showRating && product.rating && (
            <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
              <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="text-xs font-medium">{product.rating}</span>
            </div>
          )}
        </div>
        
        {/* Price Display */}
        <div className="mb-3">
          {product.onSale ? (
            <div className="flex items-center space-x-2">
              <span className="text-red-600 font-bold text-lg">₹{formattedSalePrice}</span>
              <span className="text-gray-500 line-through">₹{formattedPrice}</span>
            </div>
          ) : (
            <span className="text-gray-900 font-bold text-lg">₹{formattedPrice}</span>
          )}
        </div>
        
        {/* Size Selection */}
        {product.size && (
          <div className="mb-3">
            <span className="text-xs text-gray-500 block mb-1">Size:</span>
            <div className="flex space-x-1">
              <span className="px-2 py-1 text-xs rounded border border-gray-300 text-gray-600">
                {product.size}
              </span>
            </div>
          </div>
        )}
        
        {/* Color Selection */}
        {showColors && product.color && (
          <div className="mb-3">
            <span className="text-xs text-gray-500 block mb-1">Color:</span>
            <div className="flex space-x-1">
              <span className="px-2 py-1 text-xs rounded border border-gray-300 text-gray-600">
                {product.color}
              </span>
            </div>
          </div>
        )}
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          className="w-full bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Add
        </motion.button>
      </div>
      </motion.div>
      <QuickViewModal
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </>
  );
};

export default ProductCard;