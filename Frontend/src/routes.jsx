// src/routes.jsx

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import your page components
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import About from "./Pages/About";
import Collections from "./Pages/Collections";
import CategoryPage from "./components/CategoryPage";
import Contact from "./Pages/Contact";
import Login from "../src/Pages/Login";
import SignUp from "../src/Pages/SignUp";
import Cart from "../src/Pages/Cart";
import Wishlist from "../src/Pages/Wishlist";
import AdminDashboard from "../src/Pages/AdminDashboard";
import Search from "../src/Pages/Search";
import Profile from "../src/Pages/Profile";
import Checkout from "../src/Pages/Checkout";
import ProductDetail from "../src/Pages/ProductDetail";

// Subcategory pages
// Men
import MenTshirts from "./Pages/Subcategories/Men/Tshirts";
import MenShirts from "./Pages/Subcategories/Men/Shirts";
import MenJeans from "./Pages/Subcategories/Men/Jeans";
import MenShoes from "./Pages/Subcategories/Men/Shoes";
import MenJackets from "./Pages/Subcategories/Men/Jackets";
import MenShorts from "./Pages/Subcategories/Men/Shorts";
import MenSweaters from "./Pages/Subcategories/Men/Sweaters";

// Women
import WomenDresses from "./Pages/Subcategories/Women/Dresses";
import WomenTops from "./Pages/Subcategories/Women/Tops";
import WomenBottoms from "./Pages/Subcategories/Women/Bottoms";
import WomenAccessories from "./Pages/Subcategories/Women/Accessories";
import WomenSkirts from "./Pages/Subcategories/Women/Skirts";
import WomenJeans from "./Pages/Subcategories/Women/Jeans";
import WomenJackets from "./Pages/Subcategories/Women/Jackets";
import WomenSweaters from "./Pages/Subcategories/Women/Sweaters";

// Kids
import KidsClothing from "./Pages/Subcategories/Kids/Clothing";
import KidsFootwear from "./Pages/Subcategories/Kids/Footwear";
import KidsToys from "./Pages/Subcategories/Kids/Toys";
import KidsAccessories from "./Pages/Subcategories/Kids/Accessories";
import KidsTshirts from "./Pages/Subcategories/Kids/Tshirts";
import KidsDresses from "./Pages/Subcategories/Kids/Dresses";
import KidsPants from "./Pages/Subcategories/Kids/Pants";
import KidsJackets from "./Pages/Subcategories/Kids/Jackets";
import KidsSweaters from "./Pages/Subcategories/Kids/Sweaters";
import KidsShorts from "./Pages/Subcategories/Kids/Shorts";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/search" element={<Search />} />
        {/* Shared dynamic category route */}
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        
        {/* Subcategory routes */}
        {/* Men */}
        <Route path="/category/men/tshirts" element={<MenTshirts />} />
        <Route path="/category/men/shirts" element={<MenShirts />} />
        <Route path="/category/men/jeans" element={<MenJeans />} />
        <Route path="/category/men/shoes" element={<MenShoes />} />
        <Route path="/category/men/jackets" element={<MenJackets />} />
        <Route path="/category/men/shorts" element={<MenShorts />} />
        <Route path="/category/men/sweaters" element={<MenSweaters />} />
        
        {/* Women */}
        <Route path="/category/women/dresses" element={<WomenDresses />} />
        <Route path="/category/women/tops" element={<WomenTops />} />
        <Route path="/category/women/bottoms" element={<WomenBottoms />} />
        <Route path="/category/women/accessories" element={<WomenAccessories />} />
        <Route path="/category/women/skirts" element={<WomenSkirts />} />
        <Route path="/category/women/jeans" element={<WomenJeans />} />
        <Route path="/category/women/jackets" element={<WomenJackets />} />
        <Route path="/category/women/sweaters" element={<WomenSweaters />} />
        
        {/* Kids */}
        <Route path="/category/kids/clothing" element={<KidsClothing />} />
        <Route path="/category/kids/footwear" element={<KidsFootwear />} />
        <Route path="/category/kids/toys" element={<KidsToys />} />
        <Route path="/category/kids/accessories" element={<KidsAccessories />} />
        <Route path="/category/kids/tshirts" element={<KidsTshirts />} />
        <Route path="/category/kids/dresses" element={<KidsDresses />} />
        <Route path="/category/kids/pants" element={<KidsPants />} />
        <Route path="/category/kids/jackets" element={<KidsJackets />} />
        <Route path="/category/kids/sweaters" element={<KidsSweaters />} />
        <Route path="/category/kids/shorts" element={<KidsShorts />} />
        
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        {/* Catch-all route for 404 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
