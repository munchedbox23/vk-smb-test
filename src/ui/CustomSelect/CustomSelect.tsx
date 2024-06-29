import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface CustomSelectProps {
  options: (string | number)[];
  label: string;
  onChange: (value: string[]) => void;
  value: string[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  label,
  onChange,
  value,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const ITEM_HEIGHT = 28;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const {
      target: { value },
    } = event;
    onChange(typeof value === "string" ? value.split(",") : value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <FormControl sx={{ width: "100%", height: "36px" }}>
      <InputLabel
        id="custom-select-label"
        shrink={value.length > 0 || isFocused}
        sx={{
          transform:
            isFocused || value.length > 0
              ? "translate(14px, -9px) scale(0.75)"
              : "translate(14px, 6px) scale(1)",
          transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId="custom-select-label"
        id="custom-select"
        multiple
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
        sx={{ height: 36, backgroundColor: "var(--steel-gray---40)" }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
