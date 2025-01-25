import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchMovies } from '../services/api'; // API helper
import '../styles/MovieDetails.css';

const MovieDetails = () => {
  const { movieId } = useParams();  // Get the movieId from the URL
  const navigate = useNavigate();   // Hook for navigation
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        // Fetch movie details
        const movieData = await fetchMovies(`movie/${movieId}`);
        setMovie(movieData);

        // Check if this movie is already in favorites
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isInFavorites = storedFavorites.some((favMovie) => favMovie.id === movieData.id);
        setIsFavorite(isInFavorites);

        // Fetch similar movies
        const similarData = await fetchMovies(`movie/${movieId}/similar`);
        setSimilarMovies(similarData.results || []);
      } catch (error) {
        console.error('Error fetching movie data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const toggleFavorite = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = storedFavorites.filter((movie) => movie.id !== movieId);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      // Add to favorites
      const movieToAdd = { ...movie }; // Copy the movie data
      storedFavorites.push(movieToAdd);
      localStorage.setItem('favorites', JSON.stringify(storedFavorites));
    }
    setIsFavorite((prev) => !prev); // Toggle the favorite status
  };

  const goBack = () => {
    navigate(-1);  // Go back to the previous page
  };

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="movie-details-container">
      {movie && (
        <>
          <h1>{movie.title}</h1>
          <div className="movie-details">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
              className="movie-poster" 
            />
            <div className="movie-info">
              <p><strong>Overview:</strong> {movie.overview}</p>
              <p><strong>Release Date:</strong> {movie.release_date}</p>
              <p><strong>Genres:</strong> {movie.genres.map((genre) => genre.name).join(', ')}</p>
              <p><strong>Rating:</strong> {movie.vote_average}/10</p>
              <button onClick={toggleFavorite} className="favorite-button">
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
              <button onClick={goBack} className="back-button">Back</button>
            </div>
          </div>

          <h3>Similar Movies</h3>
          <div className="similar-movies">
            {similarMovies.length > 0 ? (
              similarMovies.map((similarMovie) => (
                <Link
                  key={similarMovie.id}
                  to={`/movie/${similarMovie.id}`} // Navigate to the similar movie's details
                  className="similar-movie-card"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${similarMovie.poster_path}`}
                    alt={similarMovie.title}
                    className="similar-movie-poster"
                  />
                  <p>{similarMovie.title}</p>
                </Link>
              ))
            ) : (
              <p>No similar movies found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
