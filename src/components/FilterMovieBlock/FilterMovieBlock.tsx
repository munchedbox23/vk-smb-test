import { FC, useState } from "react";
import styles from "./FilterMovieBlock.module.css";
import CustomSelect from "../../ui/CustomSelect/CustomSelect";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import { PrimaryButton } from "../../ui/PrimaryButton/PrimaryButton";

export const FilterMovieBlock: FC = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [value, setValue] = useState<number[]>([0, 10]);
  const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1990 + 1 },
    (_, i) => 1990 + i
  );

  const handleChange = (value: string[]) => {
    console.log(value);
  };

  const handleChange1 = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  return (
    <aside className={styles.filterBlock}>
      <form className={styles.filterForm}>
        <CustomSelect
          options={options}
          label="Жанры"
          onChange={handleChange}
          value={selectedValues}
        />
        <CustomSelect
          options={years}
          label="Годы"
          onChange={handleChange}
          value={selectedValues}
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
            value={value}
            onChange={handleChange1}
            valueLabelDisplay="auto"
            min={0}
            max={10}
          />
        </Box>
        <PrimaryButton buttonType="submit">Применить</PrimaryButton>
      </form>
    </aside>
  );
};
