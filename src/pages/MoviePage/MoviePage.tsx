import { FC, useEffect } from "react";
import { FilterMovieBlock } from "../../components/FilterMovieBlock/FilterMovieBlock";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import {
  moviesLoadingStatus,
  selectMovies,
} from "../../services/features/movies/movieSelectors";
import { MovieList } from "../../components/MovieList/MovieList";
import { Preloader } from "../../ui/Preloader/Preloader";
import { useSearchParams } from "react-router-dom";
import { pageNum } from "../../services/features/movies/movieSelectors";
import Pagination from "@mui/material/Pagination";
import {
  setCurrentPage,
  fetchMoviesWithFilters,
} from "../../services/features/movies/movieSlice";

export const MoviePage: FC = () => {
  const moviesLoading = useAppSelector(moviesLoadingStatus);
  const movies = useAppSelector(selectMovies);
  const totalPages = useAppSelector((store) => store.movies.totalPages);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = useAppSelector(pageNum);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSearchParams({
      ...searchParams,
      page: currentPage.toString(),
      limit: "50",
      notNullFields: "poster.url",
      search: searchParams.get("search") || "",
    });
  }, [currentPage, setSearchParams, searchParams]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    dispatch(setCurrentPage(value));
    dispatch(fetchMoviesWithFilters(value));
  };

  return (
    <>
      <FilterMovieBlock />
      {moviesLoading ? (
        <Preloader />
      ) : (
        <MovieList movies={movies}>
          {
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          }
        </MovieList>
      )}
    </>
  );
};
