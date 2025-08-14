import React from "react";
import SubcategoryPage from "../../../../components/Users/SubcategoryPage";

const dressesProducts = [
  {
    id: 1,
    name: "Floral Summer Dress",
    description: "Lightweight floral dress perfect for summer outings.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1520975918318-3c5f7f69d42e?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    colors: ["#FFC0CB", "#FF69B4"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Elegant Evening Gown",
    description: "Long flowing gown for special occasions.",
    price: 5999,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    colors: ["#000000", "#800080"],
    sizes: ["S", "M", "L"],
  },
  {
    id: 3,
    name: "Casual Shirt Dress",
    description: "Comfortable shirt-style dress for everyday wear.",
    price: 1999,
    image: "https://images.unsplash.com/photo-1555529771-35a38b34e8c6?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    colors: ["#FFFFFF", "#87CEFA"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 4,
    name: "Bodycon Party Dress",
    description: "Fitted bodycon dress for parties and events.",
    price: 3499,
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0d16d4c?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    colors: ["#FF0000", "#800000"],
    sizes: ["S", "M", "L"],
  },
];

const WomenDresses = () => (
  <SubcategoryPage
    categoryLabel="Women"
    subcategoryLabel="Dresses"
    query="women dresses fashion summer"
    accent="from-pink-700/70 to-transparent"
    staticProducts={dressesProducts}
  />
);

export default WomenDresses;
