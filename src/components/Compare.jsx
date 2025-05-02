import React, { useState, useContext, useRef, useEffect } from 'react';
import { PokemonContext } from '../contexts/PokemonContext';

const Compare = () => {
  const { allPokemons } = useContext(PokemonContext);
  const [firstPokemon, setFirstPokemon] = useState(null);
  const [secondPokemon, setSecondPokemon] = useState(null);
  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) {
        setShowDropdown1(false);
      }
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
        setShowDropdown2(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredPokemons1 = allPokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm1.toLowerCase())
  );
  const filteredPokemons2 = allPokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm2.toLowerCase())
  );

  const handleFirstSelect = (pokemon) => {
    setFirstPokemon(pokemon);
    setSearchTerm1(pokemon.name);
    setShowDropdown1(false);
  };

  const handleSecondSelect = (pokemon) => {
    setSecondPokemon(pokemon);
    setSearchTerm2(pokemon.name);
    setShowDropdown2(false);
  };

  const getStatWidth = (value) => {
    const maxStat = 200;
    return `${(value / maxStat) * 100}%`;
  };

  const calculateWinner = () => {
    if (!firstPokemon || !secondPokemon) return null;

    let firstScore = 0;
    let secondScore = 0;
    const statComparison = [];

    firstPokemon.stats.forEach((stat, index) => {
      const comparison = {
        statName: stat.name,
        firstValue: stat.value,
        secondValue: secondPokemon.stats[index].value,
        winner: null
      };

      if (stat.value > secondPokemon.stats[index].value) {
        firstScore++;
        comparison.winner = 'first';
      } else if (stat.value < secondPokemon.stats[index].value) {
        secondScore++;
        comparison.winner = 'second';
      }

      statComparison.push(comparison);
    });

    return {
      firstScore,
      secondScore,
      statComparison,
      overallWinner: firstScore > secondScore ? 'first' : 
                    secondScore > firstScore ? 'second' : 'tie'
    };
  };

  const winnerData = calculateWinner();

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Pokémon Comparison</h1>
      
      {/* Search Section with VS */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {/* First Pokémon Selector */}
        <div className="relative w-full max-w-md" ref={dropdownRef1}>
          <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm hover:border-blue-400 transition-colors">
            <input
              type="text"
              placeholder="Search first Pokémon..."
              className="flex-grow p-3 outline-none"
              value={searchTerm1}
              onChange={(e) => {
                setSearchTerm1(e.target.value);
                setShowDropdown1(true);
              }}
              onFocus={() => setShowDropdown1(true)}
            />
            {firstPokemon && (
              <img 
                src={firstPokemon.sprite} 
                alt={firstPokemon.name} 
                className="w-12 h-12 object-contain p-1"
              />
            )}
          </div>
          {showDropdown1 && (
            <div className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto">
              {filteredPokemons1.length > 0 ? (
                filteredPokemons1.map((pokemon) => (
                  <div
                    key={`first-${pokemon.id}`}
                    className="p-3 hover:bg-blue-50 cursor-pointer flex items-center border-b border-gray-100 last:border-0"
                    onClick={() => handleFirstSelect(pokemon)}
                  >
                    <img 
                      src={pokemon.sprite} 
                      alt={pokemon.name} 
                      className="w-10 h-10 mr-3"
                    />
                    <span className="font-medium">
                      #{pokemon.id.toString().padStart(3, '0')} - {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-3 text-gray-500">No Pokémon found</div>
              )}
            </div>
          )}
        </div>

        {/* VS Badge */}
        <div className="flex-shrink-0">
          <div className="bg-red-500 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
            VS
          </div>
        </div>

        {/* Second Pokémon Selector */}
        <div className="relative w-full max-w-md" ref={dropdownRef2}>
          <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm hover:border-blue-400 transition-colors">
            <input
              type="text"
              placeholder="Search second Pokémon..."
              className="flex-grow p-3 outline-none"
              value={searchTerm2}
              onChange={(e) => {
                setSearchTerm2(e.target.value);
                setShowDropdown2(true);
              }}
              onFocus={() => setShowDropdown2(true)}
            />
            {secondPokemon && (
              <img 
                src={secondPokemon.sprite} 
                alt={secondPokemon.name} 
                className="w-12 h-12 object-contain p-1"
              />
            )}
          </div>
          {showDropdown2 && (
            <div className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto">
              {filteredPokemons2.length > 0 ? (
                filteredPokemons2.map((pokemon) => (
                  <div
                    key={`second-${pokemon.id}`}
                    className="p-3 hover:bg-blue-50 cursor-pointer flex items-center border-b border-gray-100 last:border-0"
                    onClick={() => handleSecondSelect(pokemon)}
                  >
                    <img 
                      src={pokemon.sprite} 
                      alt={pokemon.name} 
                      className="w-10 h-10 mr-3"
                    />
                    <span className="font-medium">
                      #{pokemon.id.toString().padStart(3, '0')} - {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-3 text-gray-500">No Pokémon found</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Winner Card */}
      {winnerData && (
        <div className="mb-8">
          <div className={`bg-gradient-to-r ${winnerData.overallWinner === 'first' ? 'from-blue-100 to-blue-50 border-l-4 border-blue-500' : 
                         winnerData.overallWinner === 'second' ? 'from-red-100 to-red-50 border-l-4 border-red-500' : 
                         'from-purple-100 to-purple-50 border-l-4 border-purple-500'} p-6 rounded-lg shadow-md`}>
            <h2 className="text-2xl font-bold mb-4 text-center">
              {winnerData.overallWinner === 'first' ? `${firstPokemon.name.toUpperCase()} WINS!` :
               winnerData.overallWinner === 'second' ? `${secondPokemon.name.toUpperCase()} WINS!` : 
               "IT'S A TIE!"}
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{winnerData.firstScore}</div>
                <div className="text-sm uppercase text-gray-600">Winning Stats</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{winnerData.secondScore}</div>
                <div className="text-sm uppercase text-gray-600">Winning Stats</div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {winnerData.statComparison.map((stat, index) => (
                <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="text-sm font-medium text-gray-500 capitalize mb-1">
                    {stat.statName.replace('-', ' ')}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`font-bold ${stat.winner === 'first' ? 'text-blue-600' : ''}`}>
                      {stat.firstValue}
                    </span>
                    <span className="text-xs text-gray-400 mx-2">vs</span>
                    <span className={`font-bold ${stat.winner === 'second' ? 'text-red-600' : ''}`}>
                      {stat.secondValue}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pokémon Cards with VS */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {firstPokemon && (
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col items-center">
                <img 
                  src={firstPokemon.sprite} 
                  alt={firstPokemon.name} 
                  className="w-40 h-40 object-contain"
                />
                <h2 className="text-2xl font-bold capitalize mt-4 text-center">
                  #{firstPokemon.id.toString().padStart(3, '0')} {firstPokemon.name}
                </h2>
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {firstPokemon.types.map((type, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium capitalize"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {firstPokemon.stats.map((stat, index) => {
                  const isWinning = winnerData?.statComparison[index]?.winner === 'first';
                  return (
                    <div key={stat.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize font-medium text-gray-700">
                          {stat.name.replace('-', ' ')}
                        </span>
                        <span className={`font-bold ${isWinning ? 'text-blue-600' : 'text-gray-600'}`}>
                          {stat.value}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${isWinning ? 'bg-blue-500' : 'bg-gray-400'}`}
                          style={{ width: getStatWidth(stat.value) }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {secondPokemon && (
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col items-center">
                <img 
                  src={secondPokemon.sprite} 
                  alt={secondPokemon.name} 
                  className="w-40 h-40 object-contain"
                />
                <h2 className="text-2xl font-bold capitalize mt-4 text-center">
                  #{secondPokemon.id.toString().padStart(3, '0')} {secondPokemon.name}
                </h2>
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {secondPokemon.types.map((type, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium capitalize"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {secondPokemon.stats.map((stat, index) => {
                  const isWinning = winnerData?.statComparison[index]?.winner === 'second';
                  return (
                    <div key={stat.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize font-medium text-gray-700">
                          {stat.name.replace('-', ' ')}
                        </span>
                        <span className={`font-bold ${isWinning ? 'text-red-600' : 'text-gray-600'}`}>
                          {stat.value}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${isWinning ? 'bg-red-500' : 'bg-gray-400'}`}
                          style={{ width: getStatWidth(stat.value) }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* VS Badge between cards */}
        {(firstPokemon || secondPokemon) && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-red-600 text-white font-bold rounded-full w-16 h-16 flex items-center justify-center shadow-xl text-xl">
              VS
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;