import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../contexts/FavoritesContext';

const PokemonCard = ({ pokemon }) => {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const isFavorite = favorites.some((fav) => fav.id === pokemon.id);

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

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  return (
    <Link 
      to={`/pokemon/${pokemon.id}`}
      className="block group"
    >
      <div className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 z-10 p-2 bg-white/80 rounded-full backdrop-blur-sm"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-300 hover:text-red-400'}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Pokemon Image */}
        <div className="bg-gray-100 p-4 flex justify-center">
          <img
            src={pokemon.sprite}
            alt={pokemon.name}
            className="w-32 h-32 object-contain transition-transform group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Pokemon Info */}
        <div className="p-4 flex-grow">
          <span className="text-gray-500 text-sm">#{pokemon.id.toString().padStart(3, '0')}</span>
          <h2 className="text-xl font-bold capitalize mb-2">{pokemon.name}</h2>
          
          {/* Types */}
          <div className="flex flex-wrap gap-2 mt-2">
            {pokemon.types.map((type, index) => (
              <span 
                key={index}
                className={`${typeColors[type] || 'bg-gray-400'} text-white px-3 py-1 rounded-full text-xs font-medium capitalize`}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;