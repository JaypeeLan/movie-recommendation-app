import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import "./moviemodal.css"; // Import the CSS file

function MovieModal({ id, onClose }) {
  const movie = useSelector((state) =>
    state.movie.movies.find((movie) => movie.id === id)
  );
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div ref={modalRef} className="modal-container">
        <button onClick={onClose} className="modal-close-btn">
          X
        </button>
        <h2>{movie.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="modal-image"
        />
        <p>{movie.overview}</p>
        <p>Release Date: {movie.release_date}</p>
        <p>Runtime: {movie.runtime} minutes</p>
        <p>Average Rating: {movie.vote_average}</p>
      </div>
    </div>
  );
}

export default MovieModal;
