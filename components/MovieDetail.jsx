import { useSelector } from "react-redux";

function MovieDetail({ id }) {
  const movie = useSelector((state) =>
    state.movie.movies.find((movie) => movie.id === id)
  );

  return (
    <div>
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Runtime: {movie.runtime} minutes</p>
      <p>Average Rating: {movie.vote_average}</p>
    </div>
  );
}

export default MovieDetail;
