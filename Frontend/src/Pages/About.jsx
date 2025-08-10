import React from "react";
import { Sparkles, Heart, Shield, Truck, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  const features = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Curated with Love",
      description: "Every piece is handpicked by our style experts"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Quality Guaranteed",
      description: "Premium materials and craftsmanship you can trust"
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Fast & Secure",
      description: "Quick delivery with secure payment protection"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Customer First",
      description: "Dedicated support team ready to help 24/7"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Navbar />

      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 font-semibold uppercase tracking-wider text-sm px-4 py-2 rounded-full mb-6 shadow-sm">
            <Sparkles className="w-4 h-4" />
            Who We Are
          </div>
        
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight text-gray-700">
              About{" "}
              <span className="bg-clip-text text-gray-500">
                Stylon
              </span>
            </h1>
          
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed italic">
            Empowering your style journey with fashion-forward collections, quality you can trust, and an experience you'll love.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Story Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-xl border border-white/20 mb-16">
            <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
              <p className="text-xl font-medium text-gray-700">
                <span className="font-bold  text-black bg-clip-text">Stylon</span> is your ultimate online destination for fashion-forward shopping. We're redefining how you shop online by offering a seamless experience, top-notch quality, and the latest in style trends — all in one place.
              </p>

              <p>
                From everyday essentials to exclusive collections, our catalog is curated to help you express your style with confidence. Whether you're dressing for work, play, or something in between, Stylon makes it easy to find what you love.
              </p>

              <p>
                We collaborate with trusted designers and manufacturers to bring you premium products at competitive prices. With fast shipping, secure payments, and responsive customer support — shopping with Stylon is simple and satisfying.
              </p>

              <p>
                We believe fashion should be accessible, expressive, and empowering. That's why thousands trust Stylon to deliver not just clothing, but confidence — right to their doorstep.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-300 rounded-xl flex items-center justify-center text-gray-700 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-gray-600 to-gray-400 rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Style?</h2>
            <p className="text-purple-100 text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of fashion lovers who trust Stylon for their style needs. Your perfect outfit is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-gray-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-50 transition-colors duration-300 shadow-lg">
                Start Shopping
              </button>
              <a 
                href="/contact" 
                className="text-white font-medium hover:text-purple-100 transition-colors duration-300 flex items-center gap-2"
              >
                <Heart className="w-4 h-4" />
                Contact Our Team
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/20">
              <p className="text-gray-600">
                Have questions or need help?{" "}
                <a 
                  href="/contact" 
                  className="bg-clip-text text-gray-900 font-semibold hover:underline transition-all duration-300"
                >
                  Contact our team
                </a>
                {" "}— we're always here to assist you.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;