import { IMovie, IMovieWithUser } from "./../types/movie-types";
import { useEffect, useState, useCallback } from "react";
import { useAppSelector } from "../services/store/hooks";
import { useNavigate } from "react-router";
import { ROUTE } from "../utils/constants";

const getStoredFavourites = () => {
  return JSON.parse(localStorage.getItem("favourites") || "[]");
};

const setStoredFavourites = (favourites: IMovieWithUser[]) => {
  localStorage.setItem("favourites", JSON.stringify(favourites));
};

export const useFavoriteMovie = (movie: IMovie | null) => {
  const user = useAppSelector((store) => store.user.user);
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (movie && user) {
      const storedFavourites = getStoredFavourites();
      setIsFavorite(
        storedFavourites.some(
          (fav: IMovieWithUser) =>
            fav.id === movie.id && fav.user === user.email
        )
      );
    }
  }, [movie, user]);

  const toggleFavorite = useCallback(() => {
    if (!user) {
      navigate(`/${ROUTE.mainLayout.login}`);
      return;
    }

    if (movie && user) {
      const storedFavourites = getStoredFavourites();
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

      setStoredFavourites(storedFavourites);
    }
  }, [movie, user, navigate]);

  return { isFavorite, toggleFavorite };
};
