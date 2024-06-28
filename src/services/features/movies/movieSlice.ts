import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../../../utils/requests";
import { API } from "../../../utils/constants";
import { IMovie, IMoviesResponse } from "../../../types/movie-types";

const API_KEY = "5SHN074-JG5445K-K6A85RX-HDTQFE1";

type TMovieSliceState = {
  movies: IMovie[];
  filteredMovies: IMovie[];
  getMoviesRequestFailed: boolean;
  getMoviesRequestLoading: boolean;
  currentPage: number;
};

export const initialState: TMovieSliceState = {
  movies: [],
  filteredMovies: [],
  getMoviesRequestLoading: false,
  getMoviesRequestFailed: false,
  currentPage: 1,
};

export const fetchMovies = createAsyncThunk<IMoviesResponse<IMovie>, number>(
  "movies/fetchMovies",
  async (page) => {
    const response = await request<IMoviesResponse<IMovie>>(
      `${API.moviesBaseUrl}?page=${page}&limit=50&notNullFields=poster.url`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "X-API-KEY": API_KEY,
        },
      }
    );
    return response;
  }
);

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    //Фильтрация фильмов на стороне клиента 
    filteredMoviesByName: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      state.movies = [...state.filteredMovies].filter((movie) => {
        return (
          (movie.name && movie.name.toLowerCase().includes(searchTerm)) ||
          (movie.alternativeName &&
            movie.alternativeName.toLowerCase().includes(searchTerm))
        );
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.getMoviesRequestFailed = false;
        state.getMoviesRequestLoading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.getMoviesRequestLoading = false;
        state.movies = action.payload.docs;
        state.filteredMovies = action.payload.docs;
        state.currentPage = action.payload.page;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.getMoviesRequestLoading = false;
        state.getMoviesRequestFailed = true;
      });
  },
});

export const { setCurrentPage, filteredMoviesByName } = movieSlice.actions;
export default movieSlice.reducer;
