import { useState, useEffect, useCallback } from 'react';
import { getProductSuggestions, addRecentSearch } from '../services/searchService';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounced search
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId;
      return (query) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
          if (query.trim().length >= 2) {
            setIsLoading(true);
            try {
              const results = await getProductSuggestions(query, 5);
              setSuggestions(results);
            } catch (error) {
              console.error('Search error:', error);
              setSuggestions([]);
            } finally {
              setIsLoading(false);
            }
          } else {
            setSuggestions([]);
            setIsLoading(false);
          }
        }, 300);
      };
    })(),
    []
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setShowSuggestions(true);
  };

  const handleSuggestionSelect = (product) => {
    setSearchQuery(product.name);
    setShowSuggestions(false);
    addRecentSearch(product.name);
  };

  const handleSearchSubmit = (query) => {
    if (query.trim()) {
      addRecentSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const hideSuggestions = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return {
    searchQuery,
    suggestions,
    isLoading,
    showSuggestions,
    handleSearchChange,
    handleSuggestionSelect,
    handleSearchSubmit,
    hideSuggestions,
    setShowSuggestions,
  };
};
