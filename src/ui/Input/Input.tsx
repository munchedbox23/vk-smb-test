import { Input as MuiInput, InputProps } from "@mui/base/Input";
import { FC } from "react";
import styles from "./Input.module.css";

const Input: FC<InputProps> = ({ className, ...props }) => {
  return <MuiInput className={`${styles.input} ${className}`} {...props} />;
};

export default Input;
