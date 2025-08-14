import React from "react";
import SubcategoryPage from "../../../../components/Users/SubcategoryPage";

const kidsTshirtsProducts = [
  {
    id: 1,
    name: "Graphic Tee",
    description: "Fun graphic t-shirt for everyday play.",
    price: 499,
    image: "https://images.unsplash.com/photo-1602810318367-8e9bb0f2342d?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    colors: ["#FF4500", "#1E90FF", "#32CD32"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
  },
  {
    id: 2,
    name: "Striped Tee",
    description: "Soft striped t-shirt perfect for summer.",
    price: 599,
    image: "https://images.unsplash.com/photo-1618354691371-cc5fbb8f9f1b?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    colors: ["#FFD700", "#FF69B4"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
  },
  {
    id: 3,
    name: "Basic Tee",
    description: "Simple cotton t-shirt for casual wear.",
    price: 449,
    image: "https://images.unsplash.com/photo-1587300003389-59208cc962cc?auto=format&fit=crop&w=600&q=80",
    rating: 4.4,
    colors: ["#FFFFFF", "#000000", "#808080"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
  },
];

const KidsTshirts = () => (
  <SubcategoryPage
    categoryLabel="Kids"
    subcategoryLabel="T-Shirts"
    query="kids tshirts fashion"
    accent="from-blue-700/70 to-transparent"
    staticProducts={kidsTshirtsProducts}
  />
);

export default KidsTshirts;
