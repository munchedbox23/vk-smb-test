import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../../../utils/requests";
import { API } from "../../../utils/constants";
import { IMovie, IMoviesResponse } from "../../../types/movie-types";

const API_KEY = "4T6X7R1-FAY4CK5-QEV5B3M-TJBP5QK";

type TMovieSliceState = {
  movies: IMovie[];
  getMoviesRequestFailed: boolean;
  getMoviesRequestLoading: boolean;
  currentPage: number;
};

export const initialState: TMovieSliceState = {
  movies: [],
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
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.getMoviesRequestLoading = false;
        state.getMoviesRequestFailed = true;
      });
  },
});

export const { setCurrentPage } = movieSlice.actions;
export default movieSlice.reducer;
