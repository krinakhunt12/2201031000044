import React from "react";
import SubcategoryPage from "../../../../components/Users/SubcategoryPage";

const kidsDressesProducts = [
  {
    id: 1,
    name: "Floral Party Dress",
    description: "Adorable floral print dress perfect for birthday parties.",
    price: 1499,
    image: "https://images.unsplash.com/photo-1588854337221-4c0b3e0c88d3?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    colors: ["#FFC0CB", "#FFFFFF", "#FFD700"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
  },
  {
    id: 2,
    name: "Casual Cotton Dress",
    description: "Lightweight cotton dress for everyday comfort.",
    price: 999,
    image: "https://images.unsplash.com/photo-1520975918318-3c5f7f69d42e?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    colors: ["#87CEFA", "#F5F5F5", "#90EE90"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
  },
  {
    id: 3,
    name: "Princess Tulle Dress",
    description: "Fairytale-inspired dress with layered tulle skirt.",
    price: 1999,
    image: "https://images.unsplash.com/photo-1600976075320-bf8d07f1ad23?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    colors: ["#FF69B4", "#FFFFFF", "#E6E6FA"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
  },
  {
    id: 4,
    name: "Striped Summer Dress",
    description: "Breathable cotton dress with colorful stripes.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1585325701960-45c72e2df481?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    colors: ["#FFFFFF", "#FF6347", "#1E90FF"],
    sizes: ["2-3Y", "4-5Y", "6-7Y"],
  },
];

const KidsDresses = () => (
  <SubcategoryPage
    categoryLabel="Kids"
    subcategoryLabel="Dresses"
    query="kids dresses fashion"
    accent="from-pink-700/70 to-transparent"
    staticProducts={kidsDressesProducts}
  />
);

export default KidsDresses;
