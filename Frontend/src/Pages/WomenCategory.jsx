import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import womenProducts from "../constants/womenCollection";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:scale-110 transition-transform">
          <HeartOutline className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500">₹{product.price}</p>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(product.rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-1 text-xs text-gray-500">
            {product.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

const WomenCategory = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  // For All filter
  const [visibleAllCount, setVisibleAllCount] = React.useState(4);

  // For category-specific counts
  const [visibleCounts, setVisibleCounts] = React.useState(
    Object.keys(womenProducts).reduce((acc, category) => {
      acc[category] = 4;
      return acc;
    }, {})
  );

  const categoryList = ["All", ...Object.keys(womenProducts)];

  // Flatten all products
  const allProducts = Object.values(womenProducts).flat();

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
            src="https://images.unsplash.com/photo-1602810318327-9fd5a8f6a7f6?auto=format&fit=crop&w=2070&q=80"
            alt="Women's Fashion"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-8">
            <div className="max-w-xl">
              <h1 className="text-4xl font-bold text-white mb-4">
                Women's Collection 2023
              </h1>
              <p className="text-lg text-gray-200 mb-6">
                Explore our latest trends in women's fashion
              </p>
              <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
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
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
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
              {womenProducts[selectedCategory]
                .slice(0, visibleCounts[selectedCategory])
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
            {visibleCounts[selectedCategory] < womenProducts[selectedCategory].length && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => handleShowMoreCategory(selectedCategory)}
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
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

export default WomenCategory;
