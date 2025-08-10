// src/routes.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import your page components
import Home from "./Pages/Home"
import Shop from "./Pages/Shop"
import About from "./Pages/About";
import Collections from './Pages/Collections';
import CategoryPage from './components/CategoryPage';
import Contact from './Pages/Contact';
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
  <Route path="/collections" element={<Collections />} />
  {/* Shared dynamic category route */}
      <Route path="/category/:categoryName" element={<CategoryPage />} />
      <Route path="/contact" element={<Contact />} />

        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* Catch-all route for 404 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
