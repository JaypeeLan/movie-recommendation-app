import "./moviecard.css";
function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-cards">
      <button onClick={() => onClick(movie.id)}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </button>
      <h3>{movie.title}</h3>
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
    </div>
  );
}

export default MovieCard;
