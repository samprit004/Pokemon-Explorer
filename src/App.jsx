// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PokemonProvider } from './contexts/PokemonContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import HomePage from './pages/HomePage';
import PokemonDetail from './components/PokemonDetail';
import FavoritesPage from './pages/FavoritesPage';
import ComparePage from './pages/ComparePage'; 

function App() {
  return (
    <PokemonProvider>
      <FavoritesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pokemon/:pokemonId" element={<PokemonDetail />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/compare" element={<ComparePage />} /> 
          </Routes>
        </Router>
      </FavoritesProvider>
    </PokemonProvider>
  );
}

export default App;
