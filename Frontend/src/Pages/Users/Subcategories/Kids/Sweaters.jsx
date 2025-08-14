import React from "react";
import SubcategoryPage from "../../../../components/Users/SubcategoryPage";

const kidsSweatersProducts = [
  {
    id: 1,
    name: "Cozy Knit Sweater",
    description: "Warm and soft sweater, perfect for chilly days.",
    price: 899,
    image: "https://images.unsplash.com/photo-1618354691374-3b4bbfefef1f?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    colors: ["#FFC0CB", "#87CEFA", "#F0E68C"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
  },
  {
    id: 2,
    name: "Striped Sweater",
    description: "Cute striped sweater for everyday wear.",
    price: 999,
    image: "https://images.unsplash.com/photo-1602810318384-e8e4d98e24c7?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    colors: ["#FF6347", "#00CED1"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
  },
  {
    id: 3,
    name: "Hooded Sweater",
    description: "Sweater with a cozy hood for extra warmth.",
    price: 1099,
    image: "https://images.unsplash.com/photo-1587300003389-59208cc962cc?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    colors: ["#8B4513", "#2E8B57"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
  },
];

const KidsSweaters = () => (
  <SubcategoryPage
    categoryLabel="Kids"
    subcategoryLabel="Sweaters"
    query="kids sweaters fashion knitwear"
    accent="from-indigo-700/70 to-transparent"
    staticProducts={kidsSweatersProducts}
  />
);

export default KidsSweaters;
