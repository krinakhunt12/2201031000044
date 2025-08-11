import React from "react";
import { StarIcon, HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline, ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import womenProducts from "../constants/womenCollection";

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const [quickViewOpen, setQuickViewOpen] = React.useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group relative">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button 
          onClick={() => setIsWishlisted(!isWishlisted)} 
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm z-10"
        >
          {isWishlisted ? <HeartIcon className="w-5 h-5 text-red-500" /> : <HeartOutline className="w-5 h-5 text-gray-600" />}
        </button>
        <button 
          onClick={() => setQuickViewOpen(true)} 
          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
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
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description || "Elegant and stylish design"}</p>
        <div className="flex items-center justify-between">
          <p className="text-pink-600 font-bold text-lg">₹{product.price}</p>
          <button className="bg-gray-900 text-white p-2 rounded-lg flex items-center gap-1 hover:bg-gray-800 transition-colors">
            <ShoppingBagIcon className="w-4 h-4" /> <span className="text-sm">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const CategoryCard = ({ category, image, productCount, path }) => (
  <Link to={path} className="group">
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={category}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{category}</h3>
        <p className="text-sm text-gray-600">{productCount} items</p>
      </div>
    </div>
  </Link>
);

const WomenCategory = () => {
  // Clothing categories only
  const clothingCategories = [
    {
      name: "Dresses",
      path: "/category/women/dresses",
      image: "https://images.unsplash.com/photo-1520975918318-8e9730b8da49?auto=format&fit=crop&w=800&q=80",
      productCount: womenProducts["Dresses"]?.length || 0
    },
    {
      name: "Tops",
      path: "/category/women/tops",
      image: "https://images.unsplash.com/photo-1618354691373-d851c4f54da8?auto=format&fit=crop&w=800&q=80",
      productCount: womenProducts["Tops"]?.length || 0
    },
    {
      name: "Skirts",
      path: "/category/women/skirts",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80",
      productCount: 6
    },
    {
      name: "Jeans",
      path: "/category/women/jeans",
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
      productCount: 8
    },
    {
      name: "Jackets",
      path: "/category/women/jackets",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
      productCount: 7
    },
    {
      name: "Sweaters",
      path: "/category/women/sweaters",
      image: "https://images.unsplash.com/photo-1434389677669-e08b5c808b32?auto=format&fit=crop&w=800&q=80",
      productCount: 9
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

  // Popular items from all categories
  const popularItems = Object.values(womenProducts)
    .flat()
    .sort((a, b) => b.rating - a.rating)
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
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
