import React from "react";
import SubcategoryPage from "../../../../components/Users/SubcategoryPage";

const kidsShortsProducts = [
  {
    id: 1,
    name: "Casual Cotton Shorts",
    description: "Soft cotton shorts perfect for summer playtime.",
    price: 799,
    image: "https://images.unsplash.com/photo-1618354691373-3b4bbfefef0e?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    colors: ["#FFD700", "#FFA500", "#FF6347"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
  },
  {
    id: 2,
    name: "Denim Shorts",
    description: "Stylish and durable denim shorts for everyday wear.",
    price: 999,
    image: "https://images.unsplash.com/photo-1585432959440-89ab9e75c47d?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    colors: ["#1E90FF", "#000080"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
  },
  {
    id: 3,
    name: "Sports Shorts",
    description: "Breathable sports shorts for active kids.",
    price: 699,
    image: "https://images.unsplash.com/photo-1602810318383-e8e4d98e24c6?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    colors: ["#000000", "#696969", "#FF4500"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
  },
  {
    id: 4,
    name: "Patterned Beach Shorts",
    description: "Fun patterned shorts for beach days and vacations.",
    price: 899,
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80",
    rating: 4.4,
    colors: ["#00CED1", "#20B2AA", "#F0E68C"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
  },
];

const KidsShorts = () => (
  <SubcategoryPage
    categoryLabel="Kids"
    subcategoryLabel="Shorts"
    query="kids shorts fashion summer"
    accent="from-yellow-600/70 to-transparent"
    staticProducts={kidsShortsProducts}
  />
);

export default KidsShorts;
