import { FC, PropsWithChildren } from "react";
import movieStyles from "./MovieList.module.css";
import { MovieCard } from "../MovieCard/MovieCard";
import { IMovie } from "../../types/movie-types";

export const MovieList: FC<PropsWithChildren<{ movies: IMovie[] }>> = ({
  children,
  movies,
}) => {
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
          К сожалению, сервис не смог найти ни одного фильма по вашему запросу
        </strong>
      )}
      {children}
    </article>
  );
};
