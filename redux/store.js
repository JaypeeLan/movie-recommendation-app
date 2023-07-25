import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import { localStorageMiddleware } from "./localStorageMiddleware";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
