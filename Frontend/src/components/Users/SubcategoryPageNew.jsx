import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Filter, Grid, List, Star, Search } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ProductCard from "./ProductCard";
import { searchProducts } from "../../services/searchService";
import { useAppDispatch } from "../../store/hooks";
import { addToCart } from "../../features/cart/cartSlice";
import { useToast } from "../../contexts/ToastContext";
import { useAuth } from '../../hooks/useAuth';

const SubcategoryPageNew = ({
  categoryLabel,
  subcategoryLabel,
  query,
  accent = "from-black/70 to-transparent",
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    sizes: [],
    colors: [],
    brands: []
  });

  const dispatch = useAppDispatch();
  const { showSuccess, showError } = useToast();
  const { isAuthenticated, openLoginModal } = useAuth();

  const heroUrl = `https://source.unsplash.com/1600x600/?${encodeURIComponent(query)}`;

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        // Search for products based on the subcategory
        const searchResults = await searchProducts(query, 20);
        // Deduplicate results (products may be present multiple times across collections)
        const uniqueMap = new Map();
        searchResults.forEach(p => {
          const key = p.id || p._id || p.name || JSON.stringify(p);
          if (!uniqueMap.has(key)) {
            // Normalize size/color fields to canonical keys used elsewhere
            const normalized = { ...p };
            if (!normalized.sizes && normalized.size) normalized.sizes = Array.isArray(normalized.size) ? normalized.size : String(normalized.size).split(',').map(s=>s.trim()).filter(Boolean);
            if (!normalized.colors && normalized.color) normalized.colors = Array.isArray(normalized.color) ? normalized.color : String(normalized.color).split(',').map(s=>s.trim()).filter(Boolean);
            uniqueMap.set(key, normalized);
          }
        });
        setProducts(Array.from(uniqueMap.values()));
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [query]);

  const sortProducts = (productsToSort) => {
    switch (sortBy) {
      case 'price-low':
        return [...productsToSort].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...productsToSort].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...productsToSort].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'newest':
        return [...productsToSort].sort((a, b) => new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now()));
      default:
        return productsToSort;
    }
  };

  const sortedProducts = sortProducts(products);

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      openLoginModal();
      showError('Please log in to add items to cart');
      return;
    }
    dispatch(addToCart({
      ...product,
      quantity: 1,
      selectedSize: product.sizes?.[0] || 'M',
      selectedColor: product.colors?.[0] || 'Default',
    }));
    showSuccess('Added to cart');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden mb-10">
          <img
            src={heroUrl}
            alt={`${subcategoryLabel} - ${categoryLabel}`}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-r ${accent} flex items-center px-6 sm:px-10`}
          >
            <div className="max-w-2xl">
              <p className="text-sm sm:text-base text-gray-100/90 tracking-wider uppercase">
                {categoryLabel}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-1">
                {subcategoryLabel}
              </h1>
              <p className="text-gray-100/90 mt-3 max-w-xl">
                Discover the latest trends in {subcategoryLabel.toLowerCase()} from top brands.
              </p>
            </div>
          </div>
        </div>

        {/* Filters and Sort Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">View:</span>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing {sortedProducts.length} products
          </p>
        </div>

        {/* Products Grid/List */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-60 rounded-xl mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : sortedProducts.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {viewMode === 'grid' ? (
                  <div className="group">
                    <ProductCard product={product} />
                  </div>
                ) : (
                  <div className="flex bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                    <div className="flex-shrink-0 w-40 h-40 mr-6">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-black transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {product.description || `Premium ${subcategoryLabel.toLowerCase()} with modern design and comfort.`}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          {product.rating && (
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600 ml-1 font-medium">
                                {product.rating} ({product.reviews || 0})
                              </span>
                            </div>
                          )}
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">Sizes:</span>
                            <div className="flex space-x-1">
                              {(product.sizes || ['S', 'M', 'L', 'XL']).map((size) => (
                                <span key={size} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                                  {size}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl font-bold text-gray-900">
                            ₹{product.price.toLocaleString('en-IN')}
                          </div>
                          {product.onSale && (
                            <div className="text-lg text-gray-500 line-through">
                              ₹{product.salePrice?.toLocaleString('en-IN') || product.price.toLocaleString('en-IN')}
                            </div>
                          )}
                        </div>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          className="px-8 py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-all duration-200 hover:scale-105"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SubcategoryPageNew;
