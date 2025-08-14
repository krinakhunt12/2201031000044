import React from "react";
import SubcategoryPage from "../../../../components/Users/SubcategoryPage";

const topsProducts = [
  {
    id: 1,
    name: "Chiffon Blouse",
    description: "Light and airy chiffon blouse for casual and formal wear.",
    price: 1799,
    image: "https://images.unsplash.com/photo-1520975918318-3c5f7f69d42e?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    colors: ["#FFFFFF", "#FFC0CB"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Silk Camisole",
    description: "Luxurious silk camisole perfect for layering.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1589308078055-6398c0d82b60?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    colors: ["#000000", "#FFD700"],
    sizes: ["S", "M", "L"],
  },
  {
    id: 3,
    name: "Cotton Crop Top",
    description: "Breathable cotton crop top for a trendy summer look.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    colors: ["#FF69B4", "#87CEFA"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 4,
    name: "Off-Shoulder Top",
    description: "Elegant off-shoulder design for evening outings.",
    price: 1999,
    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    colors: ["#8B0000", "#FFC0CB"],
    sizes: ["S", "M", "L"],
  },
];

const WomenTops = () => (
  <SubcategoryPage
    categoryLabel="Women"
    subcategoryLabel="Tops"
    query="women tops blouse fashion"
    accent="from-rose-700/70 to-transparent"
    staticProducts={topsProducts}
  />
);

export default WomenTops;
