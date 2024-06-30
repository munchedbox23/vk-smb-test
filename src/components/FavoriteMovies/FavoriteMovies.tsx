import { FC, useEffect, useState } from "react";
import { MovieList } from "../MovieList/MovieList";
import { IMovie, IMovieWithUser } from "../../types/movie-types";
import { useAppSelector } from "../../services/store/hooks";

export const FavoriteMovies: FC = () => {
  const user = useAppSelector((store) => store.user.user);
  const [favorites, setFavorites] = useState<IMovie[]>([]);

  useEffect(() => {
    if (user) {
      const storedFavourites = JSON.parse(
        localStorage.getItem("favourites") || "[]"
      );
      const userFavorites = storedFavourites
        .filter((fav: IMovieWithUser) => fav.user === user.email)
        .map((fav: IMovieWithUser) => {
          const { user, ...movie } = fav;
          return movie;
        });
      setFavorites(userFavorites);
    }
  }, [user]);

  return <MovieList movies={favorites}></MovieList>;
};
