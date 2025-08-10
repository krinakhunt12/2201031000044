import { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Star } from 'lucide-react';

const TrendingNow = () => {
  const [activeCategory, setActiveCategory] = useState('women');
  const [likedItems, setLikedItems] = useState(new Set());

  const categories = [
    { id: 'women', name: 'Women', icon: '👗' },
    { id: 'men', name: 'Men', icon: '👔' },
    { id: 'kids', name: 'Kids', icon: '🧸' }
  ];

  const products = {
    women: [
      {
        id: 1,
        name: 'Silk Maxi Dress',
        price: 89.99,
        originalPrice: 120.00,
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop',
        rating: 4.8,
        reviews: 124,
        badge: 'Trending'
      },
      {
        id: 2,
        name: 'High-Waist Jeans',
        price: 65.99,
        originalPrice: 85.00,
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=400&fit=crop',
        rating: 4.6,
        reviews: 89,
        badge: 'Hot'
      },
      {
        id: 3,
        name: 'Cashmere Sweater',
        price: 119.99,
        originalPrice: 160.00,
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=400&fit=crop',
        rating: 4.9,
        reviews: 203,
        badge: 'New'
      },
      {
        id: 4,
        name: 'Floral Blouse',
        price: 45.99,
        originalPrice: 60.00,
        image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=300&h=400&fit=crop',
        rating: 4.7,
        reviews: 156,
        badge: 'Sale'
      }
    ],
    men: [
      {
        id: 5,
        name: 'Classic Oxford Shirt',
        price: 59.99,
        originalPrice: 79.99,
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=400&fit=crop',
        rating: 4.5,
        reviews: 98,
        badge: 'Trending'
      },
      {
        id: 6,
        name: 'Denim Jacket',
        price: 89.99,
        originalPrice: 120.00,
        image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=400&fit=crop',
        rating: 4.7,
        reviews: 142,
        badge: 'Hot'
      },
      {
        id: 7,
        name: 'Wool Blazer',
        price: 149.99,
        originalPrice: 200.00,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
        rating: 4.8,
        reviews: 87,
        badge: 'New'
      },
      {
        id: 8,
        name: 'Casual Chinos',
        price: 49.99,
        originalPrice: 70.00,
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=400&fit=crop',
        rating: 4.4,
        reviews: 76,
        badge: 'Sale'
      }
    ],
    kids: [
      {
        id: 9,
        name: 'Rainbow Tutu Dress',
        price: 35.99,
        originalPrice: 45.00,
        image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=300&h=400&fit=crop',
        rating: 4.9,
        reviews: 234,
        badge: 'Trending'
      },
      {
        id: 10,
        name: 'Superhero T-Shirt',
        price: 19.99,
        originalPrice: 25.00,
        image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=300&h=400&fit=crop',
        rating: 4.6,
        reviews: 189,
        badge: 'Hot'
      },
      {
        id: 11,
        name: 'Cozy Hoodie',
        price: 42.99,
        originalPrice: 55.00,
        image: 'https://images.unsplash.com/photo-1503944168520-28cdbc9d8e74?w=300&h=400&fit=crop',
        rating: 4.8,
        reviews: 167,
        badge: 'New'
      },
      {
        id: 12,
        name: 'Denim Overalls',
        price: 38.99,
        originalPrice: 50.00,
        image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=300&h=400&fit=crop',
        rating: 4.7,
        reviews: 145,
        badge: 'Sale'
      }
    ]
  };

  const handleLike = (productId) => {
    const newLikedItems = new Set(likedItems);
    if (newLikedItems.has(productId)) {
      newLikedItems.delete(productId);
    } else {
      newLikedItems.add(productId);
    }
    setLikedItems(newLikedItems);
  };

  const getBadgeStyle = (badge) => {
    const styles = {
      'Trending': 'bg-gradient-to-r from-pink-500 to-purple-600 text-white',
      'Hot': 'bg-gradient-to-r from-red-500 to-orange-500 text-white',
      'New': 'bg-gradient-to-r from-green-500 to-blue-500 text-white',
      'Sale': 'bg-gradient-to-r from-yellow-400 to-red-500 text-white'
    };
    return styles[badge] || 'bg-gray-500 text-white';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-white">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
          Trending Now
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the hottest fashion trends that everyone's talking about
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-full p-1 inline-flex">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                activeCategory === category.id
                  ? 'bg-white text-purple-600 shadow-md transform scale-105'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products[activeCategory].map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            {/* Product Image */}
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Badge */}
              <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${getBadgeStyle(product.badge)}`}>
                {product.badge}
              </div>
              
              {/* Quick Actions */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => handleLike(product.id)}
                  className={`p-2 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 ${
                    likedItems.has(product.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 text-gray-700 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <Heart size={16} fill={likedItems.has(product.id) ? 'currentColor' : 'none'} />
                </button>
                <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 text-gray-700 hover:bg-purple-500 hover:text-white transition-all duration-300">
                  <ShoppingCart size={16} />
                </button>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Product Info */}
            <div className="p-5">
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                {product.name}
              </h3>
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                      className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </div>

              {/* Add to Cart Button */}
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <button className="bg-white border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-xl font-medium hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
          View All {categories.find(c => c.id === activeCategory)?.name} Collection
        </button>
      </div>
    </div>
  );
};

export default TrendingNow;