import { FC } from "react";
import cardStyles from "./MovieCard.module.css";
import { IMovie } from "../../types/movie-types";
import { useNavigate } from "react-router-dom";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { setSelectedMovie } from "../../services/features/movies/movieSlice";
import { useAppDispatch } from "../../services/store/hooks";

type TMovieCardProps = {
  data: IMovie;
};

export const MovieCard: FC<TMovieCardProps> = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChooseMovie = (): void => {
    navigate(`/movies/${data.id}`);
    dispatch(setSelectedMovie(data));
  };

  return (
    <div onClick={handleChooseMovie} className={cardStyles.movieCard}>
      <div className={cardStyles.cardWrapper}>
        <img
          className={cardStyles.cardPoster}
          src={data.poster.previewUrl}
          alt="Постер фильма"
        />
        <button className={cardStyles.favoriteBtn}>
          <FavoriteBorderIcon />
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
