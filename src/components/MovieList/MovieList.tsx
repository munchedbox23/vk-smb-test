import { FC } from "react";
import movieStyles from "./MovieList.module.css";
import Pagination from "@mui/material/Pagination";
import { MovieCard } from "../MovieCard/MovieCard";
import { useAppSelector } from "../../services/store/hooks";
import { selectMovies } from "../../services/features/movies/movieSelectors";

export const MovieList: FC = () => {
  const movies = useAppSelector(selectMovies);

  return (
    <article className={movieStyles.movies}>
      <ul className={movieStyles.movieList}>
        {movies.map((item) => (
          <MovieCard key={item.id} data={item} />
        ))}
      </ul>
      <Pagination count={10} />
    </article>
  );
};
