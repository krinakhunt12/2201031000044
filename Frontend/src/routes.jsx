// src/routes.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";

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
import CheckoutPage from "./Pages/Users/CheckoutPage";
import ProductDetail from "./Pages/Users/ProductDetail";

// Main category pages
import MenCategory from "./Pages/Users/MenCategory";
import WomenCategory from "./Pages/Users/WomenCategory";
import KidsCategory from "./Pages/Users/KidsCategory";

// Subcategory pages
// Men
import MenTshirts from "./Pages/Users/Subcategories/Men/Tshirts";
import MenShirts from "./Pages/Users/Subcategories/Men/Shirts";
import MenJeans from "./Pages/Users/Subcategories/Men/Jeans";
import MenJackets from "./Pages/Users/Subcategories/Men/Jackets";
import MenShorts from "./Pages/Users/Subcategories/Men/Shorts";
import MenSweaters from "./Pages/Users/Subcategories/Men/Sweaters";

// Women
import WomenDresses from "./Pages/Users/Subcategories/Women/Dresses";
import WomenTops from "./Pages/Users/Subcategories/Women/Tops";
import WomenBottoms from "./Pages/Users/Subcategories/Women/Bottoms";
import WomenSkirts from "./Pages/Users/Subcategories/Women/Skirts";
import WomenJeans from "./Pages/Users/Subcategories/Women/Jeans";
import WomenJackets from "./Pages/Users/Subcategories/Women/Jackets";
import WomenSweaters from "./Pages/Users/Subcategories/Women/Sweaters";

// Kids
import KidsTshirts from "./Pages/Users/Subcategories/Kids/Tshirts";
import KidsDresses from "./Pages/Users/Subcategories/Kids/Dresses";
import KidsPants from "./Pages/Users/Subcategories/Kids/Pants";
import KidsJackets from "./Pages/Users/Subcategories/Kids/Jackets";
import KidsSweaters from "./Pages/Users/Subcategories/Kids/Sweaters";
import KidsShorts from "./Pages/Users/Subcategories/Kids/Shorts";
import AdminLogin from "./Pages/Admin/AdminLogin";

const AppRoutes = () => {
  return (
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          <Route path="/search" element={<Search />} />
          
          {/* Main category routes */}
          <Route path="/category/men" element={<MenCategory />} />
          <Route path="/category/women" element={<WomenCategory />} />
          <Route path="/category/kids" element={<KidsCategory />} />
          
          {/* Shared dynamic category route */}
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          
          {/* Subcategory routes */}
          {/* Men */}
          <Route path="/category/men/tshirts" element={<MenTshirts />} />
          <Route path="/category/men/shirts" element={<MenShirts />} />
          <Route path="/category/men/jeans" element={<MenJeans />} />
          <Route path="/category/men/jackets" element={<MenJackets />} />
          <Route path="/category/men/shorts" element={<MenShorts />} />
          <Route path="/category/men/sweaters" element={<MenSweaters />} />
          
          {/* Women */}
          <Route path="/category/women/dresses" element={<WomenDresses />} />
          <Route path="/category/women/tops" element={<WomenTops />} />
          <Route path="/category/women/bottoms" element={<WomenBottoms />} />
          <Route path="/category/women/skirts" element={<WomenSkirts />} />
          <Route path="/category/women/jeans" element={<WomenJeans />} />
          <Route path="/category/women/jackets" element={<WomenJackets />} />
          <Route path="/category/women/sweaters" element={<WomenSweaters />} />
          
          {/* Kids */}
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
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
           <Route path="/profile" element={<Profile />} />
          {/* Catch-all route for 404 */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
  );
};

export default AppRoutes;
