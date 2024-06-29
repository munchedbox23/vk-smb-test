import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../../../utils/requests";
import { API } from "../../../utils/constants";
import { IMovie, IMoviesResponse } from "../../../types/movie-types";

const API_KEY = "J5TFEXC-RDAM6A8-HKNPQGV-M7PSC7C";

type TMovieSliceState = {
  movies: IMovie[];
  filteredMovies: IMovie[];
  getMoviesRequestFailed: boolean;
  getMoviesRequestLoading: boolean;
  currentPage: number;
  selectedMovie: IMovie | null;
};

export const initialState: TMovieSliceState = {
  movies: [],
  filteredMovies: [],
  getMoviesRequestLoading: false,
  getMoviesRequestFailed: false,
  currentPage: 1,
  selectedMovie: null,
};

export const fetchMoviesWithFilters = createAsyncThunk<
  IMoviesResponse<IMovie>,
  {
    page: number;
    genres: string[];
    years: string[];
    rating: number[];
  }
>("movies/fetchMoviesWithFilters", async ({ page, genres, years, rating }) => {
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
    setSelectedMovie: (state, action: PayloadAction<IMovie>) => {
      state.selectedMovie = action.payload;
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
      })
      .addCase(fetchMoviesWithFilters.pending, (state) => {
        state.getMoviesRequestFailed = false;
        state.getMoviesRequestLoading = true;
      })
      .addCase(fetchMoviesWithFilters.fulfilled, (state, action) => {
        state.getMoviesRequestLoading = false;
        state.movies = action.payload.docs;
        state.filteredMovies = action.payload.docs;
        state.currentPage = action.payload.page;
      })
      .addCase(fetchMoviesWithFilters.rejected, (state) => {
        state.getMoviesRequestLoading = false;
        state.getMoviesRequestFailed = true;
      });
  },
});

export const { setCurrentPage, filteredMoviesByName, setSelectedMovie } =
  movieSlice.actions;
export default movieSlice.reducer;
