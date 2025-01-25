import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import '../styles/Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites-container">
      <h1>My Favorites</h1>
      {favorites.length > 0 ? (
        <div className="movie-grid">
          {favorites.map((movie) => (
            <div key={movie.id} className="movie-card-container">
              <MovieCard movie={movie} />
              <button
                className="remove-btn"
                onClick={() => removeFavorite(movie.id)}
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-state-message">You have no favorite movies.</p>
      )}
    </div>
  );
};

export default Favorites;
