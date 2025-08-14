import React from "react";
import SubcategoryPage from "../../../../components/Users/SubcategoryPage";

const jeansProducts = [
  {
    id: 1,
    name: "High-Waist Skinny Jeans",
    description: "Classic high-waist skinny jeans with stretch fabric for comfort.",
    price: 1999,
    image: "https://images.unsplash.com/photo-1593032465171-c7c11e02b364?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    colors: ["#000000", "#1C1C1C", "#003366"],
    sizes: ["26", "28", "30", "32", "34"],
  },
  {
    id: 2,
    name: "Wide-Leg Light Wash Jeans",
    description: "Relaxed wide-leg jeans with a vintage light blue wash.",
    price: 2299,
    image: "https://images.unsplash.com/photo-1583001230750-2117a3b6c5e6?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    colors: ["#87CEEB", "#4682B4"],
    sizes: ["26", "28", "30", "32", "34", "36"],
  },
  {
    id: 3,
    name: "Straight-Leg Cropped Jeans",
    description: "Trendy cropped straight-leg jeans for casual style.",
    price: 1899,
    image: "https://images.unsplash.com/photo-1602810313199-74efdd54c0af?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    colors: ["#2F4F4F", "#808080"],
    sizes: ["26", "28", "30", "32", "34"],
  },
  {
    id: 4,
    name: "Ripped Boyfriend Jeans",
    description: "Relaxed-fit ripped jeans for an edgy streetwear vibe.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1583001230750-2117a3b6c5e6?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    colors: ["#B0C4DE", "#000000"],
    sizes: ["26", "28", "30", "32", "34", "36"],
  },
];

const WomenJeans = () => (
  <SubcategoryPage
    categoryLabel="Women"
    subcategoryLabel="Jeans"
    query="women jeans fashion denim"
    accent="from-indigo-700/70 to-transparent"
    staticProducts={jeansProducts}
  />
);

export default WomenJeans;
