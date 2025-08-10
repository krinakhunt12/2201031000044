import React from "react";
import { StarIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import kidsProducts from "../constants/kidsCollection";

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  
  const formattedPrice = product.price.toLocaleString('en-IN');

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group relative">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Wishlist button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm z-10"
          aria-label="Add to wishlist"
        >
          {isWishlisted ? (
            <StarIcon className="w-5 h-5 text-yellow-400" />
          ) : (
            <HeartOutline className="w-5 h-5 text-gray-600" />
          )}
        </button>
        
        {/* Age badge */}
        {(product.ageRange || product.ages) && (
          <div className="absolute top-3 left-3 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
            {product.ageRange || product.ages}
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
            <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-xs font-medium">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
        
        {/* Size options */}
        {product.sizes && (
          <div className="flex flex-wrap gap-2 mb-4">
            {product.sizes.map((size) => (
              <button
                key={size}
                className="text-xs border border-gray-200 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
              >
                {size}
              </button>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <p className="text-pink-600 font-bold text-lg">₹{formattedPrice}</p>
          <button
            className="bg-gray-900 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1"
          >
            <ShoppingBagIcon className="w-4 h-4" />
            <span className="text-sm">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const KidsCategory = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  // For All filter
  const [visibleAllCount, setVisibleAllCount] = React.useState(4);

  // For category-specific counts
  const [visibleCounts, setVisibleCounts] = React.useState(
    Object.keys(kidsProducts).reduce((acc, category) => {
      acc[category] = 4;
      return acc;
    }, {})
  );

 const categoryList = Object.keys(kidsProducts);

  // Flatten all products
  const allProducts = Object.values(kidsProducts).flat();

  const handleShowMoreAll = () => {
    setVisibleAllCount((prev) => prev + 4);
  };

  const handleShowMoreCategory = (category) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [category]: prev[category] + 4,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative h-96 rounded-xl overflow-hidden mb-12">
          <img
            src="https://images.unsplash.com/photo-1604917018614-6c5d1db2b9d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="Kids Collection"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/60 to-transparent flex items-center px-8">
            <div className="max-w-xl">
              <h1 className="text-4xl font-bold text-white mb-4">
                Kids Collection 2023
              </h1>
              <p className="text-lg text-gray-200 mb-6">
                Discover our playful collection for kids
              </p>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Shop New Arrivals
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide">
          <div className="flex space-x-4">
            {categoryList.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        {selectedCategory === "All" ? (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">All Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allProducts.slice(0, visibleAllCount).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {visibleAllCount < allProducts.length && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleShowMoreAll}
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Show More
                </button>
              </div>
            )}
          </section>
        ) : (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{selectedCategory}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {kidsProducts[selectedCategory]
                .slice(0, visibleCounts[selectedCategory])
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
            {visibleCounts[selectedCategory] < kidsProducts[selectedCategory].length && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => handleShowMoreCategory(selectedCategory)}
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Show More
                </button>
              </div>
            )}
          </section>
        )}

 {/* Newsletter */}
        <div className="mt-20 bg-gray-50 rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated</h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Subscribe to our newsletter for the latest trends, exclusive offers, and style tips.
          </p>
          <div className="flex max-w-md mx-auto">
            <input type="email" placeholder="Your email address" className="flex-grow px-4 py-3 rounded-l-lg border border-gray-300" />
            <button className="bg-black text-white px-6 py-3 rounded-r-lg hover:bg-gray-800">Subscribe</button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default KidsCategory;