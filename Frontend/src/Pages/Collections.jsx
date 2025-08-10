import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Heart, 
  Star, 
  ShoppingBag,
  ChevronDown,
  Sparkles,
  Tag,
  TrendingUp,
  ArrowLeft,
  ChevronRight
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Sample data
const collections = [
  {
    id: 1,
    name: "Summer Essentials",
    description: "Light, breezy pieces perfect for warm weather",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=300&fit=crop",
    itemCount: 45,
    trending: true
  },
  {
    id: 2,
    name: "Professional Wear",
    description: "Sophisticated pieces for the modern workplace",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop",
    itemCount: 32,
    trending: false
  },
  {
    id: 3,
    name: "Casual Comfort",
    description: "Everyday comfort meets effortless style",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop",
    itemCount: 58,
    trending: true
  },
  {
    id: 4,
    name: "Evening Elegance",
    description: "Stunning pieces for special occasions",
    image: "https://images.unsplash.com/photo-1566479179817-c0ee8b4b8b55?w=400&h=300&fit=crop",
    itemCount: 28,
    trending: false
  },
  {
    id: 5,
    name: "Activewear",
    description: "Performance meets style for active lifestyles",
    image: "https://images.unsplash.com/photo-1506629905607-b9f9be777d5b?w=400&h=300&fit=crop",
    itemCount: 41,
    trending: true
  },
  {
    id: 6,
    name: "Vintage Revival",
    description: "Timeless classics with a modern twist",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop",
    itemCount: 35,
    trending: false
  }
];

const products = [
  {
    id: 1,
    name: "Floral Summer Dress",
    price: 89.99,
    originalPrice: 120.00,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop",
    rating: 4.8,
    reviews: 124,
    isNew: true,
    isSale: true,
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1']
  },
  {
    id: 2,
    name: "Classic White Blazer",
    price: 149.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    rating: 4.9,
    reviews: 89,
    isNew: false,
    isSale: false,
    colors: ['#FFFFFF', '#000000', '#8B4513']
  },
  {
    id: 3,
    name: "Denim Casual Jacket",
    price: 79.99,
    originalPrice: 95.00,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=400&fit=crop",
    rating: 4.6,
    reviews: 156,
    isNew: false,
    isSale: true,
    colors: ['#4169E1', '#000000', '#DCDCDC']
  },
  {
    id: 4,
    name: "Silk Evening Gown",
    price: 299.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1566479179817-c0ee8b4b8b55?w=300&h=400&fit=crop",
    rating: 5.0,
    reviews: 67,
    isNew: true,
    isSale: false,
    colors: ['#800080', '#FF1493', '#000000']
  },
  {
    id: 5,
    name: "Sport Leggings",
    price: 59.99,
    originalPrice: 75.00,
    image: "https://images.unsplash.com/photo-1506629905607-b9f9be777d5b?w=300&h=400&fit=crop",
    rating: 4.7,
    reviews: 203,
    isNew: false,
    isSale: true,
    colors: ['#000000', '#FF69B4', '#32CD32']
  },
  {
    id: 6,
    name: "Vintage Midi Skirt",
    price: 69.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=400&fit=crop",
    rating: 4.5,
    reviews: 98,
    isNew: false,
    isSale: false,
    colors: ['#D2691E', '#8B4513', '#A0522D']
  }
];


const Collections = () => {
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState({});

  const toggleWishlist = (productId) => {
    setIsWishlisted(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const ProductCard = ({ product }) => (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative overflow-hidden aspect-[3/4]">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.isNew && (
            <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              NEW
            </span>
          )}
          {product.isSale && (
            <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {Math.round(100 - (product.price / product.originalPrice * 100))}% OFF
            </span>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button 
            onClick={() => toggleWishlist(product.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${isWishlisted[product.id] ? 'bg-red-500/90 text-white' : 'bg-white/80 text-gray-700 hover:bg-white'}`}
          >
            <Heart 
              className={`w-4 h-4 ${isWishlisted[product.id] ? 'fill-current' : ''}`} 
            />
          </button>
          <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white transition-all opacity-0 group-hover:opacity-100">
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <button className="text-gray-400 hover:text-blue-500">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {product.colors.map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-gray-200 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                title={`Color ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const CollectionCard = ({ collection }) => (
    <div 
      className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
      onClick={() => setSelectedCollection(collection)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={collection.image} 
          alt={collection.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {collection.trending && (
          <div className="absolute top-4 left-4 flex items-center gap-1 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            <TrendingUp className="w-3 h-3" />
            TRENDING
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-xl font-bold mb-1">{collection.name}</h3>
          <p className="text-sm text-gray-200 mb-3 line-clamp-2">{collection.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {collection.itemCount} items
            </span>
            <button className="text-white hover:text-blue-200 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (selectedCollection) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Collection header */}
            <div className="mb-12">
              <button 
                onClick={() => setSelectedCollection(null)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Collections
              </button>
              
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    {selectedCollection.name}
                  </h1>
                  <p className="text-gray-600 max-w-2xl">{selectedCollection.description}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">
                    {selectedCollection.itemCount} items
                  </span>
                  <div className="w-px h-6 bg-gray-200"></div>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                      aria-label="Grid view"
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                      aria-label="List view"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and filter bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search in collection..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination would go here */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  Previous
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  3
                </button>
                <span className="px-2">...</span>
                <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 font-medium text-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              Curated Collections
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
              Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Next Favorite</span>
            </h1>
            
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Explore our carefully curated collections designed to elevate your wardrobe for every occasion.
            </p>
          </div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {collections.map(collection => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>

          {/* Featured Products Section */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
                <p className="text-gray-600">Hand-picked favorites from our latest collections</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                View all
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Can't Find What You're Looking For?</h3>
            <p className="text-blue-100 max-w-2xl mx-auto mb-6">
              Our personal stylists can help you find the perfect pieces for your wardrobe.
            </p>
            <button className="bg-white text-blue-600 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Get Style Advice
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Collections;