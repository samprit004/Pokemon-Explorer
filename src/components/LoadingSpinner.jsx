import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500"></div>
      <p className="mt-4 text-lg font-medium text-gray-700">Loading Pokémon...</p>
    </div>
  );
};

export default LoadingSpinner;