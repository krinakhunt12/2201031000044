import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white px-6">
      {/* Big 404 */}
      <h1 className="text-9xl font-extrabold drop-shadow-lg animate-bounce">404</h1>

      {/* Message */}
      <p className="mt-6 text-2xl md:text-3xl font-semibold">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <p className="mt-2 text-lg text-gray-200 max-w-md text-center">
        It might have been removed, renamed, or did not exist in the first place.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="mt-8 inline-block px-6 py-3 rounded-2xl bg-white text-indigo-600 font-bold shadow-lg hover:bg-gray-100 hover:scale-105 transform transition"
      >
        ⬅ Back to Home
      </Link>

      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-black/10 rounded-full blur-3xl"></div>
    </div>
  );
};

export default NotFound;
