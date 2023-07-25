import { useDispatch } from "react-redux";
import { selectGenre, deselectGenre } from "../redux/movieSlice";

function GenreSelect({ genre }) {
  const dispatch = useDispatch();

  return (
    <li>
      <label>
        <input
          type="checkbox"
          onChange={(e) =>
            e.target.checked
              ? dispatch(selectGenre(genre.id))
              : dispatch(deselectGenre(genre.id))
          }
        />
        {genre.name}
      </label>
    </li>
  );
}

export default GenreSelect;
