import React from "react";
import SubcategoryPage from "../../../../components/Users/SubcategoryPage";

const sweatersProducts = [
  {
    id: 1,
    name: "Chunky Knit Oversized Sweater",
    description: "Cozy oversized sweater made from chunky knit fabric for ultimate warmth.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1602810313199-74efdd54c0af?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    colors: ["#B22222", "#000000", "#D2B48C"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Cable Knit Turtleneck Sweater",
    description: "Classic cable knit turtleneck for timeless winter style.",
    price: 2699,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    colors: ["#F5F5DC", "#808080", "#8B4513"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "Striped Pullover Sweater",
    description: "Lightweight striped pullover perfect for layering.",
    price: 1999,
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0d522d4?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    colors: ["#FFFFFF", "#1E90FF", "#FFD700"],
    sizes: ["S", "M", "L"],
  },
  {
    id: 4,
    name: "Cropped Cardigan Sweater",
    description: "Trendy cropped cardigan with button-down front.",
    price: 1799,
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    colors: ["#FFC0CB", "#708090"],
    sizes: ["XS", "S", "M", "L"],
  },
];

const WomenSweaters = () => (
  <SubcategoryPage
    categoryLabel="Women"
    subcategoryLabel="Sweaters"
    query="women sweaters fashion knitwear"
    accent="from-teal-700/70 to-transparent"
    staticProducts={sweatersProducts}
  />
);

export default WomenSweaters;
