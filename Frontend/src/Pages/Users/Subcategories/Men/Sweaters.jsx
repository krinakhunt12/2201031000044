import React from "react";
import SubcategoryPage from "../../../../components/Users/SubcategoryPage";

const sweaterProducts = [
  {
    id: 1,
    name: "Cable Knit Sweater",
    description: "Classic cable knit design in warm wool blend.",
    price: 1999,
    image: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    colors: ["#FFFFFF", "#B22222"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Chunky Turtleneck Sweater",
    description: "Oversized turtleneck sweater for ultimate winter coziness.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1556909218-31e7c593f73e?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    colors: ["#A0522D", "#F5F5DC"],
    sizes: ["M", "L", "XL"],
  },
  {
    id: 3,
    name: "Striped Pullover Sweater",
    description: "Casual striped pullover made with soft cotton yarn.",
    price: 1799,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    colors: ["#1E90FF", "#FFFFFF"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 4,
    name: "V-Neck Wool Sweater",
    description: "Slim-fit V-neck wool sweater, perfect for layering.",
    price: 2199,
    image: "https://images.unsplash.com/photo-1602810313185-6e571ed4cc9a?auto=format&fit=crop&w=600&q=80",
    rating: 4.4,
    colors: ["#696969", "#000000"],
    sizes: ["S", "M", "L", "XL"],
  },
];

const MenSweaters = () => (
  <SubcategoryPage
    categoryLabel="Men"
    subcategoryLabel="Sweaters"
    query="men sweaters fashion knitwear"
    staticProducts={sweaterProducts}
  />
);

export default MenSweaters;
