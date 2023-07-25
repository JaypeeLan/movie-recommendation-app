import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, fetchGenres } from "../redux/movieSlice";

import MovieModal from "../components/MovieModal";
import MovieCard from "../components/MovieCard";

function App() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.movies);
  const genres = useSelector((state) => state.movie.genres);
  const [selectedGenreIds, setSelectedGenreIds] = useState([]);
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
    setSelectedGenreIds((selectedGenreIds) =>
      selectedGenreIds.includes(genreId)
        ? selectedGenreIds.filter((id) => id !== genreId)
        : [...selectedGenreIds, genreId]
    );
  };

  const filteredMovies =
    selectedGenreIds.length === 0
      ? movies
      : movies.filter((movie) =>
          movie.genre_ids.some((id) => selectedGenreIds.includes(id))
        );

  return (
    <div>
      <h1>Movie Recommendations</h1>
      <h2>Select Genres</h2>
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>
            <label>
              <input
                type="checkbox"
                onChange={() => handleSelectGenre(genre.id)}
              />
              {genre.name}
            </label>
          </li>
        ))}
      </ul>
      <h2>Movies</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={setSelectedMovieId}
          />
        ))}
      </div>
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
