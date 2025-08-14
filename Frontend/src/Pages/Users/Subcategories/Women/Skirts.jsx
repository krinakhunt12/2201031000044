import React from "react";
import SubcategoryPage from "../../../../components/Users/SubcategoryPage";

const skirtsProducts = [
  {
    id: 1,
    name: "Pleated Midi Skirt",
    description: "Flowy pleated skirt perfect for office and casual outings.",
    price: 1999,
    image: "https://images.unsplash.com/photo-1618354691438-25e59e44b48f?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    colors: ["#FFC0CB", "#FFFFFF"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Denim Mini Skirt",
    description: "Classic blue denim mini skirt with front button closure.",
    price: 1799,
    image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    colors: ["#1E90FF", "#708090"],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 3,
    name: "High-Waist Pencil Skirt",
    description: "Elegant pencil skirt for a sleek and professional look.",
    price: 2299,
    image: "https://images.unsplash.com/photo-1602810313199-74efdd54c0af?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    colors: ["#000000", "#A9A9A9"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 4,
    name: "Floral Wrap Skirt",
    description: "Lightweight wrap skirt with colorful floral prints.",
    price: 1599,
    image: "https://images.unsplash.com/photo-1618354691438-25e59e44b48f?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    colors: ["#FF6347", "#FFD700"],
    sizes: ["S", "M", "L", "XL"],
  },
];

const WomenSkirts = () => (
  <SubcategoryPage
    categoryLabel="Women"
    subcategoryLabel="Skirts"
    query="women skirts fashion"
    accent="from-purple-700/70 to-transparent"
    staticProducts={skirtsProducts}
  />
);

export default WomenSkirts;
