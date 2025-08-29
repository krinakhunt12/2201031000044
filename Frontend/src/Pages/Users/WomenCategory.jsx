import React, { useState, useEffect } from "react";
import { StarIcon, HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
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

const WomenCategory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await productAPI.getProductsByCategory('women');
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

  // Women-specific clothing categories (no duplicates)
  const clothingCategories = [
    {
      name: "Dresses",
      path: "/category/women/dresses",
      image: "https://images.unsplash.com/photo-1520975918318-8e9730b8da49?auto=format&fit=crop&w=800&q=80",
      productCount: getProductCountByType("Dresses"),
      icon: "👗"
    },
    {
      name: "Tops",
      path: "/category/women/tops",
      image: "https://images.unsplash.com/photo-1618354691373-d851c4f54da8?auto=format&fit=crop&w=800&q=80",
      productCount: getProductCountByType("Tops"),
      icon: "👚"
    },
    {
      name: "Skirts",
      path: "/category/women/skirts",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80",
      productCount: getProductCountByType("Skirts"),
      icon: "👘"
    },
    {
      name: "Jeans",
      path: "/category/women/jeans",
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
      productCount: getProductCountByType("Jeans"),
      icon: "👖"
    },
    {
      name: "Jackets",
      path: "/category/women/jackets",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
      productCount: getProductCountByType("Jackets"),
      icon: "🧥"
    },
    {
      name: "Sweaters",
      path: "/category/women/sweaters",
      image: "https://images.unsplash.com/photo-1434389677669-e08b5c808b32?auto=format&fit=crop&w=800&q=80",
      productCount: getProductCountByType("Sweaters"),
      icon: "🧶"
    }
  ];

  // Current offers
  const currentOffers = [
    {
      id: 1,
      title: "Summer Dress Collection",
      subtitle: "Up to 60% off on summer dresses",
      badge: "Limited Time",
      discount: "60% OFF",
      image: "https://images.unsplash.com/photo-1520975918318-8e9730b8da49?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "New Season Arrivals",
      subtitle: "Fresh styles for autumn",
      badge: "New",
      discount: "25% OFF",
      image: "https://images.unsplash.com/photo-1602810318327-9fd5a8f6a7f6?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Accessories Bundle",
      subtitle: "Buy any dress, get accessories free",
      badge: "Bundle",
      discount: "FREE",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
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
        <div className="relative h-96 rounded-xl overflow-hidden mb-12">
          <img
            src="https://images.unsplash.com/photo-1602810318327-9fd5a8f6a7f6?auto=format&fit=crop&w=2070&q=80"
            alt="Women's Fashion"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-8">
            <div className="max-w-xl">
              <h1 className="text-4xl font-bold text-white mb-4">
                Women's Clothing Collection
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

        {/* Current Offers */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Current Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentOffers.map((offer) => (
              <div key={offer.id} className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                    {offer.discount}
                  </div>
                </div>
                <div className="p-5">
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full mb-2">
                    {offer.badge}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{offer.title}</h3>
                  <p className="text-gray-600 text-sm">{offer.subtitle}</p>
                  <button className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Clothing Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clothingCategories.map((category) => (
              <CategoryCard key={category.name} {...category} />
            ))}
          </div>
        </section>

        {/* Popular Items */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Popular Items</h2>
            <button className="text-gray-600 hover:text-black font-medium">View All</button>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : popularItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {popularItems.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found</p>
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

export default WomenCategory;
