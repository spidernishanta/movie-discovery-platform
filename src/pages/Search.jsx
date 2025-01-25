import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../services/api'; // API service
import MovieCard from '../components/MovieCard';
import '../styles/Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [genre, setGenre] = useState('');
  const [genresList, setGenresList] = useState([]);

  useEffect(() => {
    fetchGenres(); // Fetch genres on initial render
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        searchMovies(query); // Fetch movies dynamically when there's a query
      } else {
        fetchDefaultMovies(); // Fetch default popular movies if no query
      }
    }, 500); // Debounce the API calls
    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    applyFilters(); // Apply filters whenever filter options change
  }, [year, rating, genre, movies]);

  // Fetch genres for the dropdown
  const fetchGenres = async () => {
    try {
      const response = await fetchMovies('genre/movie/list'); // API endpoint for genres
      setGenresList(response.genres || []);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  // Fetch movies for a search query
  const searchMovies = async (searchQuery) => {
    setLoading(true);
    try {
      const data = await fetchMovies('search/movie', { query: searchQuery }); // API for searching movies
      setMovies(data.results || []);
      setFilteredMovies(data.results || []); // Set filteredMovies initially
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch default popular movies
  const fetchDefaultMovies = async () => {
    setLoading(true);
    try {
      const data = await fetchMovies('movie/popular'); // API for popular movies
      setMovies(data.results || []);
      setFilteredMovies(data.results || []);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters to movies
  const applyFilters = () => {
    let filtered = [...movies];

    if (year) {
      filtered = filtered.filter((movie) =>
        movie.release_date ? movie.release_date.startsWith(year) : false
      );
    }

    if (rating) {
      filtered = filtered.filter((movie) =>
        movie.vote_average ? movie.vote_average >= parseFloat(rating) : false
      );
    }

    if (genre) {
      filtered = filtered.filter((movie) =>
        movie.genre_ids ? movie.genre_ids.includes(parseInt(genre)) : false
      );
    }

    setFilteredMovies(filtered);
  };

  return (
    <div className="search-container">
      <h1>Search Movies</h1>

      {/* Search Input */}
      <input
        className="search-input"
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Filters */}
      <div className="filters">
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">Select Year</option>
          {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">Select Rating</option>
          {[9, 8, 7, 6, 5].map((r) => (
            <option key={r} value={r}>
              {r}+
            </option>
          ))}
        </select>

        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Select Genre</option>
          {genresList.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : filteredMovies.length > 0 ? (
        <div className="movie-grid">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>No movies found</p>
      )}
    </div>
  );
};

export default Search;
