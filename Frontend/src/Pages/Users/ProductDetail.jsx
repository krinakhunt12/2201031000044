// File: pages/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, Share2, Truck, Shield, ArrowLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToCart } from '../../features/cart/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../features/wishlist/wishlistSlice';
import { useToast } from '../../contexts/ToastContext';
import Navbar from '../../components/Users/Navbar';
import Footer from '../../components/Users/Footer';
import { searchProducts } from '../../services/searchService';
import { API_BASE_API } from '../../config/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showSuccess } = useToast();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  
  const { items: wishlistItems } = useAppSelector(state => state.wishlist);
  const isWishlisted = wishlistItems.some(item => item.id === parseInt(id));

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        // Try fetching product list from backend and find by id
        const res = await fetch(`${API_BASE_API}/products`);
        if (res.ok) {
          const json = await res.json();
          const list = json.products || [];
          const found = list.find(p => String(p._id) === String(id) || String(p.id) === String(id));
          if (found) {
            // normalize fields
            const normalized = {
              ...found,
              name: found.name || found.title || `Product ${id}`,
              sizes: found.size || found.sizes || [],
              colors: found.color || found.colors || [],
              images: found.images || found.photos || (found.image ? [found.image] : []),
            };
            setProduct(normalized);
            setSelectedSize(normalized.sizes?.[0] || '');
            setSelectedColor(normalized.colors?.[0] || '');
            return;
          }
        }

        // Fallback: try searchService (local constants) then demo fallback
        const results = await searchProducts(`id:${id}`, 1);
        if (results.length > 0) {
          const foundProduct = results[0];
          setProduct(foundProduct);
          setSelectedSize(foundProduct.sizes?.[0] || '');
          setSelectedColor(foundProduct.colors?.[0] || '');
        } else {
          // Demo fallback
          setProduct({
            id: id,
            name: `Product ${id}`,
            price: 1999,
            description: 'This is a premium quality product with excellent craftsmanship and modern design. Perfect for everyday wear and special occasions.',
            image: `https://source.unsplash.com/600x800/?fashion&sig=${id}`,
            images: [
              `https://source.unsplash.com/600x800/?fashion&sig=${id}`,
              `https://source.unsplash.com/600x800/?clothing&sig=${id}`,
              `https://source.unsplash.com/600x800/?style&sig=${id}`,
            ],
            rating: 4.5,
            reviews: 128,
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['#000000', '#FFFFFF', '#FF6B6B', '#4ECDC4'],
            category: 'Fashion',
            brand: 'Stylon',
            inStock: true,
            features: [
              'Premium quality material',
              'Comfortable fit',
              'Easy to maintain',
              'Versatile design'
            ]
          });
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      showSuccess('Please select a size');
      return;
    }
    
    dispatch(addToCart({
      ...product,
      quantity,
      selectedSize,
      selectedColor,
    }));
    showSuccess('Added to cart');
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist({ id: product.id }));
      showSuccess('Removed from wishlist');
    } else {
      dispatch(addToWishlist(product));
      showSuccess('Added to wishlist');
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-200 h-96 rounded-xl"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = product.images || [product.image];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover cursor-pointer"
                  onError={(e)=>{
                    if (e.currentTarget.dataset.hasError) return;
                    e.currentTarget.dataset.hasError = 'true';
                    const pt = product.productType || product.type || '';
                    if (/t-?shirts?|tshirts?/i.test(pt)) {
                      e.currentTarget.src = `https://source.unsplash.com/800x800/?tshirt&sig=${product._id || product.id}`;
                    } else if (/kurti/i.test(pt)) {
                      e.currentTarget.src = `https://source.unsplash.com/800x800/?kurti&sig=${product._id || product.id}`;
                    } else {
                      e.currentTarget.src = `https://source.unsplash.com/800x800/?fashion&sig=${product._id || product.id}`;
                    }
                  }}
                />
              </div>
              
              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors cursor-pointer ${
                        activeImage === index ? 'border-black' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover cursor-pointer"
                        onError={(e)=>{ if (!e.currentTarget.dataset.hasError) { e.currentTarget.dataset.hasError='true'; e.currentTarget.src=`https://source.unsplash.com/400x400/?fashion&sig=${index}` } }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{product.brand}</span>
                </div>
              </div>

              {/* Price */}
              <div>
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="ml-2 text-lg text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                          selectedSize === size
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Color</h3>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor === color
                            ? 'border-black scale-110'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Add to Cart
                </button>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleWishlistToggle}
                    className={`flex-1 py-3 border rounded-lg font-medium transition-colors ${
                      isWishlisted
                        ? 'border-red-300 bg-red-50 text-red-600 hover:bg-red-100'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? 'fill-current' : ''}`} />
                    {isWishlisted ? 'Wishlisted' : 'Wishlist'}
                  </button>
                  
                  <button className="flex-1 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors">
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </button>
                </div>
              </div>

              {/* Features */}
              {product.features && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Shipping Info */}
              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Truck className="w-5 h-5 mr-2" />
                    Free shipping on orders over ₹999
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="w-5 h-5 mr-2" />
                    30-day return policy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
