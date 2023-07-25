import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  movies: [],
  genres: [],
  selectedGenres: [],
  status: "idle",
};

export const fetchMovies = createAsyncThunk("movie/fetchMovies", async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/popular?api_key=595b5cc770e3f26833fa3ec44e699a1e"
  );
  return response.data.results;
});

export const fetchGenres = createAsyncThunk("movie/fetchGenres", async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=595b5cc770e3f26833fa3ec44e699a1e"
  );
  return response.data.genres;
});

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    selectGenre(state, action) {
      state.selectedGenres.push(action.payload);
    },
    deselectGenre(state, action) {
      state.selectedGenres = state.selectedGenres.filter(
        (genre) => genre !== action.payload
      );
    },
    setSelectedGenres(state, action) {
      state.selectedGenres = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
      });
  },
});

export const { selectGenre, deselectGenre, setSelectedGenres } =
  movieSlice.actions;

export default movieSlice.reducer;
