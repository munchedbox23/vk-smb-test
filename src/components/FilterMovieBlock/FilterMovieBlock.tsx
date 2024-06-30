import { FC, FormEvent } from "react";
import styles from "./FilterMovieBlock.module.css";
import CustomSelect from "../../ui/CustomSelect/CustomSelect";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import { PrimaryButton } from "../../ui/PrimaryButton/PrimaryButton";
import { Genre } from "../../utils/genres";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import {
  fetchMoviesWithFilters,
  setFilters,
} from "../../services/features/movies/movieSlice";
import { pageNum } from "../../services/features/movies/movieSelectors";

export const FilterMovieBlock: FC = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(pageNum);
  const options = Object.values(Genre);
  const currentYear = new Date().getFullYear();
  const optionYears = Array.from(
    { length: currentYear - 1990 + 1 },
    (_, i) => 1990 + i
  );

  const { genres, years, rating } = useAppSelector(
    (state) => state.movies.filters
  );

  const handleFilterChange = (
    filterType: string,
    value: string[] | number[]
  ) => {
    dispatch(setFilters({ ...{ genres, years, rating }, [filterType]: value }));
  };

  const handleApplyFilters = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchMoviesWithFilters(currentPage));
  };

  return (
    <aside className={styles.filterBlock}>
      <form
        data-cy="filter-form"
        onSubmit={handleApplyFilters}
        className={styles.filterForm}
      >
        <CustomSelect
          options={options}
          label="Жанры"
          value={genres}
          onChange={(value) => handleFilterChange("genres", value)}
        />
        <CustomSelect
          options={optionYears}
          label="Годы"
          value={years}
          onChange={(value) => handleFilterChange("years", value)}
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
            value={rating}
            onChange={(event, value) =>
              handleFilterChange("rating", value as number[])
            }
          />
        </Box>
        <PrimaryButton buttonType="submit">Применить</PrimaryButton>
      </form>
    </aside>
  );
};
