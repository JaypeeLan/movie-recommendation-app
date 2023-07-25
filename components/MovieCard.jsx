function MovieCard({ movie, onClick }) {
  return (
    <div style={{ margin: "1rem", width: "calc(25% - 2rem)" }}>
      <button onClick={() => onClick(movie.id)} style={{ cursor: "pointer" }}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{ width: "100%" }}
        />
      </button>
      <h3>{movie.title}</h3>
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
    </div>
  );
}

export default MovieCard;
