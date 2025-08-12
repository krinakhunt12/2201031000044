import products from '../constants/products.js';
import menCollection from '../constants/menCollection.js';
import womenCollection from '../constants/womenCollection.js';
import kidsCollection from '../constants/kidsCollection.js';

// Combine all products
const allProducts = [
  ...products,
  // Flatten men collection
  ...Object.values(menCollection).flat(),
  // Flatten women collection
  ...Object.values(womenCollection).flat(),
  // Flatten kids collection (excluding the "All" category which is empty initially)
  ...Object.entries(kidsCollection)
    .filter(([key]) => key !== 'All')
    .map(([, products]) => products)
    .flat()
];

// Add missing properties to products for search functionality
const enhancedProducts = allProducts.map(product => ({
  ...product,
  category: product.category || 'Fashion',
  brand: product.brand || 'Stylon',
  reviews: product.reviews || Math.floor(Math.random() * 200) + 10,
  rating: product.rating || (Math.random() * 2 + 3).toFixed(1), // Random rating between 3-5
  sizes: product.sizes || ['S', 'M', 'L', 'XL'],
  colors: product.colors || ['#000000', '#FFFFFF', '#FF6B6B'],
  description: product.description || `${product.name} - Premium quality fashion item from Stylon.`
}));

export const searchProducts = async (query, limit = 10) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  
  // Simple search implementation - can be enhanced with more sophisticated algorithms
  const results = enhancedProducts.filter(product => {
    const searchableText = [
      product.name,
      product.category,
      product.brand,
      ...(product.tags || []),
      ...(product.description ? [product.description] : [])
    ].join(' ').toLowerCase();
    
    return searchableText.includes(searchTerm);
  });

  // Sort by relevance (exact matches first, then partial matches)
  const sortedResults = results.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    
    // Exact match gets higher priority
    if (aName === searchTerm && bName !== searchTerm) return -1;
    if (bName === searchTerm && aName !== searchTerm) return 1;
    
    // Starts with search term gets higher priority
    if (aName.startsWith(searchTerm) && !bName.startsWith(searchTerm)) return -1;
    if (bName.startsWith(searchTerm) && !aName.startsWith(searchTerm)) return 1;
    
    // Sort by rating (higher rating first)
    return (b.rating || 0) - (a.rating || 0);
  });

  return sortedResults.slice(0, limit);
};

export const getProductSuggestions = async (query, limit = 5) => {
  return searchProducts(query, limit);
};

export const getRecentSearches = () => {
  const searches = localStorage.getItem('recentSearches');
  return searches ? JSON.parse(searches) : [];
};

export const addRecentSearch = (query) => {
  if (!query || query.trim().length === 0) return;
  
  const searches = getRecentSearches();
  const newSearches = [query.trim(), ...searches.filter(s => s !== query.trim())].slice(0, 10);
  localStorage.setItem('recentSearches', JSON.stringify(newSearches));
};

export const clearRecentSearches = () => {
  localStorage.removeItem('recentSearches');
};
