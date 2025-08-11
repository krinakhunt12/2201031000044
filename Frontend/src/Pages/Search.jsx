import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, Filter, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    rating: '',
    onSale: false
  });

  // Mock search results - in a real app, this would be an API call
  useEffect(() => {
    if (query) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockResults = [
          {
            id: 1,
            name: "Premium Black T-Shirt",
            category: "T-Shirts",
            price: 1299,
            salePrice: 999,
            onSale: true,
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
            colors: ["#000000", "#FFFFFF", "#808080"],
            sizes: ["S", "M", "L", "XL"]
          },
          {
            id: 2,
            name: "Classic White Shirt",
            category: "Shirts",
            price: 1799,
            rating: 4.2,
            image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
            colors: ["#FFFFFF", "#F5F5DC"],
            sizes: ["S", "M", "L", "XL"]
          },
          {
            id: 3,
            name: "Denim Jacket",
            category: "Jackets",
            price: 2499,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=400&fit=crop",
            colors: ["#191970", "#4169E1"],
            sizes: ["M", "L", "XL"]
          },
          {
            id: 4,
            name: "Summer Dress",
            category: "Dresses",
            price: 1999,
            salePrice: 1499,
            onSale: true,
            rating: 4.3,
            image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
            colors: ["#FF69B4", "#FFB6C1", "#FFC0CB"],
            sizes: ["XS", "S", "M", "L"]
          }
        ];
        
        // Filter results based on search query
        const filtered = mockResults.filter(item => 
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
        );
        
        setSearchResults(filtered);
        setLoading(false);
      }, 1000);
    }
  }, [query]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      rating: '',
      onSale: false
    });
  };

  const filteredResults = searchResults.filter(item => {
    if (filters.category && item.category !== filters.category) return false;
    if (filters.onSale && !item.onSale) return false;
    if (filters.rating && item.rating < parseFloat(filters.rating)) return false;
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      const price = item.onSale ? item.salePrice : item.price;
      if (max && price > max) return false;
      if (min && price < min) return false;
    }
    return true;
  });

  if (!query) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Search Products</h1>
            <p className="text-gray-600">Enter a search term to find products</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Search Results for "{query}"
            </h1>
            <p className="text-gray-600">
              {loading ? 'Searching...' : `${filteredResults.length} products found`}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                  </h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear all
                  </button>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">All Categories</option>
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Shirts">Shirts</option>
                    <option value="Jackets">Jackets</option>
                    <option value="Dresses">Dresses</option>
                    <option value="Jeans">Jeans</option>
                  </select>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">All Prices</option>
                    <option value="0-1000">Under ₹1,000</option>
                    <option value="1000-2000">₹1,000 - ₹2,000</option>
                    <option value="2000-3000">₹2,000 - ₹3,000</option>
                    <option value="3000-">Above ₹3,000</option>
                  </select>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Minimum Rating</h4>
                  <select
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">Any Rating</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4.0">4.0+ Stars</option>
                    <option value="3.5">3.5+ Stars</option>
                    <option value="3.0">3.0+ Stars</option>
                  </select>
                </div>

                {/* Sale Filter */}
                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.onSale}
                      onChange={(e) => handleFilterChange('onSale', e.target.checked)}
                      className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
                    />
                    <span className="ml-2 text-sm text-gray-700">On Sale Only</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Search Results */}
            <div className="flex-1">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                  <p className="text-gray-600">Searching for products...</p>
                </div>
              ) : filteredResults.length === 0 ? (
                <div className="text-center py-12">
                  <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
                  <p className="text-gray-500">Try adjusting your search terms or filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredResults.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Search;
