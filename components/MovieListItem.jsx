function MovieListItem({ movie, onClick }) {
  return (
    <li>
      <button style={{ cursor: "pointer" }} onClick={() => onClick(movie.id)}>
        {movie.title}
      </button>
    </li>
  );
}

export default MovieListItem;
