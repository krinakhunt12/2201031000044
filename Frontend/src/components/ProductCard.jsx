import React from "react";
import { motion } from "framer-motion";
import { StarIcon, HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";

const ProductCard = ({ product, showColors = true, showRating = true }) => {
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  
  // Format price with commas
  const formattedPrice = product.price.toLocaleString('en-IN');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Wishlist button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm"
          aria-label="Add to wishlist"
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
          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap"
        >
          Quick View
        </motion.button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {product.name}
          </h3>
          {showRating && product.rating && (
            <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
              <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="text-xs font-medium">{product.rating}</span>
            </div>
          )}
        </div>
        
        <p className="text-pink-600 font-bold text-lg mb-3">₹{formattedPrice}</p>
        
        {showColors && product.colors && (
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xs text-gray-500">Colors:</span>
            <div className="flex space-x-1">
              {product.colors.map((color) => (
                <div
                  key={color}
                  className="w-4 h-4 rounded-full border border-gray-200"
                  style={{ backgroundColor: color }}
                  aria-label={color}
                />
              ))}
            </div>
          </div>
        )}
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;