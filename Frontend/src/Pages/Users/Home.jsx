import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Search,
  Heart,
  Star,
  ArrowRight,
  Menu,
  X,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";
import Navbar from "../../components/Users/Navbar";
import Hero from "../../components/Users/Hero";
import FeaturedProducts from "../../components/Users/FeaturedProducts";
import Categories from "../../components/Users/Categories";
import Newsletter from "../../components/Users/Newsletter";
import Footer from "../../components/Users/Footer";
import Testimonials from "../../components/Users/Testimonials"

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const heroSlides = [
    {
      title: "Elevate Your Style",
      subtitle: "Discover curated fashion for every moment",
      bg: "from-rose-400 via-pink-400 to-purple-500",
    },
    {
      title: "Summer Collection",
      subtitle: "Fresh looks for the season ahead",
      bg: "from-blue-400 via-cyan-400 to-teal-500",
    },
    {
      title: "Exclusive Drops",
      subtitle: "Limited edition pieces just for you",
      bg: "from-purple-400 via-indigo-400 to-blue-500",
    },
  ];
  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white text-gray-900 overflow-hidden">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Categories */}
      <Categories />

      <Testimonials/>

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
