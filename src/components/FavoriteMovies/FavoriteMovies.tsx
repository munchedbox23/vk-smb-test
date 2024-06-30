import { FC, useMemo } from "react";
import { MovieList } from "../MovieList/MovieList";
import { IMovieWithUser } from "../../types/movie-types";
import { useAppSelector } from "../../services/store/hooks";

export const FavoriteMovies: FC = () => {
  const user = useAppSelector((store) => store.user.user);

  const favorites = useMemo(() => {
    if (!user) return [];

    const storedFavourites = JSON.parse(
      localStorage.getItem("favourites") || "[]"
    );

    return storedFavourites
      .filter((fav: IMovieWithUser) => fav.user === user.email)
      .map((fav: IMovieWithUser) => {
        const { user, ...movie } = fav;
        return movie;
      });
  }, [user]);

  return <MovieList movies={favorites} />;
};
