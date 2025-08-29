import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  HeartIcon,
  ArrowsPointingOutIcon,
  StarIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { productAPI } from "../../services/api";

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const formattedPrice = product.price?.toLocaleString("en-IN") || "0";

  // Handle photo URL
  const productImage = product.photos && product.photos.length > 0 
    ? (product.photos[0].startsWith('http') ? product.photos[0] : `${window.location.protocol}//${window.location.host}${product.photos[0]}`)
    : (product.image || "https://via.placeholder.com/400x500?text=No+Image");

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group relative">
      <div className="relative overflow-hidden">
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            if (e.currentTarget.dataset.hasError) return;
            e.currentTarget.dataset.hasError = 'true';
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://via.placeholder.com/400x500?text=No+Image';
          }}
        />
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm z-10"
        >
          {isWishlisted ? (
            <HeartIcon className="w-5 h-5 text-red-500" />
          ) : (
            <HeartOutline className="w-5 h-5 text-gray-600" />
          )}
        </button>
        <button
          onClick={() => setQuickViewOpen(true)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ArrowsPointingOutIcon className="w-4 h-4" /> Quick View
        </button>
        {product.id % 3 === 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
            SALE
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
            <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-xs font-medium">{product.rating || 4.5}</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">
          {product.description || "Premium quality product"}
        </p>
        
        {/* Show colors if available */}
        {product.colors && (
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xs text-gray-500">Colors:</span>
            <div className="flex space-x-1">
              {product.colors.map((color) => (
                <div
                  key={color}
                  className="w-4 h-4 rounded-full border border-gray-200"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Show sizes */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.sizes ? (
            product.sizes.map((size) => (
              <button
                key={size}
                className="text-xs border border-gray-200 px-2 py-1 rounded"
              >
                {size}
              </button>
            ))
          ) : (
            <span className="text-xs text-gray-500">Size: {product.size}</span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-pink-600 font-bold text-lg">₹{formattedPrice}</p>
          <button className="bg-gray-900 text-white p-2 rounded-lg flex items-center gap-1">
            <ShoppingBagIcon className="w-4 h-4" />{" "}
            <span className="text-sm">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const SubcategoryPage = ({
  categoryLabel,
  subcategoryLabel,
  query,
  accent = "from-black/70 to-transparent",
  ctaText = "Shop Now",
  staticProducts = null,
  category = null,
  productType = null,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      // If static products are provided, use them
      if (staticProducts) {
        setProducts(staticProducts);
        return;
      }

      // If category and productType are provided, fetch from API
      if (category && productType) {
        setLoading(true);
        setError(null);
        try {
          const response = await productAPI.getProductsByCategoryAndType(category, productType);
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
      }
    };

    fetchProducts();
  }, [staticProducts, category, productType]);

  const heroUrl = (() => {
    if (products?.[0]?.photos?.[0]) {
      const photoUrl = products[0].photos[0];
      return photoUrl.startsWith('http') ? photoUrl : `${window.location.protocol}//${window.location.host}${photoUrl}`;
    }
    if (products?.[0]?.image) {
      return products[0].image;
    }
    return `https://source.unsplash.com/1600x600/?${encodeURIComponent(query)}`;
  })();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden mb-10">
          <img
            src={heroUrl}
            alt={`${subcategoryLabel} - ${categoryLabel}`}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-r ${accent} flex items-center px-6 sm:px-10`}
          >
            <div className="max-w-2xl">
              <p className="text-sm sm:text-base text-gray-100/90 tracking-wider uppercase">
                {categoryLabel}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-1">
                {subcategoryLabel}
              </h1>
              <p className="text-gray-100/90 mt-3 max-w-xl">
                Discover our curated collection of {subcategoryLabel.toLowerCase()} for {categoryLabel.toLowerCase()}.
              </p>
              <button className="mt-5 inline-flex items-center px-5 py-2.5 rounded-full bg-black/80 backdrop-blur text-white text-sm font-medium hover:bg-black transition-colors">
                {ctaText}
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <section>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found in this category</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SubcategoryPage;
