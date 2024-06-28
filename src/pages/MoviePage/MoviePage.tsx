import { FC } from "react";
import { FilterMovieBlock } from "../../components/FilterMovieBlock/FilterMovieBlock";
import { useAppSelector } from "../../services/store/hooks";
import { moviesLoadingStatus } from "../../services/features/movies/movieSelectors";
import { MovieList } from "../../components/MovieList/MovieList";
import { Preloader } from "../../ui/Preloader/Preloader";

export const MoviePage: FC = () => {
  const moviesLoading = useAppSelector(moviesLoadingStatus);
  return (
    <>
      <FilterMovieBlock />
      {moviesLoading ? <Preloader /> : <MovieList />}
    </>
  );
};
