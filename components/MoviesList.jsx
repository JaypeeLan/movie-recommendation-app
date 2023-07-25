// MoviesList.js
import React from "react";
import MovieCard from "./MovieCard";

function MoviesList({ movies, setSelectedMovieId }) {
  return (
    <div className="movies">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => setSelectedMovieId(movie.id)}
          className="movie-card"
        />
      ))}
    </div>
  );
}

export default MoviesList;
