const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const fetchMovies = async (endpoint, params = {}) => {
  try {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    url.searchParams.append('api_key', API_KEY);
    for (const key in params) {
      url.searchParams.append(key, params[key]);
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    throw error;
  }
};

export const fetchGenres = async () => {
  try {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch genres:', error);
    throw error;
  }
};
