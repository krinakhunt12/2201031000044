import React from "react";

const Newsletter = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-500 via-gray-300 to-gray-200">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-500 drop-shadow-lg">
          Stay in the Loop
        </h2>
        <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto italic">
          Get exclusive access to new collections, style tips, and members-only offers
        </p>

        <div className="max-w-md mx-auto">
          <div className="flex rounded-full overflow-hidden bg-white/20 backdrop-blur-sm p-1 shadow-lg">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-transparent text-gray-500 placeholder-gray-500 focus:outline-none"
            />
            <button className="px-6 py-3 bg-white text-gray-600 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-600 font-regulat italic mt-4">
          Join 50,000+ fashion enthusiasts worldwide
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
