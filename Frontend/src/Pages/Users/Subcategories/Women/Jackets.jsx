import React from "react";
import SubcategoryPage from "../../../../components/Users/SubcategoryPage";

const jacketsProducts = [
  {
    id: 1,
    name: "Faux Leather Moto Jacket",
    description: "Chic faux leather moto jacket with a fitted silhouette.",
    price: 3499,
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    colors: ["#000000", "#8B0000"],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 2,
    name: "Wool Blend Long Coat",
    description: "Elegant wool blend coat with a tailored finish.",
    price: 4999,
    image: "https://images.unsplash.com/photo-1602810313199-74efdd54c0af?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    colors: ["#808080", "#FFFFFF"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "Denim Cropped Jacket",
    description: "Trendy cropped denim jacket with distressed details.",
    price: 2599,
    image: "https://images.unsplash.com/photo-1520975918318-3c5f7f69d42e?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    colors: ["#1E90FF", "#000000"],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 4,
    name: "Puffer Parka",
    description: "Warm puffer parka with detachable hood for winter.",
    price: 3999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    colors: ["#000000", "#2F4F4F"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
];

const WomenJackets = () => (
  <SubcategoryPage
    categoryLabel="Women"
    subcategoryLabel="Jackets"
    query="women jackets fashion outerwear"
    accent="from-emerald-700/70 to-transparent"
    staticProducts={jacketsProducts}
  />
);

export default WomenJackets;
