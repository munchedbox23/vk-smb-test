import { FC, MouseEvent, useEffect, useState } from "react";
import cardStyles from "./MovieCard.module.css";
import { IMovie, IMovieWithUser } from "../../types/movie-types";
import { useLocation, useNavigate } from "react-router-dom";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { setSelectedMovie } from "../../services/features/movies/movieSlice";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { ROUTE } from "../../utils/constants";

type TMovieCardProps = {
  data: IMovie;
};

export const MovieCard: FC<TMovieCardProps> = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const user = useAppSelector((store) => store.user.user);
  const [favourites, setFavourites] = useState<IMovieWithUser[]>([]);

  useEffect(() => {
    if (user) {
      const storedFavourites = JSON.parse(
        localStorage.getItem("favourites") || "[]"
      );
      const userFavourites = storedFavourites.filter(
        (fav: IMovieWithUser) => fav.user === user.email
      );
      setFavourites(userFavourites);
    }
  }, [user]);

  useEffect(() => {
    const storedFavourites = JSON.parse(
      localStorage.getItem("favourites") || "[]"
    );
    const updatedFavourites = [...storedFavourites];
    favourites.forEach((fav) => {
      const index = updatedFavourites.findIndex(
        (f) => f.id === fav.id && f.user === fav.user
      );
      if (index === -1) {
        updatedFavourites.push(fav);
      } else {
        updatedFavourites[index] = fav;
      }
    });
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  }, [favourites, user]);

  const handleChooseMovie = (): void => {
    navigate(`/movies/${data.id}`, { state: { from: location.pathname } });
    dispatch(setSelectedMovie(data));
  };

  const handleFavoriteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!user) {
      navigate(`/${ROUTE.mainLayout.login}`);
    } else {
      const index = favourites.findIndex((fav) => fav.id === data.id);

      if (index === -1) {
        setFavourites([...favourites, { ...data, user: user.email }]);
      } else {
        setFavourites(favourites.filter((fav) => fav.id !== data.id));
      }
    }
  };

  return (
    <div onClick={handleChooseMovie} className={cardStyles.movieCard}>
      <div className={cardStyles.cardWrapper}>
        <img
          className={cardStyles.cardPoster}
          src={data.poster.previewUrl}
          alt="Постер фильма"
        />
        <button
          className={cardStyles.favoriteBtn}
          onClick={handleFavoriteClick}
        >
          {favourites.some((fav) => fav.id === data.id) ? (
            <FavoriteIcon style={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </button>
        <div className={cardStyles.movieDetails}>
          <span>
            {(data.countries && data.countries[0]?.name) || "Unknown country"},{" "}
            {data.year}
          </span>
          <h5>{data.name ?? data.alternativeName}</h5>
          <p className={cardStyles.rating}>
            <StarHalfIcon style={{ color: "#d7c92c" }} />
            <span>{data.rating.imdb ?? data.rating.kp}/10</span>
          </p>
        </div>
      </div>
    </div>
  );
};
