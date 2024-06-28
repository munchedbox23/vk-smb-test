import { FC, useEffect } from "react";
import { FilterMovieBlock } from "../../components/FilterMovieBlock/FilterMovieBlock";
import { useAppSelector } from "../../services/store/hooks";
import { moviesLoadingStatus } from "../../services/features/movies/movieSelectors";
import { MovieList } from "../../components/MovieList/MovieList";
import { Preloader } from "../../ui/Preloader/Preloader";
import { useSearchParams } from "react-router-dom";
import { pageNum } from "../../services/features/movies/movieSelectors";

export const MoviePage: FC = () => {
  const moviesLoading = useAppSelector(moviesLoadingStatus);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = useAppSelector(pageNum);

  useEffect(() => {
    setSearchParams({
      ...searchParams,
      page: currentPage.toString(),
      limit: "50",
      notNullFields: "poster.url",
      search: searchParams.get("search") || "",
    });
  }, [currentPage, setSearchParams, searchParams]);

  return (
    <>
      <FilterMovieBlock />
      {moviesLoading ? <Preloader /> : <MovieList />}
    </>
  );
};
