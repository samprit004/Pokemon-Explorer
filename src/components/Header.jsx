import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  return (
    <header className="bg-gradient-to-r from-red-600 to-red-500 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center py-4">
          <Link to="/" className="flex items-center group">
            <img 
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" 
              alt="Pikachu" 
              className="h-12 w-12 mr-3 group-hover:animate-bounce"
            />
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Pokémon<span className="text-yellow-300">Explorer</span>
            </h1>
          </Link>

          <nav className="flex gap-1 md:gap-4 mt-4 md:mt-0">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/' ? 'bg-white text-red-600' : 'text-white hover:bg-red-700 hover:bg-opacity-75'}`}
            >
              Home
            </Link>
            <Link 
              to="/favorites" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/favorites' ? 'bg-white text-red-600' : 'text-white hover:bg-red-700 hover:bg-opacity-75'}`}
            >
              Favorites
            </Link>
            <Link 
              to="/compare" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/compare' ? 'bg-white text-red-600' : 'text-white hover:bg-red-700 hover:bg-opacity-75'}`}
            >
              Compare
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;