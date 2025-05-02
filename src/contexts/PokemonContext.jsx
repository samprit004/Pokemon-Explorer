import React, { createContext, useState, useEffect } from 'react';

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [allPokemons, setAllPokemons] = useState([]); // All 150
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await response.json();

        const pokemonData = await Promise.all(
          data.results.map(async (pokemon) => {
            const details = await fetch(pokemon.url);
            const detailsData = await details.json();

            // 🔥 Fetch species to get evolution chain
            const speciesResponse = await fetch(detailsData.species.url);
            const speciesData = await speciesResponse.json();

            // 🔥 Fetch evolution chain
            const evoResponse = await fetch(speciesData.evolution_chain.url);
            const evoData = await evoResponse.json();

            // Extract evolution names (simple chain)
            let evolutionChain = [];
            let evoChainLink = evoData.chain;

            do {
              evolutionChain.push(evoChainLink.species.name);
              evoChainLink = evoChainLink.evolves_to[0];
            } while (evoChainLink && evoChainLink.hasOwnProperty('evolves_to'));

            return {
              id: detailsData.id,
              name: detailsData.name,
              types: detailsData.types.map((type) => type.type.name),
              sprite: detailsData.sprites.front_default,
              stats: detailsData.stats.map((stat) => ({
                name: stat.stat.name,
                value: stat.base_stat,
              })),
              // New Abilities 🔥
              abilities: detailsData.abilities.map((a) => a.ability.name),
              // New Evolution Chain 🔄
              evolutionChain,
            };
          })
        );

        setAllPokemons(pokemonData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch Pokémon');
        setLoading(false);
      }
    }

    fetchPokemons();
  }, []);

  // Pagination Logic (for cards display only)
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemons: currentPokemons, // For paginated display
        allPokemons,               // For search, filter, dropdowns → always 150
        loading,
        error,
        currentPage,
        changePage,
        pokemonsPerPage,
        totalPages: Math.ceil(allPokemons.length / pokemonsPerPage),
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
