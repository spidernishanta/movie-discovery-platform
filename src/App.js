import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import MovieDetails from './pages/MovieDetails'; // Import MovieDetails

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} /> {/* Movie details route */}
      </Routes>
    </Router>
  );
}

export default App;
