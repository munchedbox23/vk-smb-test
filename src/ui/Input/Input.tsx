import { Input as MuiInput, InputProps } from "@mui/base/Input";
import { FC, useState } from "react";
import styles from "./Input.module.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type TInputProps = InputProps & {
  type: "email" | "text" | "password";
};

const Input: FC<TInputProps> = ({ className, type, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <div className={styles.inputForm}>
      <MuiInput
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        className={`${styles.input} ${className}`}
        {...props}
      />
      {type === "password" && (
        <div className={styles.inputIcon} onClick={handleClickShowPassword}>
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </div>
      )}
    </div>
  );
};

export default Input;
