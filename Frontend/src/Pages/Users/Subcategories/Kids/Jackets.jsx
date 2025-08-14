import React from "react";
import SubcategoryPage from "../../../../components/Users/SubcategoryPage";

const kidsJacketsProducts = [
  {
    id: 1,
    name: "Puffer Winter Jacket",
    description: "Warm quilted jacket for chilly days.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1602810313199-74efdd54c0af?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    colors: ["#000000", "#1E90FF", "#FF4500"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
  },
  {
    id: 2,
    name: "Denim Jacket",
    description: "Classic blue denim jacket with front buttons.",
    price: 1799,
    image: "https://images.unsplash.com/photo-1520975918318-3c5f7f69d42e?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    colors: ["#1E90FF", "#708090"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
  },
  {
    id: 3,
    name: "Hooded Rain Jacket",
    description: "Waterproof jacket with adjustable hood.",
    price: 1599,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    colors: ["#FFD700", "#00CED1"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
  },
  {
    id: 4,
    name: "Bomber Jacket",
    description: "Lightweight bomber jacket for everyday wear.",
    price: 1999,
    image: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    colors: ["#808080", "#000000", "#FF6347"],
    sizes: ["2-3Y", "4-5Y", "6-7Y"],
  },
];

const KidsJackets = () => (
  <SubcategoryPage
    categoryLabel="Kids"
    subcategoryLabel="Jackets"
    query="kids jackets fashion outerwear"
    accent="from-orange-700/70 to-transparent"
    staticProducts={kidsJacketsProducts}
  />
);

export default KidsJackets;
