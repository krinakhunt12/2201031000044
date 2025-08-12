import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { StarIcon, HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToCart } from '../features/cart/cartSlice';
import { addToWishlist, removeFromWishlist } from '../features/wishlist/wishlistSlice';
import { useToast } from '../contexts/ToastContext';

const ProductCard = ({ product, showColors = true, showRating = true }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || 'Default');
  
  const dispatch = useAppDispatch();
  const { items: wishlistItems } = useAppSelector(state => state.wishlist);
  const { showSuccess, showError } = useToast();
  
  // Check if product is in wishlist
  useEffect(() => {
    setIsWishlisted(wishlistItems.some(item => item.id === product.id));
  }, [wishlistItems, product.id]);

  // Format price with commas
  const formattedPrice = product.price.toLocaleString('en-IN');
  const formattedSalePrice = product.salePrice ? product.salePrice.toLocaleString('en-IN') : null;

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist({ id: product.id }));
      showSuccess('Removed from wishlist');
    } else {
      dispatch(addToWishlist(product));
      showSuccess('Added to wishlist');
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({
      ...product,
      quantity: 1,
      selectedSize,
      selectedColor,
    }));
    showSuccess('Added to cart');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group"
    >
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
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
          <Link to={`/product/${product.id}`} className="flex-1">
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
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-3">
            <span className="text-xs text-gray-500 block mb-1">Size:</span>
            <div className="flex space-x-1">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-2 py-1 text-xs rounded border transition-colors ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Color Selection */}
        {showColors && product.colors && product.colors.length > 0 && (
          <div className="mb-3">
            <span className="text-xs text-gray-500 block mb-1">Color:</span>
            <div className="flex space-x-1">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-5 h-5 rounded-full border-2 transition-all ${
                    selectedColor === color
                      ? 'border-black scale-110'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={color}
                />
              ))}
            </div>
          </div>
        )}
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          className="w-full bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;