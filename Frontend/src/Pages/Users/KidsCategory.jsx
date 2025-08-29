import React, { useState, useEffect } from "react";
import { StarIcon, ShoppingBagIcon, HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline, ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Navbar from "../../components/Users/Navbar";
import Footer from "../../components/Users/Footer";
import ProductCard from "../../components/Users/ProductCard";
import { productAPI } from "../../services/api";



const CategoryCard = ({ category, image, productCount, path, icon }) => (
  <Link to={path} className="group">
    <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={category}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">{icon}</span>
            <h3 className="text-xl font-bold text-white">{category}</h3>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-white/90 text-sm">{productCount} items</p>
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

const KidsCategory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await productAPI.getProductsByCategory('kids');
        if (response.success) {
          setProducts(response.products);
        } else {
          setError("Failed to fetch products");
        }
      } catch (err) {
        setError("Error fetching products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Group products by type to get counts
  const getProductCountByType = (productType) => {
    return products.filter(product => product.productType === productType).length;
  };

  // Kids-specific clothing categories (no duplicates)
  const clothingCategories = [
    {
      name: "T-Shirts",
      path: "/category/kids/tshirts",
      image: "https://images.unsplash.com/photo-1520974735194-6c0a1a67b3d8?auto=format&fit=crop&w=800&q=80",
      productCount: getProductCountByType("T-Shirts"),
      icon: "👕"
    },
    {
      name: "Dresses",
      path: "/category/kids/dresses",
      image: "https://images.unsplash.com/photo-1520975918318-8e9730b8da49?auto=format&fit=crop&w=800&q=80",
      productCount: getProductCountByType("Dresses"),
      icon: "👗"
    },
    {
      name: "Pants",
      path: "/category/kids/pants",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
      productCount: getProductCountByType("Pants"),
      icon: "👖"
    },
    {
      name: "Jackets",
      path: "/category/kids/jackets",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
      productCount: getProductCountByType("Jackets"),
      icon: "🧥"
    },
    {
      name: "Sweaters",
      path: "/category/kids/sweaters",
      image: "https://images.unsplash.com/photo-1434389677669-e08b5c808b32?auto=format&fit=crop&w=800&q=80",
      productCount: getProductCountByType("Sweaters"),
      icon: "🧶"
    },
    {
      name: "Shorts",
      path: "/category/kids/shorts",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
      productCount: getProductCountByType("Shorts"),
      icon: "🩳"
    }
  ];

  // Current offers
  const currentOffers = [
    {
      id: 1,
      title: "Back to School Collection",
      subtitle: "Up to 40% off on school essentials",
      badge: "Limited Time",
      discount: "40% OFF",
      image: "https://images.unsplash.com/photo-1520974735194-6c0a1a67b3d8?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Winter Warmers",
      subtitle: "Cozy sweaters and jackets",
      badge: "New",
      discount: "30% OFF",
      image: "https://images.unsplash.com/photo-1434389677669-e08b5c808b32?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Bundle & Save",
      subtitle: "Buy 3 items, get 1 free",
      badge: "Bundle",
      discount: "25% OFF",
      image: "https://images.unsplash.com/photo-1520975918318-8e9730b8da49?auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Popular items from all categories - remove duplicates by ID
  const popularItems = products
    .filter((product, index, self) => 
      index === self.findIndex(p => p._id === product._id)
    )
    .sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5))
    .slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative h-[500px] rounded-2xl overflow-hidden mb-16 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1604917018614-6c5d1db2b9d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="Kids Collection"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/70 via-pink-500/50 to-transparent flex items-center px-8">
            <div className="max-w-xl">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
                  Kids Fashion
                  <span className="block text-3xl text-yellow-300">Collection</span>
                </h1>
                <p className="text-xl text-gray-100 mb-8 leading-relaxed">
                  Discover our playful and colorful collection designed for little ones
                </p>
                <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Explore Collection
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Current Offers */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Special Offers</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't miss out on these amazing deals for your little ones
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentOffers.map((offer) => (
              <div key={offer.id} className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="relative h-56 overflow-hidden">
                  <img src={offer.image} alt={offer.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                    {offer.discount}
                  </div>
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-semibold rounded-full mb-3">
                    {offer.badge}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                  <p className="text-gray-600 mb-4">{offer.subtitle}</p>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
                    Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Clothing Categories */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of kids clothing categories
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {clothingCategories.map((category) => (
              <CategoryCard key={category.name} {...category} />
            ))}
          </div>
        </section>

        {/* Popular Items */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Items</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our most loved products by parents and kids alike
            </p>
          </div>
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto"></div>
              <p className="mt-6 text-gray-600 text-lg">Loading amazing products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="bg-red-50 rounded-2xl p-8 max-w-md mx-auto">
                <p className="text-red-600 text-lg">{error}</p>
              </div>
            </div>
          ) : popularItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {popularItems.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
                <p className="text-gray-500 text-lg">No products found</p>
              </div>
            </div>
          )}
        </section>

        {/* Newsletter */}
        <div className="mt-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest kids fashion trends, exclusive offers, and parenting style tips.
            </p>
            <div className="flex max-w-lg mx-auto bg-white/20 backdrop-blur-sm rounded-2xl p-2">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow px-6 py-4 rounded-xl border-0 bg-white/90 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/50" 
              />
              <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 ml-2">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default KidsCategory;