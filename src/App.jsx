import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, fetchGenres } from "../redux/movieSlice";

import MovieModal from "../components/MovieModal";
import GenresList from "../components/GenresList";
import MoviesList from "../components/MoviesList";
import useLocalStorage from "../hooks/useLocalStorage";
import "./App.css"; // Import the CSS file

function App() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.movies);
  const genres = useSelector((state) => state.movie.genres);
  const [selectedGenreIds, setSelectedGenreIds] = useLocalStorage(
    "selectedGenres",
    []
  );
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchGenres());
  }, [dispatch]);

  useEffect(() => {
    const storedSelectedGenres = JSON.parse(
      localStorage.getItem("selectedGenres")
    );
    if (storedSelectedGenres) {
      setSelectedGenreIds(storedSelectedGenres);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedGenres", JSON.stringify(selectedGenreIds));
  }, [selectedGenreIds]);

  const handleSelectGenre = (genreId) => {
    setSelectedGenreIds((prevSelectedGenreIds) =>
      prevSelectedGenreIds.includes(genreId)
        ? prevSelectedGenreIds.filter((id) => id !== genreId)
        : [...prevSelectedGenreIds, genreId]
    );
  };

  // Filter movies based on selected genres
  const filteredMovies =
    selectedGenreIds.length === 0
      ? movies
      : movies.filter((movie) =>
          movie.genre_ids.some((id) => selectedGenreIds.includes(id))
        );

  return (
    <div className="container">
      <h1 className="movie-recommendations">Movie Recommendations</h1>
      <h2 className="movie-recommendations">Select Genres</h2>
      <GenresList
        genres={genres}
        selectedGenreIds={selectedGenreIds}
        handleSelectGenre={handleSelectGenre}
      />

      <MoviesList
        movies={filteredMovies}
        setSelectedMovieId={setSelectedMovieId}
      />

      {selectedMovieId && (
        <MovieModal
          id={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
        />
      )}
    </div>
  );
}

export default App;
