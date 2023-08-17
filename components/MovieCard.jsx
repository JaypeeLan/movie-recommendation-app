import "./moviecard.css";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist } from "../redux/movieSlice";

function MovieCard({ movie, onClick }) {
  const dispatch = useDispatch();

  const handleAddToWishlist = (movieId) => {
    dispatch(addWishlist(movieId));
  };

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
      <button onClick={() => handleAddToWishlist(movie.id)}>
        Add to wishlist
      </button>
    </div>
  );
}

export default MovieCard;
