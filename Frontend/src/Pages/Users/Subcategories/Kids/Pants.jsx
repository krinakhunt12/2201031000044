import React from "react";
import SubcategoryPage from "../../../../components/Users/SubcategoryPage";

const kidsPantsProducts = [
  {
    id: 1,
    name: "Cotton Cargo Pants",
    description: "Comfortable cotton cargo pants with multiple pockets.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1585790050230-5ddc3d8c8f89?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    colors: ["#2F4F4F", "#8B4513"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
  },
  {
    id: 2,
    name: "Denim Jeans",
    description: "Classic blue jeans for kids, durable and stylish.",
    price: 1499,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    colors: ["#1E90FF", "#000080"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
  },
  {
    id: 3,
    name: "Jogger Pants",
    description: "Soft joggers perfect for playtime and lounging.",
    price: 999,
    image: "https://images.unsplash.com/photo-1520975918318-3c5f7f69d42e?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    colors: ["#000000", "#696969", "#A9A9A9"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
  },
  {
    id: 4,
    name: "Chino Pants",
    description: "Stylish chinos for casual and formal occasions.",
    price: 1399,
    image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=600&q=80",
    rating: 4.4,
    colors: ["#D2B48C", "#A0522D"],
    sizes: ["2-3Y", "4-5Y", "6-7Y"],
  },
];

const KidsPants = () => (
  <SubcategoryPage
    categoryLabel="Kids"
    subcategoryLabel="Pants"
    query="kids pants fashion"
    accent="from-green-700/70 to-transparent"
    staticProducts={kidsPantsProducts}
  />
);

export default KidsPants;
