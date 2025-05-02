import React, { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ setSearchQuery }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    // Add debounce to prevent too many re-renders
    const timer = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, setSearchQuery]);

  const handleClear = () => {
    setInputValue('');
    setSearchQuery('');
  };

  return (
    <div className="relative w-full max-w-md transition-all duration-200" >
      <div className="relative flex items-center">
        <FiSearch className={`absolute left-3 h-5 w-5 ${inputValue ? 'text-gray-600' : 'text-gray-400'} transition-colors`} />
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none transition-all"
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute right-3 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Clear search"
          >
            <FiX className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;