import React from 'react';
import { Search, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchSuggestions = ({ 
  suggestions, 
  isVisible, 
  onSelectSuggestion, 
  searchQuery,
  isLoading = false 
}) => {
  if (!isVisible || !searchQuery.trim()) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto animate-in slide-in-from-top-2 duration-200">
      {isLoading ? (
        <div className="p-4 text-center text-gray-500">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black mx-auto mb-2"></div>
          Searching...
        </div>
      ) : suggestions.length > 0 ? (
        <div className="py-2">
          {suggestions.map((product, index) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              onClick={() => onSelectSuggestion(product)}
              className="flex items-center px-4 py-3 hover:bg-gray-50 transition-all duration-200 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <div className="flex-shrink-0 w-12 h-12 mr-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {product.name}
                  </h4>
                  <span className="text-sm font-semibold text-gray-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {product.category} • {product.brand || 'Stylon'}
                </p>
                {product.rating && (
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">
                      ({product.reviews || 0})
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500">
          <Search className="w-6 h-6 mx-auto mb-2 text-gray-400" />
          <p>No products found for "{searchQuery}"</p>
          <p className="text-sm mt-1">Try different keywords or browse categories</p>
        </div>
      )}
      
      {/* Recent Searches */}
      {suggestions.length > 0 && (
        <div className="border-t border-gray-200 pt-2">
          <div className="px-4 py-2">
            <div className="flex items-center text-xs text-gray-500 mb-2">
              <Clock className="w-3 h-3 mr-1" />
              Recent searches
            </div>
            <div className="flex flex-wrap gap-2">
              {['men tshirts', 'women dresses', 'kids shoes'].map((term, index) => (
                <button
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-xs text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions;
