import React from "react";
import SubcategoryPage from "../../../../components/Users/SubcategoryPage";

const tshirtProducts = [
  {
    id: 1,
    name: "Classic White Tee",
    description: "Soft cotton T-shirt with a regular fit and timeless design.",
    price: 799,
    image: "https://images.unsplash.com/photo-1626808642875-0aa545482dfb",
    rating: 4.5,
    colors: ["#FFFFFF", "#000000"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Black Minimal Tee",
    description: "Versatile black T-shirt with premium finish and comfort.",
    price: 899,
    image: "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    colors: ["#000000", "#333333"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "Graphic Print Tee",
    description: "Trendy T-shirt with eye-catching front graphic print.",
    price: 999,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
    rating: 4.3,
    colors: ["#FF5733", "#FFFFFF"],
    sizes: ["M", "L", "XL"],
  },
  {
    id: 4,
    name: "Striped Cotton Tee",
    description: "Breathable striped T-shirt for a casual, laid-back look.",
    price: 849,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    colors: ["#FFFFFF", "#1E90FF"],
    sizes: ["S", "M", "L"],
  },
  {
    id: 5,
    name: "Oversized Streetwear Tee",
    description: "Loose-fit oversized T-shirt for ultimate streetwear vibes.",
    price: 1099,
    image: "https://images.unsplash.com/photo-1602293589930-45aadba6d8a9?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    colors: ["#808080", "#000000"],
    sizes: ["M", "L", "XL", "XXL"],
  },
  {
    id: 6,
    name: "V-Neck Slim Fit Tee",
    description: "Elegant V-neck T-shirt that pairs perfectly with jeans.",
    price: 899,
    image: "https://images.unsplash.com/photo-1624388128898-31c64e96f8d6?auto=format&fit=crop&w=600&q=80",
    rating: 4.4,
    colors: ["#FFFFFF", "#2F4F4F"],
    sizes: ["S", "M", "L"],
  },
  {
    id: 7,
    name: "Sporty Dry-Fit Tee",
    description: "Quick-dry athletic T-shirt for workouts and outdoor activities.",
    price: 1199,
    image: "https://images.unsplash.com/photo-1593032457864-5dbf73b2a210?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    colors: ["#0000FF", "#87CEEB"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 8,
    name: "Casual Henley Tee",
    description: "Buttoned Henley neck T-shirt in breathable cotton fabric.",
    price: 949,
    image: "https://images.unsplash.com/photo-1575910160510-2cce2d29350d?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    colors: ["#F5F5DC", "#8B4513"],
    sizes: ["M", "L", "XL"],
  },
  {
    id: 9,
    name: "Tie-Dye Summer Tee",
    description: "Bright and colorful tie-dye T-shirt for a relaxed summer vibe.",
    price: 999,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    colors: ["#FF69B4", "#FFD700", "#00CED1"],
    sizes: ["S", "M", "L"],
  },
  {
    id: 10,
    name: "Polo Collar Tee",
    description: "Classic polo T-shirt with soft fabric and structured collar.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    colors: ["#006400", "#FFFFFF"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 11,
    name: "Basic Crew Neck Tee",
    description: "Essential crew neck T-shirt for everyday wear.",
    price: 699,
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=600&q=80",
    rating: 4.4,
    colors: ["#808080", "#000000"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 12,
    name: "Long Sleeve Tee",
    description: "Comfortable long-sleeve T-shirt perfect for layering.",
    price: 1049,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    colors: ["#FFFFFF", "#708090"],
    sizes: ["M", "L", "XL", "XXL"],
  },
];

const MenTshirts = () => (
  <SubcategoryPage
    categoryLabel="Men"
    subcategoryLabel="T-Shirts"
    query="men tshirt fashion"
    staticProducts={tshirtProducts}
  />
);

export default MenTshirts;
