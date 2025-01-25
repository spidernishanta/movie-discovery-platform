import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Movie Discovery Platform</h1>
      <div className="nav-links">
        <NavLink to="/" activeClassName="active-link" exact>
          Home
        </NavLink>
        <NavLink to="/search" activeClassName="active-link">
          Search
        </NavLink>
        <NavLink to="/favorites" activeClassName="active-link">
          Favorites
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
