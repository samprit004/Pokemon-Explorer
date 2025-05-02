import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PokemonContext } from '../contexts/PokemonContext';
import Header from './Header';

function PokemonDetail() {
  const { pokemonId } = useParams();
  const navigate = useNavigate();
  const { allPokemons, loading, error } = useContext(PokemonContext);
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [evolutionDetails, setEvolutionDetails] = useState([]);

  useEffect(() => {
    const pokemon = allPokemons.find((p) => p.id === parseInt(pokemonId));
    setPokemonDetail(pokemon);

    if (pokemon?.evolutionChain?.length > 0) {
      const evolutions = pokemon.evolutionChain.map(name => 
        allPokemons.find(p => p.name === name)
      ).filter(Boolean);
      setEvolutionDetails(evolutions);
    }
  }, [pokemonId, allPokemons]);

  const handleEvolutionClick = (pokemonId) => {
    navigate(`/pokemon/${pokemonId}`);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    </div>
  );
  
  if (!pokemonDetail) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 max-w-md">
        <p className="font-bold">Not Found</p>
        <p>Pokémon with ID {pokemonId} not found!</p>
      </div>
    </div>
  );

  const getStatColor = (value) => {
    if (value < 60) return 'bg-red-400';
    if (value < 120) return 'bg-yellow-400';
    if (value < 180) return 'bg-green-400';
    return 'bg-blue-400';
  };

  const calculateStatPercentage = (value) => {
    return Math.min((value / 200) * 100, 100);
  };

  return (
    <div>
      <Header/>
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-10 px-4">
      
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header with image and basic info */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-48 h-48 bg-white rounded-full p-2 shadow-lg flex items-center justify-center">
              <img 
                src={pokemonDetail.sprite} 
                alt={pokemonDetail.name} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="md:ml-8 mt-6 md:mt-0 text-center md:text-left">
              <h1 className="text-4xl font-bold capitalize">
                {pokemonDetail.name}
              </h1>
              <p className="text-xl opacity-90">#{pokemonDetail.id.toString().padStart(3, '0')}</p>
              
              <div className="flex justify-center md:justify-start gap-2 mt-4">
                {pokemonDetail.types.map((type, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-1 bg-white bg-opacity-20 text-black rounded-full text-sm font-medium capitalize backdrop-blur-sm"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Details section */}
        <div className="p-6">
          {/* Evolution Chain - Now clickable */}
          {evolutionDetails.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Evolution Chain</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {evolutionDetails.map((evo, index) => (
                  <button
                    key={index}
                    onClick={() => handleEvolutionClick(evo.id)}
                    className={`flex flex-col items-center group ${evo.id === pokemonDetail.id ? 'cursor-default' : 'cursor-pointer hover:scale-105 transition-transform'}`}
                  >
                    <div className={`w-24 h-24 bg-white rounded-full p-1 shadow-md flex items-center justify-center ${evo.id === pokemonDetail.id ? 'ring-4 ring-yellow-400' : 'group-hover:ring-2 group-hover:ring-red-400'}`}>
                      <img 
                        src={evo.sprite} 
                        alt={evo.name} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="mt-2 font-medium capitalize">{evo.name}</span>
                    <span className="text-sm text-gray-500">#{evo.id.toString().padStart(3, '0')}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Stats</h2>
            <div className="space-y-4">
              {pokemonDetail.stats.map((stat, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="capitalize font-medium text-gray-700">{stat.name}</span>
                    <span className="font-bold text-gray-900">{stat.value}/200</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full ${getStatColor(stat.value)} transition-all duration-500`}
                      style={{ width: `${calculateStatPercentage(stat.value)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Abilities */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Abilities</h2>
            <div className="flex flex-wrap gap-3">
              {pokemonDetail.abilities && pokemonDetail.abilities.length > 0 ? (
                pokemonDetail.abilities.map((ability, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg capitalize font-medium shadow-sm hover:bg-gray-200 transition"
                  >
                    {ability}
                  </span>
                ))
              ) : (
                <span className="text-gray-500 italic">No abilities listed</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default PokemonDetail;