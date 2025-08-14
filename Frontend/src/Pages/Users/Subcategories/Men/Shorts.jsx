import React from "react";
import SubcategoryPage from "../../../../components/Users/SubcategoryPage";

const shortsProducts = [
  {
    id: 1,
    name: "Classic Denim Shorts",
    description: "Timeless blue denim shorts with a relaxed fit.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1520975918319-94f61c173881?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    colors: ["#1E90FF", "#000000"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Chino Casual Shorts",
    description: "Lightweight chino shorts perfect for summer outings.",
    price: 1199,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    colors: ["#F5F5DC", "#2F4F4F"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "Athletic Dry-Fit Shorts",
    description: "Breathable sports shorts for workouts and running.",
    price: 999,
    image: "https://images.unsplash.com/photo-1600185365529-39993b8a5400?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    colors: ["#000000", "#FF0000"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 4,
    name: "Cargo Utility Shorts",
    description: "Durable cargo shorts with multiple pockets.",
    price: 1399,
    image: "https://images.unsplash.com/photo-1602294141046-06640f78b649?auto=format&fit=crop&w=600&q=80",
    rating: 4.4,
    colors: ["#8B4513", "#000000"],
    sizes: ["M", "L", "XL", "XXL"],
  },
];

const MenShorts = () => (
  <SubcategoryPage
    categoryLabel="Men"
    subcategoryLabel="Shorts"
    query="men shorts fashion summer"
    staticProducts={shortsProducts}
  />
);

export default MenShorts;
