import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../../../utils/requests";
import { API } from "../../../utils/constants";
import { IMovie, IMoviesResponse } from "../../../types/movie-types";

const API_KEY = "FGJZTT0-J0K49NN-Q2RPKZ0-9SCNVMM";

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

const buildApiUrl = (page: number, filters: TMovieSliceState["filters"]) => {
  const genreParams = filters.genres
    .map((genre) => `&genres.name=${genre}`)
    .join("");
  const yearParams = filters.years.map((year) => `&year=${year}`).join("");
  const ratingParam =
    filters.rating[0] !== 0 || filters.rating[1] !== 10
      ? `&rating.imdb=${filters.rating[0]}-${filters.rating[1]}`
      : "";

  return `${API.moviesBaseUrl}?page=${page}&limit=50&notNullFields=poster.url${genreParams}${yearParams}${ratingParam}`;
};

export const fetchMoviesWithFilters = createAsyncThunk<
  IMoviesResponse<IMovie>,
  number
>("movies/fetchMoviesWithFilters", async (page, { getState }) => {
  const state = getState() as { movies: TMovieSliceState };
  const apiUrl = buildApiUrl(page, state.movies.filters);

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
    filteredMoviesByName: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      state.movies = state.filteredMovies.filter((movie) => {
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
    const handlePending = (state: TMovieSliceState) => {
      state.getMoviesRequestFailed = false;
      state.getMoviesRequestLoading = true;
    };

    const handleFulfilled = (
      state: TMovieSliceState,
      action: PayloadAction<IMoviesResponse<IMovie>>
    ) => {
      state.getMoviesRequestLoading = false;
      state.movies = action.payload.docs;
      state.totalPages = action.payload.pages;
      state.filteredMovies = action.payload.docs;
      state.currentPage = action.payload.page;
    };

    const handleRejected = (state: TMovieSliceState) => {
      state.getMoviesRequestLoading = false;
      state.getMoviesRequestFailed = true;
    };

    builder
      .addCase(fetchMoviesWithFilters.pending, handlePending)
      .addCase(fetchMoviesWithFilters.fulfilled, handleFulfilled)
      .addCase(fetchMoviesWithFilters.rejected, handleRejected);
  },
});

export const {
  setCurrentPage,
  filteredMoviesByName,
  setSelectedMovie,
  setFilters,
} = movieSlice.actions;
export default movieSlice.reducer;
