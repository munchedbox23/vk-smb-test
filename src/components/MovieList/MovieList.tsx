import { FC } from "react";
import movieStyles from "./MovieList.module.css";
import Pagination from "@mui/material/Pagination";
import { MovieCard } from "../MovieCard/MovieCard";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import {
  pageNum,
  selectMovies,
} from "../../services/features/movies/movieSelectors";
import { setCurrentPage } from "../../services/features/movies/movieSlice";
import { fetchMoviesWithFilters } from "../../services/features/movies/movieSlice";

export const MovieList: FC = () => {
  const movies = useAppSelector(selectMovies);
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(pageNum);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    dispatch(setCurrentPage(value));
    dispatch(fetchMoviesWithFilters(value));
  };

  return (
    <article className={movieStyles.movies}>
      {movies.length ? (
        <ul className={movieStyles.movieList}>
          {movies.map((item) => (
            <MovieCard key={item.id} data={item} />
          ))}
        </ul>
      ) : (
        <strong className={movieStyles.sorryMessage}>
          К сожаление, сервис не смог найти ни одного фильма по вашему запросу
        </strong>
      )}
      <Pagination count={2000} page={currentPage} onChange={handlePageChange} />
    </article>
  );
};
