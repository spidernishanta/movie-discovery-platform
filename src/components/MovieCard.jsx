import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/MovieCard.css';

const MovieCard = ({ movie }) => {
  if (!movie) return null;

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-link"> {/* Add Link to navigate to MovieDetails */}
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
        <h3>{movie.title}</h3>
        <p>⭐ Rating: {movie.vote_average}</p>
      </Link>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieCard;
