import React, { useState } from "react";
import { ShoppingBag, Heart, Star, Eye, Sparkles, Tag, Zap } from "lucide-react";

const FeaturedProducts = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  const products = [
    { 
      id: 1, 
      name: "Silk Midi Dress", 
      price: 189.99, 
      rating: 4.8, 
      originalPrice: 249.99,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop&crop=top",
      category: "Dresses",
      description: "Elegant silk midi dress with delicate floral print",
      colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
      sizes: ["XS", "S", "M", "L", "XL"],
      isNew: false,
      isBestSeller: true,
      reviews: 156,
      material: "100% Silk",
      care: "Dry clean only"
    },
    { 
      id: 2, 
      name: "Premium Leather Jacket", 
      price: 299.99, 
      rating: 4.9, 
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop&crop=top",
      category: "Outerwear",
      description: "Classic genuine leather jacket with modern fit",
      colors: ["#000000", "#8B4513", "#2F4F4F"],
      sizes: ["S", "M", "L", "XL"],
      isNew: true,
      isBestSeller: false,
      reviews: 89,
      material: "Genuine Leather",
      care: "Professional leather care"
    },
    { 
      id: 3, 
      name: "Designer Sneakers", 
      price: 159.99, 
      rating: 4.7, 
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop&crop=center",
      category: "Footwear",
      description: "Comfortable designer sneakers for everyday luxury",
      colors: ["#FFFFFF", "#000000", "#FF1493"],
      sizes: ["6", "7", "8", "9", "10", "11"],
      isNew: false,
      isBestSeller: true,
      reviews: 243,
      material: "Premium Canvas & Leather",
      care: "Machine washable"
    },
    { 
      id: 4, 
      name: "Cashmere Sweater", 
      price: 229.99, 
      rating: 4.9, 
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop&crop=top",
      category: "Knitwear",
      description: "Ultra-soft cashmere sweater in timeless design",
      colors: ["#F5DEB3", "#D2691E", "#000000"],
      sizes: ["XS", "S", "M", "L", "XL"],
      isNew: true,
      isBestSeller: true,
      reviews: 178,
      material: "100% Cashmere",
      care: "Hand wash cold"
    }
  ];

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-100/20 to-rose-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -left-40 w-60 h-60 bg-gradient-to-br from-rose-100/15 to-indigo-100/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 font-semibold uppercase tracking-wider text-xs px-4 py-2 rounded-full mb-6 shadow-sm">
            <Sparkles className="w-4 h-4" />
            Curated Selection
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight">
            <span className="text-gray-700">Featured </span>
            <span className="bg-clip-text text-gray-500">
              Products
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed italic">
            Handpicked pieces that define contemporary fashion and elevate your personal style
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-gray-200"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      <Zap className="w-3 h-3" />
                      NEW
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      <Tag className="w-3 h-3" />
                      BESTSELLER
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      SALE
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                  <button 
                    onClick={() => toggleFavorite(product.id)}
                    className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg group/btn"
                  >
                    <Heart className={`w-4 h-4 transition-colors ${favorites.has(product.id) ? 'text-rose-500 fill-rose-500' : 'text-gray-700 group-hover/btn:text-rose-500'}`} />
                  </button>
                  
                  <button className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg group/btn">
                    <Eye className="w-4 h-4 text-gray-700 group-hover/btn:text-indigo-600" />
                  </button>
                  
                  <button className="p-2.5 bg-gradient-to-r from-indigo-600 to-rose-600 rounded-full hover:from-indigo-700 hover:to-rose-700 transition-all duration-300 shadow-md hover:shadow-lg">
                    <ShoppingBag className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Quick Info Overlay */}
                {hoveredProduct === product.id && (
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-sm">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Material: {product.material}</span>
                      <span className="text-gray-600">{product.sizes.length} sizes</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5">
                {/* Category */}
                <span className="inline-block text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full mb-3">
                  {product.category}
                </span>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-200 fill-gray-200"
                        }`}
                      />
                    ))}
                    <span className="text-sm font-medium text-gray-700 ml-2">
                      {product.rating}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({product.reviews})
                    </span>
                  </div>
                </div>

                {/* Product Name & Description */}
                <h3 className="font-bold text-lg mb-2 group-hover:text-gray-400  cursor-pointer transition-colors leading-tight">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {product.description}
                </p>

                {/* Colors */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs text-gray-500">Colors:</span>
                  <div className="flex gap-1">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-5 h-5 rounded-full border border-gray-200 hover:border-gray-400 transition-colors cursor-pointer"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  {product.originalPrice && (
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <button className="group relative inline-flex items-center gap-2 bg-gray-700 text-white font-medium px-8 py-3 rounded-full hover:from-indigo-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            <span>View All Products</span>
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedProducts;