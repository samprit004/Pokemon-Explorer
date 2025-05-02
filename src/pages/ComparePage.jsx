import React from 'react';
import Compare from '../components/Compare';
import Header from '../components/Header';

const ComparePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Compare Pokémon</h1>
        <Compare />
      </div>
    </div>
  );
};

export default ComparePage;
