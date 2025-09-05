import React, { useState, useEffect, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from 'framer-motion';

// Using Unsplash image URLs directly
const heroSlides = [
  {
    title: "Elevate Your Style",
    subtitle: "Discover curated fashion for every moment",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    overlay: "bg-black/40",
  },
  {
    title: "Summer Collection",
    subtitle: "Fresh looks for the season ahead",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    overlay: "bg-blue-900/30",
  },
  {
    title: "Exclusive Drops",
    subtitle: "Limited edition pieces just for you",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    overlay: "bg-purple-900/30",
  },
];

// Constants for better maintainability
const SLIDE_INTERVAL = 5000;
const TRANSITION_DURATION = 1000;
const BUBBLE_COUNT = 20;

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Memoized slide navigation
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  // Auto-advance slides
  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // Pre-calculate bubble styles for better performance
  const bubbles = Array.from({ length: BUBBLE_COUNT }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${2 + Math.random() * 3}s`,
    };
    return (
      <div
        key={`bubble-${i}`}
        className="absolute w-2 h-2 bg-white/40 rounded-full animate-pulse"
        style={style}
      />
    );
  });

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
        <img
          src={currentSlideData.image}
          alt="Fashion background"
          className="w-full h-full object-cover"
          loading="lazy" // Added lazy loading
        />
        <div
          className={`absolute inset-0 ${currentSlideData.overlay} transition-all duration-1000`}
        ></div>
      </div>

      {/* Floating bubbles */}
      <div className="absolute inset-0">{bubbles}</div>

      {/* Slide Content */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`relative z-10 text-center max-w-4xl mx-auto px-4 transform transition-all duration-${TRANSITION_DURATION} ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <motion.h1 whileInView={{ y: [10, 0], opacity: [0, 1] }} transition={{ duration: 0.6 }} className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
          {currentSlideData.title}
        </motion.h1>
        <motion.p whileInView={{ opacity: [0, 1], y: [6, 0] }} transition={{ duration: 0.6, delay: 0.1 }} className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto drop-shadow">
          {currentSlideData.subtitle}
        </motion.p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Shop Collection"
            className="group px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg"
          >
            <span>Shop Collection</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} aria-label="Watch Lookbook" className="px-8 py-4 border-2 border-white/50 text-white rounded-full font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
            Watch Lookbook
          </motion.button>
        </div>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={`indicator-${index}`}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;