import React from "react";
import SubcategoryPage from "../../../../components/Users/SubcategoryPage";

const jacketsProducts = [
  {
    id: 1,
    name: "Leather Biker Jacket",
    description: "Classic black leather biker jacket with zip details.",
    price: 4999,
    image: "https://images.unsplash.com/photo-1602810313199-74efdd54c0af?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    colors: ["#000000", "#2F4F4F"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Denim Trucker Jacket",
    description: "Vintage-style denim trucker jacket with button closure.",
    price: 2999,
    image: "https://images.unsplash.com/photo-1520975918318-3c5f7f69d42e?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    colors: ["#1E90FF", "#708090"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "Puffer Winter Jacket",
    description: "Warm puffer jacket with quilted design for winter comfort.",
    price: 3999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    colors: ["#000000", "#FF0000"],
    sizes: ["M", "L", "XL", "XXL"],
  },
  {
    id: 4,
    name: "Bomber Jacket",
    description: "Lightweight bomber jacket for casual streetwear style.",
    price: 3499,
    image: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    colors: ["#808080", "#000000"],
    sizes: ["S", "M", "L", "XL"],
  },
];


const MenJackets = () => (
  <SubcategoryPage
    categoryLabel="Men"
    subcategoryLabel="Jackets"
    query="men jackets fashion outerwear"
    staticProducts={jacketsProducts} // ✅ This passes the products
  />
);

export default MenJackets;


