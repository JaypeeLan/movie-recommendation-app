// GenresList.js
import React from "react";

function GenresList({ genres, selectedGenreIds, handleSelectGenre }) {
  return (
    <div className="genre-list">
      {genres.map((genre) => (
        <label key={genre.id} className="genre-item">
          <input
            type="checkbox"
            onChange={() => handleSelectGenre(genre.id)}
            checked={selectedGenreIds.includes(genre.id)}
          />
          <span>{genre.name}</span>
        </label>
      ))}
    </div>
  );
}

export default GenresList;
