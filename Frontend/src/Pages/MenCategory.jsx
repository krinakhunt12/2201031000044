import React from "react";
import { StarIcon, HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline, ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import menProducts from "../constants/menCollection";


const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const [quickViewOpen, setQuickViewOpen] = React.useState(false);
  const formattedPrice = product.price.toLocaleString("en-IN");

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group relative">
      <div className="relative overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500" />
        <button onClick={() => setIsWishlisted(!isWishlisted)} className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm z-10">
          {isWishlisted ? <HeartIcon className="w-5 h-5 text-red-500" /> : <HeartOutline className="w-5 h-5 text-gray-600" />}
        </button>
        <button onClick={() => setQuickViewOpen(true)} className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowsPointingOutIcon className="w-4 h-4" /> Quick View
        </button>
        {product.id % 3 === 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">SALE</div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
          <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
            <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-xs font-medium">{product.rating}</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xs text-gray-500">Colors:</span>
          <div className="flex space-x-1">
            {product.colors.map((color) => (
              <div key={color} className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {product.sizes.map((size) => (
            <button key={size} className="text-xs border border-gray-200 px-2 py-1 rounded">{size}</button>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-pink-600 font-bold text-lg">₹{formattedPrice}</p>
          <button className="bg-gray-900 text-white p-2 rounded-lg flex items-center gap-1">
            <ShoppingBagIcon className="w-4 h-4" /> <span className="text-sm">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const MenCategory = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [visibleCount, setVisibleCount] = React.useState(4);

  const categoryList = ["All", ...Object.keys(menProducts)];

  const getFilteredProducts = () => {
    if (selectedCategory === "All") {
      return Object.entries(menProducts).flatMap(([cat, products]) =>
        products.map((p) => ({ ...p, category: cat }))
      );
    }
    return menProducts[selectedCategory]?.map((p) => ({ ...p, category: selectedCategory })) || [];
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative h-96 rounded-xl overflow-hidden mb-12">
          <img src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Men's Fashion" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-8">
            <div className="max-w-xl">
              <h1 className="text-4xl font-bold text-white mb-4">Summer Collection 2023</h1>
              <p className="text-lg text-gray-200 mb-6">Discover our premium selection of men's fashion essentials</p>
              <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium">Shop New Arrivals</button>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide">
          <div className="flex space-x-4">
            {categoryList.map((category) => (
              <button key={category} onClick={() => { setSelectedCategory(category); setVisibleCount(4); }} className={`px-4 py-2 rounded-full ${selectedCategory === category ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"}`}>
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <section>
          {selectedCategory !== "All" && <h2 className="text-2xl font-bold text-gray-900 mb-8">{selectedCategory}</h2>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.slice(0, visibleCount).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {visibleCount < filteredProducts.length && (
            <div className="flex justify-center mt-8">
              <button onClick={() => setVisibleCount((prev) => prev + 4)} className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                Show More
              </button>
            </div>
          )}
        </section>

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

export default MenCategory;
