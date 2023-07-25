export const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    if (action.type === "SET_SELECTED_GENRES") {
      localStorage.setItem(
        "selectedGenres",
        JSON.stringify(getState().selectedGenres)
      );
    }
    return result;
  };
};
