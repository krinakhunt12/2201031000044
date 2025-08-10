// File: pages/ProductDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const productData = {
  1: { name: "Silk Midi Dress", price: "$189.99", description: "Elegant silk midi dress with a flattering silhouette.", image: "https://picsum.photos/400/500?random=21" },
  2: { name: "Leather Jacket", price: "$299.99", description: "Premium leather jacket for timeless style.", image: "https://picsum.photos/400/500?random=22" },
  3: { name: "Sneakers", price: "$159.99", description: "Comfortable designer sneakers with a modern twist.", image: "https://picsum.photos/400/500?random=23" },
  4: { name: "Sweater", price: "$229.99", description: "Soft cashmere sweater perfect for layering.", image: "https://picsum.photos/400/500?random=24" },
};

const ProductDetail = () => {
  const { id } = useParams();
  const product = productData[id];

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl" />
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl text-purple-600 mb-4">{product.price}</p>
            <p className="text-gray-700 mb-8">{product.description}</p>
            <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition">Add to Cart</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
