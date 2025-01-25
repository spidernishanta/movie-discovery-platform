Movie Discovery Platform

Welcome to the Movie Discovery Platform! This React application allows users to search, filter, and explore movies dynamically using the TMDB API.

Project Setup Instructions

To get started with the project, follow these steps:

Clone the Repository:

git clone https://github.com/your-repo/movie-discovery-platform.git
cd movie-discovery-platform

Install Dependencies:

npm install

Set Up Environment Variables:

Create a .env file in the root directory.

Add your TMDB API key as follows:

REACT_APP_TMDB_API_KEY=your_api_key_here

Run the Application:

npm start

Open http://localhost:3000 in your browser to view the app.

Build for Production:
To create an optimized production build, run:

npm run build

Features Implemented

Dynamic Search:

Search movies by title with a debounce feature to optimize API calls.

Filters:

Filter movies by year, rating, and genre.

Responsive Design:

Fully responsive layout for a seamless experience across devices.

Loading States:

Visual feedback while data is being fetched.

Error Handling:

Graceful handling of API errors and empty search results.

Technologies Used

Frontend:

React.js

React Hooks (useState, useEffect, useCallback)

Styling:

CSS Modules

API Integration:

TMDB API

Deployment:

Netlify

Screenshots

Home Page



Search Results



Filters
