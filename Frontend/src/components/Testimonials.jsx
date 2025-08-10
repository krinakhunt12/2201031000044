import React, { useState, useEffect } from "react";
import { Star, Quote, Heart, ShoppingBag, Users, Crown, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Mitchell",
      location: "New York, USA",
      category: "Women",
      categoryIcon: <Crown className="w-4 h-4" />,
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c4e6a4c3?w=80&h=80&fit=crop&crop=face",
      review: "Absolutely love my new silk dress from Stylon! The quality is exceptional and the fit is perfect. I've received so many compliments. The customer service was outstanding too - they helped me find the right size and answered all my questions promptly.",
      purchasedItem: "Silk Midi Dress",
      verified: true,
      daysAgo: 5,
      helpful: 24
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Los Angeles, USA",
      category: "Men",
      categoryIcon: <Users className="w-4 h-4" />,
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      review: "The leather jacket I ordered exceeded my expectations. Premium quality leather, perfect stitching, and the fit is spot on. Stylon has become my go-to for professional and casual wear. Fast shipping and secure packaging too!",
      purchasedItem: "Premium Leather Jacket",
      verified: true,
      daysAgo: 12,
      helpful: 31
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      location: "Miami, USA",
      category: "Children",
      categoryIcon: <Sparkles className="w-4 h-4" />,
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      review: "My daughter loves her new outfits from Stylon! The children's collection is adorable and the quality is amazing. The clothes wash well and maintain their shape and color. Great value for money and my kids feel confident wearing them.",
      purchasedItem: "Kids Summer Collection",
      verified: true,
      daysAgo: 8,
      helpful: 18
    },
    {
      id: 4,
      name: "James Thompson",
      location: "Chicago, USA",
      category: "Men",
      categoryIcon: <Users className="w-4 h-4" />,
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      review: "Outstanding quality and style! I bought a suit for my wedding and it was perfect. The fabric is luxurious and the tailoring is impeccable. Stylon's attention to detail is remarkable. Will definitely be ordering more formal wear from them.",
      purchasedItem: "Wedding Suit",
      verified: true,
      daysAgo: 20,
      helpful: 45
    },
    {
      id: 5,
      name: "Lisa Wang",
      location: "Seattle, USA",
      category: "Women",
      categoryIcon: <Crown className="w-4 h-4" />,
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
      review: "I'm obsessed with Stylon's collection! The evening gown I purchased was absolutely stunning. The quality of the fabric and the attention to detail in the design is incredible. I felt like a queen wearing it to my company gala.",
      purchasedItem: "Evening Gown",
      verified: true,
      daysAgo: 15,
      helpful: 29
    },
    {
      id: 6,
      name: "David Park",
      location: "San Francisco, USA",
      category: "Children",
      categoryIcon: <Sparkles className="w-4 h-4" />,
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
      review: "Fantastic children's clothing! My son's school uniforms from Stylon are durable and comfortable. After months of wear and multiple washes, they still look brand new. The customer service team was incredibly helpful with sizing.",
      purchasedItem: "School Uniform Set",
      verified: true,
      daysAgo: 30,
      helpful: 22
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers", color: "text-purple-600" },
    { number: "4.9/5", label: "Average Rating", color: "text-pink-600" },
    { number: "98%", label: "Would Recommend", color: "text-blue-600" },
    { number: "24/7", label: "Customer Support", color: "text-green-600" }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Women': return 'from-pink-500 to-rose-500';
      case 'Men': return 'from-blue-500 to-indigo-500';
      case 'Children': return 'from-orange-400 to-pink-400';
      default: return 'from-purple-500 to-pink-500';
    }
  };

  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
    
      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 font-semibold uppercase tracking-wider text-sm px-4 py-2 rounded-full mb-6 shadow-sm">
            <Heart className="w-4 h-4" />
            Customer Reviews
          </div>
          
       

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight">
            <span className="text-gray-700">What Our </span>
            <span className="bg-clip-text text-gray-500">
              Customers Say
            </span>
          </h2>
          
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Real reviews from real customers who love shopping with Stylon
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className={`text-3xl font-bold text-gray-700 mb-2`}>
                {stat.number}
              </div>
              <div className="text-gray-500 text-sm font-light italic leading-relaxed">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

     
        {/* Additional Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div key={testimonial.id} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                "{testimonial.review.substring(0, 120)}..."
              </p>
              
              <div className={`inline-flex items-center gap-1 bg-gray-700 text-white text-xs font-semibold px-2 py-1 rounded-full`}>
                {testimonial.categoryIcon}
                {testimonial.category}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Join Our Happy Customers?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the quality and style that our customers love. Start your Stylon journey today.
          </p>
          <button className="group relative inline-flex items-center gap-2 bg-gray-700 text-white font-semibold px-8 py-4 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            <span>Start Shopping</span>
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;