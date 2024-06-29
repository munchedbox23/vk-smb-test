import styles from "./Movie.module.css";
import { useAppSelector } from "../../services/store/hooks";
import { selectedMovie } from "../../services/features/movies/movieSelectors";
import { FC } from "react";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { PrimaryButton } from "../../ui/PrimaryButton/PrimaryButton";
import { IGenre, IRating } from "../../types/movie-types";
import CheckIcon from "@mui/icons-material/Check";

export const Movie: FC = () => {
  const currentMovie = useAppSelector(selectedMovie);

  const movieDetails: {
    id: number;
    rowName: string;
    rowValue: IRating | IGenre[] | number;
  }[] = [
    {
      id: 1,
      rowName: "Рейтинг:",
      rowValue: currentMovie?.rating.imdb ?? currentMovie?.rating.kp ?? 0,
    },
    {
      id: 2,
      rowName: "Год выпуска:",
      rowValue: currentMovie?.year ?? 0,
    },
    {
      id: 3,
      rowName: "Жанр:",
      rowValue: currentMovie?.genres ?? [],
    },
  ];

  return (
    <article className={styles.moviePage}>
      <div className={styles.imageContainer}>
        <img
          className={styles.moviePoster}
          src={currentMovie?.poster.url}
          alt="Постер выбранного фильма"
        />
      </div>
      <section className={styles.movieInfo}>
        <h1>{currentMovie?.name ?? currentMovie?.alternativeName}</h1>
        <PrimaryButton buttonType="button">
          <BookmarksIcon />В избранное
        </PrimaryButton>
        <p className={styles.movieDescription}>{currentMovie?.description}</p>
        <div className={styles.details}>
          {movieDetails.map((item) => (
            <div key={item.id} className={styles.detailWrapper}>
              <h5>{item.rowName}</h5>
              {item.rowValue instanceof Array ? (
                <ul className={styles.genreArray}>
                  {item.rowValue.map((genre, index) => (
                    <li className={styles.genre} key={index}>
                      {genre.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{item.rowValue.toString()}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};
