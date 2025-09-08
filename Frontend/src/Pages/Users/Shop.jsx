import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiX, FiStar, FiShoppingCart } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Users/Navbar';
import Footer from '../../components/Users/Footer';
import ProductCard from '../../components/Users/ProductCard';

const Shop = () => {
  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Premium Leather Jacket',
      price: 199.99,
      category: 'jackets',
      rating: 4.5,
      colors: ['black', 'brown'],
      sizes: ['S', 'M', 'L', 'XL'],
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      onSale: true,
      salePrice: 159.99,
      stock: 15
    },
    {
      id: 2,
      name: 'Classic White T-Shirt',
      price: 29.99,
      category: 'shirts',
      rating: 4.2,
      colors: ['white', 'gray'],
      sizes: ['XS', 'S', 'M', 'L'],
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
      onSale: false,
      stock: 42
    },
    // Add more products...
  ];

  // State management
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortOption, setSortOption] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const productsPerPage = 8;

  // Filter and sort products
  useEffect(() => {
    let results = [...products];
    
// Apply search filter
if (searchTerm) {
  const searchTermLower = searchTerm.toLowerCase();
  results = results.filter(product => 
    product.name.toLowerCase().includes(searchTermLower) ||
    product.description.toLowerCase().includes(searchTermLower) ||
    product.category.toLowerCase().includes(searchTermLower)
  );
}
    // Apply category filter
    if (selectedCategories.length > 0) {
      results = results.filter(product => 
        selectedCategories.includes(product.category))
    }
    
    // Apply price filter
    results = results.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1])
    
    // Apply size filter
    if (selectedSizes.length > 0) {
      results = results.filter(product =>
        product.sizes.some(size => selectedSizes.includes(size)))
    }
    
    // Apply color filter
    if (selectedColors.length > 0) {
      results = results.filter(product =>
        product.colors.some(color => selectedColors.includes(color)))
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        results.sort((a, b) => (a.onSale ? a.salePrice : a.price) - (b.onSale ? b.salePrice : b.price));
        break;
      case 'price-high':
        results.sort((a, b) => (b.onSale ? b.salePrice : b.price) - (a.onSale ? a.salePrice : a.price));
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Assuming we have a 'dateAdded' property
        results.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
      default:
        // 'featured' - default sorting
        break;
    }
    
    setFilteredProducts(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, priceRange, selectedCategories, selectedSizes, selectedColors, sortOption]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Helper functions
  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const toggleColor = (color) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FiStar key={i} className="text-gray-300" />);
      }
    }
    
    return stars;
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      {/* Mobile filter dialog */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile filter content */}
            <div className="mt-4 border-t border-gray-200 px-4 py-6">
              <h3 className="-mx-2 -my-3 flow-root">
                <span className="font-medium text-gray-900">Categories</span>
              </h3>
              <div className="pt-6">
                <div className="space-y-4">
                  {['jackets', 'shirts', 'pants', 'shoes', 'accessories'].map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`filter-mobile-${category}`}
                        name="category[]"
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor={`filter-mobile-${category}`} className="ml-3 text-sm text-gray-600">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* More mobile filters... */}
          </div>
        </div>
      )}

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-8 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Shop</h1>

          <div className="flex items-center">
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  Filters
                  <FiFilter className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
                </button>
              </div>
            </div>

            <div className="relative ml-4 inline-block text-left">
              <div>
                <label htmlFor="sort" className="sr-only">Sort</label>
                <select
                  id="sort"
                  name="sort"
                  className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <div className="hidden lg:block">
              <div className="sticky top-4">
                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <FiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Price filter */}
                <div className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <span className="font-medium text-gray-900">Price range</span>
                  </h3>
                  <div className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="500"
                        step="10"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Category filter */}
                <div className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <span className="font-medium text-gray-900">Categories</span>
                  </h3>
                  <div className="pt-6">
                    <div className="space-y-4">
                      {['jackets', 'shirts', 'pants', 'shoes', 'accessories'].map((category) => (
                        <div key={category} className="flex items-center">
                          <input
                            id={`filter-${category}`}
                            name="category[]"
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleCategory(category)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label htmlFor={`filter-${category}`} className="ml-3 text-sm text-gray-600">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Size filter */}
                <div className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <span className="font-medium text-gray-900">Sizes</span>
                  </h3>
                  <div className="pt-6">
                    <div className="grid grid-cols-3 gap-4">
                      {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <div key={size} className="flex items-center">
                          <input
                            id={`filter-size-${size}`}
                            name="size[]"
                            type="checkbox"
                            checked={selectedSizes.includes(size)}
                            onChange={() => toggleSize(size)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label htmlFor={`filter-size-${size}`} className="ml-3 text-sm text-gray-600">
                            {size}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Color filter */}
                <div className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <span className="font-medium text-gray-900">Colors</span>
                  </h3>
                  <div className="pt-6">
                    <div className="flex flex-wrap gap-3">
                      {['black', 'white', 'gray', 'red', 'blue', 'green', 'yellow', 'pink', 'purple', 'brown'].map((color) => (
                        <div key={color} className="flex items-center">
                          <input
                            id={`filter-color-${color}`}
                            name="color[]"
                            type="checkbox"
                            checked={selectedColors.includes(color)}
                            onChange={() => toggleColor(color)}
                            className="sr-only"
                          />
                          <label
                            htmlFor={`filter-color-${color}`}
                            className={`h-6 w-6 rounded-full border border-gray-200 ${color === 'white' ? 'bg-white' : `bg-${color}-500`} cursor-pointer`}
                            title={color.charAt(0).toUpperCase() + color.slice(1)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product grid */}
            <div className="lg:col-span-3">
              {currentProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {currentProducts.map((product) => {
                    // map local sample shape to ProductCard expected shape
                    const mapped = {
                      ...product,
                      _id: product.id,
                      photos: product.image ? [product.image] : (product.photos || []),
                      image: product.image,
                      salePrice: product.salePrice,
                    };
                    return (
                      <ProductCard key={product.id} product={mapped} />
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                </div>
              )}

              {/* Pagination */}
              {filteredProducts.length > productsPerPage && (
                <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-6">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{indexOfFirstProduct + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(indexOfLastProduct, filteredProducts.length)}
                      </span>{' '}
                      of <span className="font-medium">{filteredProducts.length}</span> results
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`rounded-md px-3 py-1 text-sm ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`rounded-md px-3 py-1 text-sm ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`rounded-md px-3 py-1 text-sm ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Shop;