import React from 'react';

const RandomButton = ({ pokemons, onSelect, hasRandomPokemon, onClear }) => {
  const getRandomPokemon = () => {
    if (pokemons.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * pokemons.length);
    return pokemons[randomIndex];
  };

  const handleClick = () => {
    const randomPokemon = getRandomPokemon();
    if (randomPokemon) {
      onSelect(randomPokemon);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleClick}
        className={`${hasRandomPokemon ? 'bg-gray-200' : 'bg-yellow-400 hover:bg-yellow-500'} text-gray-800 font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 flex items-center`}
        disabled={hasRandomPokemon}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
            clipRule="evenodd"
          />
        </svg>
        {hasRandomPokemon ? 'Random Selected' : 'Random Pokémon'}
      </button>

      {hasRandomPokemon && (
        <button
          onClick={onClear}
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition-colors duration-200"
          aria-label="Clear random Pokémon"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default RandomButton;