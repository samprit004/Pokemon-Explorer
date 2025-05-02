import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on initial load
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Update localStorage whenever favorites change
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  const addFavorite = (pokemon) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, pokemon];
      return updatedFavorites;
    });
  };

  const removeFavorite = (pokemonId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((pokemon) => pokemon.id !== pokemonId)
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
