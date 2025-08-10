import React from "react";
import { Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  const sections = [
    { title: 'Shop', links: ['New Arrivals', 'Best Sellers', 'Sale', 'Gift Cards'] },
    { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Sustainability'] },
    { title: 'Support', links: ['Contact', 'FAQ', 'Shipping', 'Returns'] }
  ];

  return (
    <footer className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Branding and social */}
          <div>
            <div className="text-2xl font-bold text-black bg-clip-text mb-4">
              Stylon
            </div>
            <p className="text-gray-600 mb-4">
              Elevating fashion with curated collections and contemporary style.
            </p>
            <div className="flex space-x-4">
              <button className="p-2 bg-white rounded-full hover:bg-purple-100 transition-colors border border-gray-200 shadow-sm">
                <Instagram className="w-5 h-5 text-gray-600 hover:text-purple-600" />
              </button>
              <button className="p-2 bg-white rounded-full hover:bg-purple-100 transition-colors border border-gray-200 shadow-sm">
                <Twitter className="w-5 h-5 text-gray-600 hover:text-purple-600" />
              </button>
              <button className="p-2 bg-white rounded-full hover:bg-purple-100 transition-colors border border-gray-200 shadow-sm">
                <Facebook className="w-5 h-5 text-gray-600 hover:text-purple-600" />
              </button>
            </div>
          </div>

          {/* Navigation sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom notice */}
        <div className="border-t border-gray-200 pt-8 text-center text-gray-500 text-sm">
          <p>© 2025 Stylon. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
