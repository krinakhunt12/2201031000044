// src/routes.jsx

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import your page components
import Home from "./Pages/Users/Home"
import Shop from "./Pages/Users/Shop";
import About from "./Pages/Users/About";
import Collections from "./Pages/Users/Collections";
import CategoryPage from "./components/Users/CategoryPage";
import Contact from "./Pages/Users/Contact";
import Login from "./Pages/Users/Login";
import SignUp from "./Pages/Users/SignUp";
import Cart from "./Pages/Users/Cart";
import Wishlist from "./Pages/Users/Wishlist";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Search from "./components/Users/Search";
import Profile from "./Pages/Users/Profile";
import Checkout from "./Pages/Users/Checkout";
import ProductDetail from "./Pages/Users/ProductDetail";

// Subcategory pages
// Men
import MenTshirts from "./Pages/Users/Subcategories/Men/Tshirts";
import MenShirts from "./Pages/Users/Subcategories/Men/Shirts";
import MenJeans from "./Pages/Users/Subcategories/Men/Jeans";
import MenShoes from "./Pages/Users/Subcategories/Men/Shoes";
import MenJackets from "./Pages/Users/Subcategories/Men/Jackets";
import MenShorts from "./Pages/Users/Subcategories/Men/Shorts";
import MenSweaters from "./Pages/Users/Subcategories/Men/Sweaters";

// Women
import WomenDresses from "./Pages/Users/Subcategories/Women/Dresses";
import WomenTops from "./Pages/Users/Subcategories/Women/Tops";
import WomenBottoms from "./Pages/Users/Subcategories/Women/Bottoms";
import WomenAccessories from "./Pages/Users/Subcategories/Women/Accessories";
import WomenSkirts from "./Pages/Users/Subcategories/Women/Skirts";
import WomenJeans from "./Pages/Users/Subcategories/Women/Jeans";
import WomenJackets from "./Pages/Users/Subcategories/Women/Jackets";
import WomenSweaters from "./Pages/Users/Subcategories/Women/Sweaters";

// Kids
import KidsClothing from "./Pages/Users/Subcategories/Kids/Clothing";
import KidsFootwear from "./Pages/Users/Subcategories/Kids/Footwear";
import KidsToys from "./Pages/Users/Subcategories/Kids/Toys";
import KidsAccessories from "./Pages/Users/Subcategories/Kids/Accessories";
import KidsTshirts from "./Pages/Users/Subcategories/Kids/Tshirts";
import KidsDresses from "./Pages/Users/Subcategories/Kids/Dresses";
import KidsPants from "./Pages/Users/Subcategories/Kids/Pants";
import KidsJackets from "./Pages/Users/Subcategories/Kids/Jackets";
import KidsSweaters from "./Pages/Users/Subcategories/Kids/Sweaters";
import KidsShorts from "./Pages/Users/Subcategories/Kids/Shorts";
import AdminLogin from "./Pages/Admin/AdminLogin";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

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
