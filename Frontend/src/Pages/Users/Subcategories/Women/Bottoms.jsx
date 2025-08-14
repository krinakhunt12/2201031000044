import React from "react";
import SubcategoryPage from "../../../../components/Users/SubcategoryPage";

const bottomsProducts = [
  {
    id: 1,
    name: "High-Waist Skinny Jeans",
    description: "Stretchable skinny jeans with a flattering high-rise fit.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    colors: ["#000000", "#1E90FF"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Pleated Wide-Leg Trousers",
    description: "Elegant pleated trousers for a sophisticated look.",
    price: 2799,
    image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    colors: ["#808080", "#FFFFFF"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "Denim A-Line Skirt",
    description: "Classic denim skirt with A-line cut and front buttons.",
    price: 1899,
    image: "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    colors: ["#1E90FF", "#000000"],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 4,
    name: "Tailored Cigarette Pants",
    description: "Slim-fit cigarette pants perfect for office wear.",
    price: 2599,
    image: "https://images.unsplash.com/photo-1602810313199-74efdd54c0af?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    colors: ["#000000", "#2F4F4F"],
    sizes: ["S", "M", "L", "XL"],
  },
];

const WomenBottoms = () => (
  <SubcategoryPage
    categoryLabel="Women"
    subcategoryLabel="Bottoms"
    query="women jeans skirt trousers fashion"
    accent="from-fuchsia-700/70 to-transparent"
    staticProducts={bottomsProducts}
  />
);

export default WomenBottoms;
