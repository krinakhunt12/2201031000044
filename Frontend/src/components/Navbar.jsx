import React, { useState } from "react";
import {
  ShoppingBag,
  Search,
  Heart,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const categoryData = [
  {
    name: "Men",
    path: "/category/men",
    subcategories: ["T-Shirts", "Shirts", "Jeans", "Shoes"],
  },
  {
    name: "Women",
    path: "/category/women",
    subcategories: ["Dresses", "Tops", "Heels", "Handbags"],
  },
  {
    name: "Kids",
    path: "/category/kids",
    subcategories: ["T-Shirts", "Toys", "Shoes"],
  },
  {
    name: "Home",
    path: "/category/home",
    subcategories: ["Decor", "Bedding", "Furniture"],
  },
];

const mainMenuItems = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "#" },
  { name: "Collections", path: "/collections" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const categories = [
  "Men",
  "Women",
  "Kids",
  "Home",
  "Beauty",
  "GenZ",
  "Studio",
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="font-poppins fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-2xl font-bold text-black tracking-tight"
          >
        {/* <img src="/SL.png" alt="Stylon" className="w-20"/> */}
        Stylon
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 relative">
            {mainMenuItems.map(({ name, path }) =>
              name === "Shop" ? (
                <div key={name} className="relative group">
                  <span className="cursor-pointer text-gray-800 hover:text-black font-medium">
                    {name}
                  </span>
                  <div className="absolute top-full left-0 mt-2 flex bg-white shadow-lg border border-gray-100 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-40">
                    <div className="w-56 py-2">
                      {categoryData.map((cat) => (
                        <div key={cat.name} className="relative group-hover:flex group/sub">
                          <Link
                            to={cat.path}
                            className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-black flex justify-between items-center w-full"
                          >
                            {cat.name}
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Link>
                          <div className="absolute top-0 left-full ml-1 w-48 bg-white border border-gray-200 shadow-lg rounded-md opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 z-50">
                            {cat.subcategories.map((sub, idx) => (
                              <Link
                                key={idx}
                                to={`${cat.path}/${sub.toLowerCase().replace(/\s/g, "-")}`}
                                className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-black"
                              >
                                {sub}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={name}
                  to={path}
                  className="relative group text-gray-800 hover:text-black font-medium transition-all duration-300"
                >
                  {name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                </Link>
              )
            )}
          </nav>

          {/* Desktop Icons & Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingBag className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-black rounded-full text-xs flex items-center justify-center text-white">
                2
              </span>
            </button>

            {/* Auth Buttons */}
            <Link
              to="/login"
              className="px-5 py-1.5 border border-gray-300 text-sm rounded-full font-medium text-gray-800 hover:text-black transition-all"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-5 py-1.5 bg-black text-white text-sm rounded-full font-medium hover:opacity-90 transition-all"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Category Bar */}
      {/* <div className="hidden md:block bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-6 h-12">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase()}`}
                className="text-sm font-medium text-gray-700 hover:text-black transition-all"
              >
                {category}
                {category === "Studio" && (
                  <span className="text-xs text-black ml-1 font-semibold">NEW</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div> */}

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white/95 backdrop-blur-md transform transition-all duration-300 ${
          isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden border-t border-gray-100`}
      >
        <div className="px-4 py-4 space-y-4">
          {mainMenuItems.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-800 hover:text-black font-medium transition-colors"
            >
              {name}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setIsMenuOpen(false)}
            className="block w-full text-center px-6 py-2 border border-gray-300 text-gray-800 rounded-full font-medium hover:text-black"
          >
            Login
          </Link>
          <Link
            to="/signup"
            onClick={() => setIsMenuOpen(false)}
            className="block w-full text-center px-6 py-2 bg-black text-white rounded-full font-medium hover:opacity-90"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
