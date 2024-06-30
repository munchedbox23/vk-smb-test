import { IMovie, IMovieWithUser } from "./../types/movie-types";
import { useEffect, useState } from "react";
import { useAppSelector } from "../services/store/hooks";
import { useNavigate } from "react-router";
import { ROUTE } from "../utils/constants";

export const useFavouriteMovie = (movie: IMovie | null) => {
  const user = useAppSelector((store) => store.user.user);
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (movie && user) {
      const storedFavourites = JSON.parse(
        localStorage.getItem("favourites") || "[]"
      );
      setIsFavorite(
        storedFavourites.some(
          (fav: IMovieWithUser) =>
            fav.id === movie.id && fav.user === user.email
        )
      );
    }
  }, [movie, user]);

  const toggleFavorite = () => {
    if (!user) {
      navigate(`/${ROUTE.mainLayout.login}`);
    }

    if (movie && user) {
      const storedFavourites = JSON.parse(
        localStorage.getItem("favourites") || "[]"
      );
      const index = storedFavourites.findIndex(
        (fav: IMovieWithUser) => fav.id === movie.id && fav.user === user.email
      );

      if (index === -1) {
        storedFavourites.push({ ...movie, user: user.email });
        setIsFavorite(true);
      } else {
        storedFavourites.splice(index, 1);
        setIsFavorite(false);
      }

      localStorage.setItem("favourites", JSON.stringify(storedFavourites));
    }
  };

  return { isFavorite, toggleFavorite };
};
