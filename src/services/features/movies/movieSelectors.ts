import { RootState } from "../../store/store"

export const moviesLoadingStatus = (state: RootState) => state.movies.getMoviesRequestLoading;
export const pageNum = (state: RootState) => state.movies.currentPage;
export const selectMovies = (state: RootState) => state.movies.movies;
