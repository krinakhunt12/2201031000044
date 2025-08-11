import React, { useState } from "react";
import { ArrowRight, Sparkles, TrendingUp, Tag, Users, Crown } from "lucide-react";

const Categories = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = [
    { 
      name: 'Men', 
      gradient: 'from-blue-600 via-indigo-600 to-purple-700',
      image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=500&h=600&fit=crop&crop=center',
      description: 'Sophisticated styles for the modern gentleman',
      itemCount: '450+ Items',
      icon: <Users className="w-5 h-5" />,
      trending: true,
      subcategories: ['Suits & Blazers', 'Casual Shirts', 'Jeans & Trousers', 'Footwear']
    },
    { 
      name: 'Women', 
      gradient: 'from-pink-500 via-rose-500 to-purple-600',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=600&fit=crop&crop=center',
      description: 'Elegant fashion for every occasion',
      itemCount: '680+ Items',
      icon: <Crown className="w-5 h-5" />,
      trending: true,
      subcategories: ['Dresses', 'Tops & Blouses', 'Skirts & Pants', 'Evening Wear']
    },
    { 
      name: 'Children', 
      gradient: 'from-amber-400 via-orange-500 to-pink-500',
      image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500&h=600&fit=crop&crop=center',
      description: 'Playful and comfortable styles for little ones',
      itemCount: '320+ Items',
      icon: <Sparkles className="w-5 h-5" />,
      trending: true,
      subcategories: ['Baby Clothes', 'Kids Casual', 'School Uniforms', 'Party Outfits']
    }
  ];

  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
    
      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 text-gray-700 bg-gray-100 font-semibold uppercase tracking-wider text-xs px-4 py-2 rounded-full mb-6 shadow-sm">
            <Sparkles className="w-4 h-4" />
            Categories
          </div>
          
         <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight">
            <span className="text-gray-700">Shop By </span>
            <span className="bg-clip-text text-gray-500">
              Category
            </span>
          </h2>

          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed italic">
            Discover our carefully curated collections designed for every style and occasion
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-75 group-hover:opacity-85 transition-opacity duration-300`}
              ></div>

              {/* Dark Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>

              {/* Trending Badge */}
              {category.trending && (
                <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30">
                  <TrendingUp className="w-3 h-3" />
                  TRENDING
                </div>
              )}

              {/* Main Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                {/* Category Icon */}
                <div className="mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                    {category.icon}
                  </div>
                </div>

                {/* Category Name */}
                <h3 className="text-3xl font-semibold leading-relaxed text-white mb-2 group-hover:scale-105 transition-transform duration-300 drop-shadow-lg">
                  {category.name}
                </h3>

                {/* Description */}
                <p className="text-white/90 text-sm mb-3 leading-relaxed drop-shadow italic">
                  {category.description}
                </p>

                {/* Item Count */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/80 text-sm font-medium bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                    {category.itemCount}
                  </span>
                </div>

                {/* Subcategories - Shown on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <div className="space-y-1 mb-4">
                    {category.subcategories.slice(0, 2).map((sub, idx) => (
                      <div key={idx} className="text-white/70 text-xs flex items-center gap-1">
                        <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                        {sub}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button className="flex items-center justify-between w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 border border-white/30 group-hover:border-white/50">
                  <span>Explore {category.name}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Hover Effect Overlay */}
              {hoveredCategory === category.name && (
                <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
              )}
            </div>
          ))}
        </div>

        {/* Featured Categories Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
            <div className="text-4xl font-bold text-gray-700 mb-2">1,450+</div>
            <div className="text-gray-500 text-lg font-medium">Total Products</div>
            <div className="text-gray-400 text-sm mt-1 italic">Across all categories</div>
          </div>
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
            <div className="text-4xl font-bold text-gray-700 mb-2">500+</div>
            <div className="text-gray-500 text-lg font-medium">Premium Brands</div>
            <div className="text-gray-400 text-sm mt-1 italic">Carefully selected</div>
          </div>
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
            <div className="text-4xl font-bold text-gray-700 mb-2">24/7</div>
            <div className="text-gray-500 text-lg font-medium">Customer Support</div>
            <div className="text-gray-400 text-sm mt-1 italic">Always here to help</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="group relative inline-flex items-center gap-2 bg-gray-700 text-white font-semibold px-8 py-4 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            <span>Browse All Categories</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <style>{`
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

export default Categories;