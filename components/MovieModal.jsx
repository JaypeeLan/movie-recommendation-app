import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

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
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        ref={modalRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "1rem",
          maxHeight: "80vh",
          overflowY: "scroll",
          color: "black",
        }}
      >
        <button onClick={onClose} style={{ color: "black" }}>
          Close
        </button>
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
    </div>
  );
}

export default MovieModal;
