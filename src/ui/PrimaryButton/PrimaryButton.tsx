import { FC, PropsWithChildren } from "react";
import btnStyles from "./PrimaryButton.module.css";

type TPrimaryButtonProps = {
  buttonType: "submit" | "reset" | "button";
  onClick?: () => void;
};

export const PrimaryButton: FC<PropsWithChildren<TPrimaryButtonProps>> = ({
  children,
  buttonType,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={btnStyles.primaryButton}
      type={buttonType}
    >
      {children}
    </button>
  );
};
