import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Gift, Zap, Tag, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const PromoBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 30,
    seconds: 45
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-slide effect
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(slideTimer);
  }, []);

  const banners = [
    {
      id: 1,
      type: 'flash-sale',
      title: 'Flash Sale',
      subtitle: 'Up to 70% Off',
      description: 'Limited time offer on selected items',
      bgGradient: 'from-red-500 via-pink-500 to-purple-600',
      textColor: 'text-white',
      buttonText: 'Shop Now',
      icon: <Zap className="w-8 h-8" />,
      badge: 'HOT DEAL',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop'
    },
    {
      id: 2,
      type: 'new-arrivals',
      title: 'New Arrivals',
      subtitle: 'Fresh Fashion',
      description: 'Discover the latest trends in clothing',
      bgGradient: 'from-blue-500 via-teal-500 to-green-500',
      textColor: 'text-white',
      buttonText: 'Explore',
      icon: <Star className="w-8 h-8" />,
      badge: 'NEW',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=400&fit=crop'
    },
    {
      id: 3,
      type: 'free-shipping',
      title: 'Free Shipping',
      subtitle: 'On Orders $75+',
      description: 'Fast delivery to your doorstep',
      bgGradient: 'from-purple-500 via-indigo-500 to-blue-600',
      textColor: 'text-white',
      buttonText: 'Shop Free Shipping',
      icon: <Gift className="w-8 h-8" />,
      badge: 'FREE',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=400&fit=crop'
    },
    {
      id: 4,
      type: 'seasonal',
      title: 'Summer Collection',
      subtitle: '30% Off Everything',
      description: 'Beat the heat with cool summer styles',
      bgGradient: 'from-yellow-400 via-orange-500 to-red-500',
      textColor: 'text-white',
      buttonText: 'Shop Summer',
      icon: <Tag className="w-8 h-8" />,
      badge: 'SEASONAL',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=400&fit=crop'
    }
  ];

  const quickPromos = [
    {
      title: 'Student Discount',
      discount: '15% OFF',
      code: 'STUDENT15',
      bgColor: 'bg-gradient-to-r from-green-400 to-blue-500'
    },
    {
      title: 'First Order',
      discount: '20% OFF',
      code: 'WELCOME20',
      bgColor: 'bg-gradient-to-r from-purple-400 to-pink-500'
    },
    {
      title: 'Bundle Deal',
      discount: 'Buy 2 Get 1',
      code: 'BUNDLE3',
      bgColor: 'bg-gradient-to-r from-orange-400 to-red-500'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full">
      {/* Main Banner Carousel */}
  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative h-96 lg:h-[500px] overflow-hidden rounded-2xl mx-4 lg:mx-8 mb-8 shadow-2xl">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <div className={`relative h-full bg-gradient-to-br ${banner.bgGradient} overflow-hidden`}>
              {/* Background Image */}
              <div className="absolute inset-0 opacity-20">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Animated Background Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/5 rounded-full animate-bounce"></div>
                <div className="absolute top-1/2 right-10 w-16 h-16 bg-white/10 rounded-full animate-ping"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center justify-between px-8 lg:px-16">
                <div className="flex-1 max-w-2xl">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                    {banner.icon}
                    <span className="font-bold text-sm">{banner.badge}</span>
                  </div>

                  <h1 className={`text-4xl lg:text-6xl font-bold ${banner.textColor} mb-4 leading-tight`}>
                    {banner.title}
                  </h1>
                  <h2 className={`text-2xl lg:text-4xl font-semibold ${banner.textColor} mb-4 opacity-90`}>
                    {banner.subtitle}
                  </h2>
                  <p className={`text-lg ${banner.textColor} mb-8 opacity-80 max-w-md`}>
                    {banner.description}
                  </p>

                  {/* Flash Sale Timer */}
                  {banner.type === 'flash-sale' && (
                    <div className="flex items-center gap-4 mb-6">
                      <Clock className="w-6 h-6 text-white" />
                      <div className="flex gap-2">
                        {Object.entries(timeLeft).map(([unit, value]) => (
                          <div key={unit} className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg text-center">
                            <div className="text-2xl font-bold">{value.toString().padStart(2, '0')}</div>
                            <div className="text-xs uppercase">{unit.slice(0, 3)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="group bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-2">
                    {banner.buttonText}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </div>

                {/* Decorative Elements */}
                <div className="hidden lg:block flex-1 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-80 h-80 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <div className="w-60 h-60 bg-white/10 rounded-full flex items-center justify-center">
                        <div className="text-8xl opacity-30">
                          {banner.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-300 text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-300 text-white"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Quick Promo Cards */}
      <div className="px-4 lg:px-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickPromos.map((promo, index) => (
            <div
              key={index}
              className={`${promo.bgColor} p-6 rounded-xl text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-1">{promo.title}</h3>
                  <p className="text-2xl font-bold mb-2">{promo.discount}</p>
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full inline-block">
                    <span className="text-sm font-mono">Code: {promo.code}</span>
                  </div>
                </div>
                <div className="text-4xl opacity-50 group-hover:opacity-75 transition-opacity duration-300">
                  <Tag />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup Banner */}
      <div className="mx-4 lg:mx-8 bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-8 text-center shadow-2xl">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold text-white mb-4">
            Get Exclusive Deals & Updates
          </h3>
          <p className="text-gray-300 mb-6 text-lg">
            Subscribe to our newsletter and be the first to know about sales, new arrivals, and special offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-purple-500 outline-none text-gray-900"
            />
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
              Subscribe
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            *Get 10% off your first order when you subscribe
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;