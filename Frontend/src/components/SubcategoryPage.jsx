import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const buildUnsplashUrls = (query, count = 12, size = "600x700") => {
  return Array.from({ length: count }, (_, index) =>
    `https://source.unsplash.com/${size}/?${encodeURIComponent(query)}&sig=${index + 1}`
  );
};

const SubcategoryPage = ({
  categoryLabel,
  subcategoryLabel,
  query,
  accent = "from-black/70 to-transparent",
  ctaText = "Shop Now",
}) => {
  const heroUrl = `https://source.unsplash.com/1600x600/?${encodeURIComponent(
    query
  )}`;
  const gallery = React.useMemo(() => buildUnsplashUrls(query, 12), [query]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden mb-10">
          <img
            src={heroUrl}
            alt={`${subcategoryLabel} - ${categoryLabel}`}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-r ${accent} flex items-center px-6 sm:px-10`}
          >
            <div className="max-w-2xl">
              <p className="text-sm sm:text-base text-gray-100/90 tracking-wider uppercase">
                {categoryLabel}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-1">
                {subcategoryLabel}
              </h1>
              <p className="text-gray-100/90 mt-3 max-w-xl">
                Curated styles and inspiration from Unsplash to elevate your look.
              </p>
              <button className="mt-5 inline-flex items-center px-5 py-2.5 rounded-full bg-black/80 backdrop-blur text-white text-sm font-medium hover:bg-black transition-colors">
                {ctaText}
              </button>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {gallery.map((src, idx) => (
              <div
                key={idx}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={src}
                    alt={`${subcategoryLabel} inspiration ${idx + 1}`}
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading={idx < 4 ? "eager" : "lazy"}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold text-gray-900 line-clamp-1">
                    {subcategoryLabel}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    Handpicked looks matched to “{query}”. Save for later or shop similar items.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SubcategoryPage;

