import React from 'react';

function Sorting({ sortOption, onSortChange }) {
  return (
    <div className="relative">
      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="block w-full p-2 pr-8 border border-gray-300 rounded-lg shadow-sm outline-none appearance-none bg-transparent"
      >
        <option value="">Default Order</option>
        <option value="id-asc">ID: Low to High</option>
        <option value="id-desc">ID: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}

export default Sorting;