import React from "react";
import SubcategoryPage from "../../../../components/Users/SubcategoryPage";

const jeansProducts = [
  {
    id: 1,
    name: "Classic Blue Straight Jeans",
    description: "Timeless straight-fit jeans in durable denim.",
    price: 2299,
    image: "https://images.unsplash.com/photo-1583001808283-34c58d89f1c4?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    colors: ["#1E90FF", "#000000"],
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    id: 2,
    name: "Slim Fit Dark Wash Jeans",
    description: "Modern slim-fit jeans with dark wash finish.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    colors: ["#00008B", "#000000"],
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    id: 3,
    name: "Distressed Ripped Jeans",
    description: "Stylish distressed jeans with ripped detailing.",
    price: 2599,
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    colors: ["#708090", "#1E90FF"],
    sizes: ["30", "32", "34", "36"],
  },
  {
    id: 4,
    name: "Black Skinny Jeans",
    description: "Sleek black skinny jeans for a sharp casual look.",
    price: 2399,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    colors: ["#000000", "#2F4F4F"],
    sizes: ["28", "30", "32", "34", "36"],
  },
];

const MenJeans = () => (
  <SubcategoryPage
    categoryLabel="Men"
    subcategoryLabel="Jeans"
    query="men jeans fashion denim"
    staticProducts={jeansProducts}
  />
);

export default MenJeans;
