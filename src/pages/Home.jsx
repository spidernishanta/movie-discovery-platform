import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMovies, fetchGenres } from '../services/api';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [filteredTrendingMovies, setFilteredTrendingMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Fetch featured movies and popular movies
  useEffect(() => {
    fetchMovies('movie/now_playing').then((data) => setFeaturedMovies(data.results));
    fetchGenres().then((data) => setGenres(data.genres));
    fetchMovies('trending/movie/day').then((data) => {
      setTrendingMovies(data.results);
      setFilteredTrendingMovies(data.results);
    });
    fetchMovies('movie/popular', 1).then((data) => {
      setMovies(data.results);
      setFilteredMovies(data.results);
    });
  }, []);

  // infinite scrolling
  const loadMoreMovies = () => {
    fetchMovies('movie/popular', page + 1).then((data) => {
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
      setFilteredMovies((prevMovies) => [...prevMovies, ...data.results]);
      setPage((prevPage) => prevPage + 1);
    });
  };

  // Handle genre filtering
  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    if (genreId === null) {
      // Reset filters
      setFilteredMovies(movies);
      setFilteredTrendingMovies(trendingMovies);
    } else {
      // Filter popular movies
      const filteredPopular = movies.filter((movie) =>
        movie.genre_ids.includes(genreId)
      );
      setFilteredMovies(filteredPopular);

      // Filter trending movies
      const filteredTrending = trendingMovies.filter((movie) =>
        movie.genre_ids.includes(genreId)
      );
      setFilteredTrendingMovies(filteredTrending);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="home-container">
      <h1>Unlimited movies, TV shows and more</h1>

      {/* Featured Movies Carousel */}
      <section className="featured-movies">
        <h2>Now Playing</h2>
        <Slider {...sliderSettings}>
          {featuredMovies.map((movie) => (
            <div key={movie.id}>
              <Link to={`/movie/${movie.id}`} className="movie-link">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="featured-image"
              />
              </Link>
              <h3 className="featured-title">{movie.title}</h3>
            </div>
          ))}
        </Slider>
      </section>

      {/* Movie Categories */}
      <section className="movie-genres">
        <h2>Categories</h2>
        <div className="genres-list">
          <span
            className={`genre-item ${selectedGenre === null ? 'active' : ''}`}
            onClick={() => handleGenreClick(null)}
          >
            All
          </span>
          {genres.map((genre) => (
            <span
              key={genre.id}
              className={`genre-item ${selectedGenre === genre.id ? 'active' : ''}`}
              onClick={() => handleGenreClick(genre.id)}
            >
              {genre.name}
            </span>
          ))}
        </div>
      </section>

      {/* Trending Movies Section */}
      <section className="trending-movies">
        <h2>Trending Movies</h2>
        <div className="trending-list">
          {filteredTrendingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Infinite Scroll Movie List */}
      <section className="infinite-scroll">
        <h2>Popular Movies</h2>
        <InfiniteScroll
          dataLength={filteredMovies.length}
          next={loadMoreMovies}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          className="movies-grid"
        >
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </InfiniteScroll>
      </section>
    </div>
  );
};

export default Home;
