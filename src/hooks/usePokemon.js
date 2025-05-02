import { useState, useEffect } from 'react';

function usePokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await response.json();
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            const pokemonData = await response.json();
            return {
              id: pokemonData.id,
              name: pokemonData.name,
              image: pokemonData.sprites.front_default,
              types: pokemonData.types.map((type) => type.type.name),
            };
          })
        );
        setPokemons(pokemonDetails);
      } catch (err) {
        setError('Failed to fetch Pokémon data');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  return { pokemons, loading, error };
}

export default usePokemon;
