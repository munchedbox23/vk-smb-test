import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../../../utils/requests";
import { API } from "../../../utils/constants";
import { IMovie, IMoviesResponse } from "../../../types/movie-types";

const API_KEY = "4T6X7R1-FAY4CK5-QEV5B3M-TJBP5QK";

type TMovieSliceState = {
  movies: IMovie[];
  filteredMovies: IMovie[];
  getMoviesRequestFailed: boolean;
  getMoviesRequestLoading: boolean;
  currentPage: number;
  totalPages: number;
  selectedMovie: IMovie | null;
  filters: {
    genres: string[];
    years: string[];
    rating: number[];
  };
};

export const initialState: TMovieSliceState = {
  movies: [],
  filteredMovies: [],
  getMoviesRequestLoading: false,
  getMoviesRequestFailed: false,
  currentPage: 1,
  totalPages: 1,
  selectedMovie: null,
  filters: {
    genres: [],
    years: [],
    rating: [0, 10],
  },
};

export const fetchMoviesWithFilters = createAsyncThunk<
  IMoviesResponse<IMovie>,
  number
>("movies/fetchMoviesWithFilters", async (page, { getState }) => {
  const state = getState() as { movies: TMovieSliceState };
  const { genres, years, rating } = state.movies.filters;

  let apiUrl = `${API.moviesBaseUrl}?page=${page}&limit=50&notNullFields=poster.url`;

  if (genres.length > 0) {
    genres.forEach((genre) => {
      apiUrl += `&genres.name=${genre}`;
    });
  }

  if (years.length > 0) {
    years.forEach((year) => {
      apiUrl += `&year=${year}`;
    });
  }

  if (rating[0] !== 0 || rating[1] !== 10) {
    apiUrl += `&rating.imdb=${rating[0]}-${rating[1]}`;
  }

  const response = await request<IMoviesResponse<IMovie>>(apiUrl, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });

  return response;
});

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
    setSelectedMovie: (state, action: PayloadAction<IMovie>) => {
      state.selectedMovie = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<{
        genres: string[];
        years: string[];
        rating: number[];
      }>
    ) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesWithFilters.pending, (state) => {
        state.getMoviesRequestFailed = false;
        state.getMoviesRequestLoading = true;
      })
      .addCase(fetchMoviesWithFilters.fulfilled, (state, action) => {
        state.getMoviesRequestLoading = false;
        state.movies = action.payload.docs;
        state.totalPages = action.payload.pages;
        state.filteredMovies = action.payload.docs;
        state.currentPage = action.payload.page;
      })
      .addCase(fetchMoviesWithFilters.rejected, (state) => {
        state.getMoviesRequestLoading = false;
        state.getMoviesRequestFailed = true;
      });
  },
});

export const {
  setCurrentPage,
  filteredMoviesByName,
  setSelectedMovie,
  setFilters,
} = movieSlice.actions;
export default movieSlice.reducer;
