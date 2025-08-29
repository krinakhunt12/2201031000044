import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

// Define category-specific product types to eliminate duplicates
const categoryProductTypes = {
  Men: [
    { name: "T-Shirts", path: "tshirts", icon: "👕" },
    { name: "Shirts", path: "shirts", icon: "👔" },
    { name: "Jackets", path: "jackets", icon: "🧥" },
    { name: "Jeans", path: "jeans", icon: "👖" },
    { name: "Shorts", path: "shorts", icon: "🩳" },
    { name: "Sweaters", path: "sweaters", icon: "🧶" }
  ],
  Women: [
    { name: "Dresses", path: "dresses", icon: "👗" },
    { name: "Tops", path: "tops", icon: "👚" },
    { name: "Skirts", path: "skirts", icon: "👘" },
    { name: "Jeans", path: "jeans", icon: "👖" },
    { name: "Jackets", path: "jackets", icon: "🧥" },
    { name: "Sweaters", path: "sweaters", icon: "🧶" }
  ],
  Kids: [
    { name: "T-Shirts", path: "tshirts", icon: "👕" },
    { name: "Dresses", path: "dresses", icon: "👗" },
    { name: "Pants", path: "pants", icon: "👖" },
    { name: "Jackets", path: "jackets", icon: "🧥" },
    { name: "Sweaters", path: "sweaters", icon: "🧶" },
    { name: "Shorts", path: "shorts", icon: "🩳" }
  ]
};

const DynamicNavigation = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleCategoryHover = (category) => {
    setHoveredCategory(category);
  };

  const handleCategoryLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <div className="relative group">
      <span className="cursor-pointer text-gray-800 hover:text-black font-medium">
        Shop
      </span>
      
      {/* Main Categories Dropdown */}
      <div className="absolute top-full left-0 mt-2 flex bg-white shadow-lg border border-gray-100 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-40">
        <div className="w-56 py-2">
          {Object.keys(categoryProductTypes).map((category) => (
            <div 
              key={category} 
              className="relative group/sub"
              onMouseEnter={() => handleCategoryHover(category)}
              onMouseLeave={handleCategoryLeave}
            >
              <Link
                to={`/category/${category.toLowerCase()}`}
                className="px-4 py-3 text-sm text-gray-800 hover:bg-gray-100 hover:text-black flex justify-between items-center w-full transition-colors"
              >
                <span className="font-medium">{category}</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
              
              {/* Product Types Submenu */}
              {hoveredCategory === category && (
                <div className="absolute top-0 left-full ml-1 w-56 bg-white border border-gray-200 shadow-lg rounded-lg opacity-100 visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                      {category} Collection
                    </div>
                    {categoryProductTypes[category].map((productType, idx) => (
                      <Link
                        key={idx}
                        to={`/category/${category.toLowerCase()}/${productType.path}`}
                        className="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 hover:text-black transition-colors flex items-center"
                      >
                        <span className="mr-3 text-lg">{productType.icon}</span>
                        <span>{productType.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicNavigation;
