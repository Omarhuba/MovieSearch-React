import React, { useEffect, useState } from "react";

import "./App.css";
import svg from "./assets/search.svg";
import { MovieCard } from "./components/MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=33c5f1cd";

function App() {
  const [movies, setMovies] = useState([]);
  const [movieTerm, setMovieTerm] = useState("");

  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title} `);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovie();
  }, []);

  return (
    <div className="app">
      <h1>Movie Land</h1>
      <div className="search">
        <input
          placeholder="Search For Movie"
          value={movieTerm}
          onChange={(e) => {
            setMovieTerm(e.target.value);
          }}
        />
        <img
          src={svg}
          alt="searchIcon"
          onClick={() => {
            searchMovie(movieTerm);
          }}
        />
      </div>
      {/* viktig */}
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No More Movies Found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
