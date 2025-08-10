import React, { useState, useEffect } from "react";
import { Sparkles, Award, Star, TrendingUp, Crown, ChevronLeft, ChevronRight } from "lucide-react";

const BrandCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredBrand, setHoveredBrand] = useState(null);

  const brands = [
    {
      id: 1,
      name: "VERSACE",
      category: "Luxury Fashion",
      logo: "V",
      gradient: "from-yellow-400 to-orange-500",
      description: "Italian luxury fashion house",
      established: "1978",
      specialty: "High-end couture & ready-to-wear",
      featured: true,
      rating: 4.9
    },
    {
      id: 2,
      name: "GUCCI",
      category: "Designer",
      logo: "G",
      gradient: "from-green-600 to-red-600",
      description: "Iconic Italian luxury brand",
      established: "1921",
      specialty: "Leather goods & fashion",
      featured: true,
      rating: 4.8
    },
    {
      id: 3,
      name: "CHANEL",
      category: "Haute Couture",
      logo: "CC",
      gradient: "from-gray-800 to-black",
      description: "French luxury fashion house",
      established: "1910",
      specialty: "Timeless elegance",
      featured: true,
      rating: 4.9
    },
    {
      id: 4,
      name: "PRADA",
      category: "Luxury",
      logo: "P",
      gradient: "from-purple-600 to-pink-600",
      description: "Italian luxury fashion brand",
      established: "1913",
      specialty: "Innovative designs",
      featured: false,
      rating: 4.7
    },
    {
      id: 5,
      name: "ARMANI",
      category: "Designer",
      logo: "A",
      gradient: "from-blue-600 to-indigo-700",
      description: "Italian luxury fashion house",
      established: "1975",
      specialty: "Sophisticated style",
      featured: true,
      rating: 4.8
    },
    {
      id: 6,
      name: "DIOR",
      category: "Haute Couture",
      logo: "D",
      gradient: "from-pink-500 to-rose-600",
      description: "French luxury goods company",
      established: "1946",
      specialty: "Elegant femininity",
      featured: true,
      rating: 4.9
    },
    {
      id: 7,
      name: "BALENCIAGA",
      category: "Luxury",
      logo: "B",
      gradient: "from-gray-700 to-gray-900",
      description: "Spanish luxury fashion house",
      established: "1919",
      specialty: "Avant-garde fashion",
      featured: false,
      rating: 4.6
    },
    {
      id: 8,
      name: "VALENTINO",
      category: "Couture",
      logo: "V",
      gradient: "from-red-600 to-pink-600",
      description: "Italian luxury fashion house",
      established: "1960",
      specialty: "Romantic elegance",
      featured: true,
      rating: 4.8
    },
    {
      id: 9,
      name: "BURBERRY",
      category: "British Luxury",
      logo: "B",
      gradient: "from-amber-600 to-yellow-600",
      description: "British luxury fashion house",
      established: "1856",
      specialty: "Heritage & innovation",
      featured: false,
      rating: 4.7
    },
    {
      id: 10,
      name: "HERMÈS",
      category: "Ultra Luxury",
      logo: "H",
      gradient: "from-orange-500 to-amber-600",
      description: "French luxury goods manufacturer",
      established: "1837",
      specialty: "Craftsmanship excellence",
      featured: true,
      rating: 5.0
    }
  ];

  const brandsPerView = 5;
  const totalSlides = Math.ceil(brands.length / brandsPerView);

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, totalSlides]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
  };

  const getCurrentBrands = () => {
    const startIndex = currentIndex * brandsPerView;
    return brands.slice(startIndex, startIndex + brandsPerView);
  };

  const featuredBrands = brands.filter(brand => brand.featured);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-purple-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200/15 to-pink-200/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -left-40 w-60 h-60 bg-gradient-to-br from-gray-200/10 to-purple-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 font-semibold uppercase tracking-wider text-sm px-4 py-2 rounded-full mb-6 shadow-sm">
            <Award className="w-4 h-4" />
            Premium Partners
          </div>
          
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            <span className="text-gray-900">Trusted </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700">
              Brand Partners
            </span>
          </h2>
          
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            We partner with the world's most prestigious fashion houses to bring you authentic luxury and style
          </p>
        </div>

        {/* Featured Brands Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="text-3xl font-bold text-purple-600 mb-2">{brands.length}+</div>
            <div className="text-gray-600 text-sm font-medium">Premium Brands</div>
          </div>
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="text-3xl font-bold text-pink-600 mb-2">{featuredBrands.length}</div>
            <div className="text-gray-600 text-sm font-medium">Featured Partners</div>
          </div>
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
            <div className="text-gray-600 text-sm font-medium">Authentic Products</div>
          </div>
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="text-3xl font-bold text-green-600 mb-2">4.8</div>
            <div className="text-gray-600 text-sm font-medium">Average Rating</div>
          </div>
        </div>

        {/* Main Brand Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl bg-white/60 backdrop-blur-sm shadow-2xl border border-white/50">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-5 gap-0">
                    {brands.slice(slideIndex * brandsPerView, (slideIndex + 1) * brandsPerView).map((brand, index) => (
                      <div
                        key={brand.id}
                        className="group relative h-32 flex items-center justify-center border-r border-gray-200/50 last:border-r-0 hover:bg-white/80 transition-all duration-300 cursor-pointer"
                        onMouseEnter={() => setHoveredBrand(brand.id)}
                        onMouseLeave={() => setHoveredBrand(null)}
                      >
                        {/* Brand Logo */}
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${brand.gradient} flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {brand.logo}
                        </div>

                        {/* Brand Name */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="text-xs font-bold text-gray-800 whitespace-nowrap">
                            {brand.name}
                          </div>
                        </div>

                        {/* Featured Badge */}
                        {brand.featured && (
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              <Star className="w-2 h-2" />
                              Featured
                            </div>
                          </div>
                        )}

                        {/* Hover Overlay */}
                        {hoveredBrand === brand.id && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="text-center text-white p-3">
                              <div className="text-xs font-semibold mb-1">{brand.category}</div>
                              <div className="text-xs opacity-80">Est. {brand.established}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-gray-600 hover:text-purple-600"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-gray-600 hover:text-purple-600"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Featured Brand Spotlight */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Brand Spotlight
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most prestigious partnerships and the stories behind these iconic brands
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredBrands.slice(0, 3).map((brand, index) => (
              <div
                key={brand.id}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-center mb-6">
                  <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${brand.gradient} flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-4`}>
                    {brand.logo}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{brand.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{brand.description}</p>
                  <div className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    <Star className="w-3 h-3" />
                    {brand.rating}
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="font-medium">{brand.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Established:</span>
                    <span className="font-medium">{brand.established}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Specialty:</span>
                    <span className="font-medium text-xs">{brand.specialty}</span>
                  </div>
                </div>

                <button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
                  Explore Collection
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="w-6 h-6" />
            <span className="text-lg font-semibold">Authenticity Guaranteed</span>
          </div>
          <h3 className="text-3xl font-bold mb-4">
            100% Authentic Luxury Fashion
          </h3>
          <p className="text-purple-100 text-lg mb-8 max-w-3xl mx-auto">
            Every product in our store comes directly from authorized brand partners. 
            We guarantee authenticity with certificates and comprehensive quality checks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-purple-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-50 transition-colors duration-300 shadow-lg">
              View All Brands
            </button>
            <button className="text-white font-medium hover:text-purple-100 transition-colors duration-300 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              See What's Trending
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;