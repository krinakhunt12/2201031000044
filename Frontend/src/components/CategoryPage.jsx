import React from "react";
import { useParams } from "react-router-dom";
import MenCategory from "../Pages/MenCategory";
import WomenCategory from "../Pages/WomenCategory";
import KidsCategory from "../Pages/KidsCategory";
const CategoryPage = () => {
  const { categoryName } = useParams();

  switch (categoryName) {
    case "men":
      return <MenCategory />;
    case "women":
      return <WomenCategory />;
    case "kids":
      return <KidsCategory />;
    default:
      return (
        <div className="pt-32 text-center text-xl text-gray-600">
          Category not found
        </div>
      );
  }
};

export default CategoryPage;
