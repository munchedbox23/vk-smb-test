import { FC, FormEvent, useState } from "react";
import styles from "./FilterMovieBlock.module.css";
import CustomSelect from "../../ui/CustomSelect/CustomSelect";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import { PrimaryButton } from "../../ui/PrimaryButton/PrimaryButton";
import { Genre } from "../../utils/genres";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { fetchMoviesWithFilters } from "../../services/features/movies/movieSlice";
import { pageNum } from "../../services/features/movies/movieSelectors";

export const FilterMovieBlock: FC = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(pageNum);
  const options = Object.values(Genre);
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1990 + 1 },
    (_, i) => 1990 + i
  );

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number[]>([0, 10]);

  const handleGenreChange = (value: string[]) => {
    setSelectedGenres(value);
  };

  const handleYearChange = (value: string[]) => {
    setSelectedYears(value);
  };

  const handleRatingChange = (event: Event, newValue: number | number[]) => {
    setSelectedRating(newValue as number[]);
  };

  const handleApplyFilters = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      fetchMoviesWithFilters({
        page: currentPage,
        genres: selectedGenres,
        years: selectedYears,
        rating: selectedRating,
      })
    );
  };

  return (
    <aside className={styles.filterBlock}>
      <form onSubmit={handleApplyFilters} className={styles.filterForm}>
        <CustomSelect
          options={options}
          label="Жанры"
          value={selectedGenres}
          onChange={handleGenreChange}
        />
        <CustomSelect
          options={years}
          label="Годы"
          value={selectedYears}
          onChange={handleYearChange}
        />
        <Box sx={{ width: "100%" }}>
          <InputLabel
            sx={{
              color: "#6d7885",
              fontSize: "14px",
            }}
          >
            Рейтинг
          </InputLabel>
          <Slider
            getAriaLabel={() => "Temperature range"}
            valueLabelDisplay="auto"
            min={0}
            max={10}
            value={selectedRating}
            onChange={handleRatingChange}
          />
        </Box>
        <PrimaryButton buttonType="submit">Применить</PrimaryButton>
      </form>
    </aside>
  );
};
