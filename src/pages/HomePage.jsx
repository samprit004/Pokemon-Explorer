import React, { useContext, useEffect, useState } from 'react';
import { PokemonContext } from '../contexts/PokemonContext';
import Header from '../components/Header';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Sorting from '../components/Sorting';
import TypeFilter from '../components/TypeFilter';
import RandomButton from '../components/RandomButton';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function HomePage() {
  const { allPokemons, loading, error } = useContext(PokemonContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [randomPokemon, setRandomPokemon] = useState(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOption, setSortOption] = useState('');

  const [filteredPokemons, setFilteredPokemons] = useState([]);

  const clearRandomPokemon = () => {
    setRandomPokemon(null);
  };

  // Filtering + Sorting
  useEffect(() => {
    let updatedList = [...allPokemons];

    // Filter by Type
    if (selectedTypes.length > 0) {
      updatedList = updatedList.filter(pokemon =>
        pokemon.types.some(type => selectedTypes.includes(type))
      );
    }

    // Filter by Search
    if (searchQuery) {
      updatedList = updatedList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortOption) {
      const [sortBy, sortDirection] = sortOption.split('-');
      updatedList.sort((a, b) => {
        if (sortBy === 'id') {
          return sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
        } else if (sortBy === 'name') {
          return sortDirection === 'asc' 
            ? a.name.localeCompare(b.name) 
            : b.name.localeCompare(a.name);
        }
        return 0;
      });
    }

    setFilteredPokemons(updatedList);
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [allPokemons, selectedTypes, searchQuery, sortOption]);

  // Determine if we're in filtered state
  const isFiltered = 
    searchQuery !== '' || 
    selectedTypes.length > 0 || 
    sortOption !== '';

  // Get current pokemons to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPokemons = isFiltered
    ? filteredPokemons.slice(indexOfFirstItem, indexOfLastItem)
    : allPokemons.slice(indexOfFirstItem, indexOfLastItem);

  // Total items count for pagination
  const totalItems = isFiltered ? filteredPokemons.length : allPokemons.length;

  // Pagination handlers
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className='w-full min-h-screen bg-gray-50'>
      <Header />
      <div className="container mx-auto px-4 py-8">

        {/* Search and Buttons Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="w-full sm:w-2/3">
            <SearchBar setSearchQuery={setSearchQuery} />
          </div>
          <div className="flex items-center gap-2">
            <RandomButton 
              pokemons={allPokemons} 
              onSelect={setRandomPokemon}
              hasRandomPokemon={!!randomPokemon}
              onClear={clearRandomPokemon}
            />
            
          </div>
        </div>

        {/* Filters Row */}
        <div className="mb-8 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Sort By</h3>
            <Sorting sortOption={sortOption} onSortChange={setSortOption} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Filter By Type</h3>
            <TypeFilter 
              selectedTypes={selectedTypes} 
              setSelectedTypes={setSelectedTypes} 
            />
          </div>
        </div>

        {/* Random Pokemon Section */}
        {randomPokemon && (
          <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Your Random Pokémon</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <PokemonCard pokemon={randomPokemon} />
            </div>
          </div>
        )}

        {/* Pokemon Grid */}
        {currentPokemons.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700">No Pokémon found matching your criteria</h2>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {currentPokemons.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>

            {/* Pagination - Show for both default and filtered states */}
            <div className="mt-8">
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                currentPage={currentPage}
                paginate={paginate}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;