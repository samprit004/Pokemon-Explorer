// src/pages/FavoritesPage.jsx
import React, { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';
import PokemonCard from '../components/PokemonCard';
import Header from '../components/Header';

function FavoritesPage() {
  const { favorites } = useContext(FavoritesContext);

  if (favorites.length === 0) {
    return <div className="text-center">You don't have any favorite Pokémon yet!</div>;
  }

  return (
  <div>
    <Header/>
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Favorite Pokémon</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
    </div>
  );
}

export default FavoritesPage;
