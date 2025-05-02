import React, { useState, useRef, useEffect } from 'react';

const TypeFilter = ({ selectedTypes, setSelectedTypes }) => {
  const allTypes = [
    'fire', 'water', 'grass', 'electric', 'bug', 'fairy', 'ghost', 'dark',
    'dragon', 'ice', 'fighting', 'poison', 'ground', 'rock', 'steel', 'normal',
    'flying', 'psychic'
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredTypes = allTypes.filter(type =>
    type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTypeToggle = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const removeType = (type) => {
    setSelectedTypes(selectedTypes.filter(t => t !== type));
  };

  const typeColors = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-200',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-700',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-700',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
  };

  return (
    <div className="relative" ref={dropdownRef}>
  
  <div className="flex flex-wrap gap-2 mb-2">
    {selectedTypes.map(type => (
      <span 
        key={type}
        className={`${typeColors[type] || 'bg-gray-300'} text-white px-3 py-1 rounded-full text-sm font-medium capitalize flex items-center gap-1`}
      >
        {type}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            removeType(type);
          }}
          className="text-white hover:text-gray-200"
        >
          ×
        </button>
      </span>
    ))}
  </div>

  {/* Search Input */}
  <div className="relative">
    <input
      type="text"
      placeholder="Search types..."
      className="w-full p-2 border rounded-lg border-gray-300 shadow-sm outline-none"
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        setShowDropdown(true);
      }}
      onFocus={() => setShowDropdown(true)}
    />
    <button 
      className="absolute right-2 z-10 top-2 text-gray-500 hover:text-gray-700"
      onClick={() => setShowDropdown(!showDropdown)}
    >
      {showDropdown ? '▲' : '▼'}
    </button>
  </div>

  {/* Dropdown */}
  {showDropdown && (
    <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
      {filteredTypes.length > 0 ? (
        filteredTypes.map(type => (
          <div
            key={type}
            className={`p-2 hover:bg-gray-100 cursor-pointer flex items-center ${selectedTypes.includes(type) ? 'bg-blue-50' : ''}`}
            onClick={() => handleTypeToggle(type)}
          >
            <div className={`w-4 h-4 rounded-sm mr-2 ${typeColors[type] || 'bg-gray-400'}`}></div>
            <span className="capitalize">{type}</span>
            {selectedTypes.includes(type) && (
              <span className="ml-auto text-blue-500">✓</span>
            )}
          </div>
        ))
      ) : (
        <div className="p-2 text-gray-500">No types found</div>
      )}
    </div>
  )}
</div>
  );
};

export default TypeFilter;