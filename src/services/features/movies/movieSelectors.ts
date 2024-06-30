import { IMovie } from "../../../types/movie-types";
import { RootState } from "../../store/store";

export const moviesLoadingStatus = (state: RootState) =>
  state.movies.getMoviesRequestLoading;
export const pageNum = (state: RootState) => state.movies.currentPage;
export const selectMovies = (state: RootState) => state.movies.movies;
export const selectMovieById = (state: RootState, movieId: string) => {
  return state.movies.movies.find((movie: IMovie) => movie.id === +movieId);
};
export const selectedMovie = (state: RootState) => state.movies.selectedMovie;
