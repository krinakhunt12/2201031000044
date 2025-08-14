import React from "react";
import SubcategoryPage from "../../../../components/Users/SubcategoryPage";

const shirtsProducts = [
  {
    id: 1,
    name: "Oxford Cotton Shirt",
    description: "Classic Oxford shirt with button-down collar.",
    price: 1799,
    image: "https://images.unsplash.com/photo-1604908176997-3f5a5b67a77a?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    colors: ["#FFFFFF", "#0000FF"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Checked Flannel Shirt",
    description: "Warm flannel shirt with a relaxed fit and plaid pattern.",
    price: 1999,
    image: "https://images.unsplash.com/photo-1602810313185-6e571ed4cc9a?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    colors: ["#FF0000", "#000000"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "Linen Summer Shirt",
    description: "Lightweight linen shirt for cool summer comfort.",
    price: 1899,
    image: "https://images.unsplash.com/photo-1564224220687-1a4bf1c4c648?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    colors: ["#F5F5DC", "#708090"],
    sizes: ["M", "L", "XL"],
  },
  {
    id: 4,
    name: "Denim Chambray Shirt",
    description: "Casual chambray shirt with a rugged denim look.",
    price: 1699,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
    rating: 4.4,
    colors: ["#1E90FF", "#000000"],
    sizes: ["S", "M", "L", "XL"],
  },
];

const MenShirts = () => (
  <SubcategoryPage
    categoryLabel="Men"
    subcategoryLabel="Shirts"
    query="men shirts fashion"
    staticProducts={shirtsProducts}
  />
);

export default MenShirts;
