import { FC, FormEvent, PropsWithChildren } from "react";
import styles from "./AuthForm.module.css";

type TFormProps = {
  title: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  // linkComponent: React.ElementType;
  buttonText: string;
};

export const AuthForm: FC<PropsWithChildren<TFormProps>> = ({
  children,
  onSubmit,
  title,
  buttonText,
}) => {
  return (
    <div className={styles.formWrapper}>
      <form onSubmit={onSubmit} autoComplete="off" className={styles.form}>
        <h2 className={styles.formHeading}>{title}</h2>
        {children}
        <button className={styles.formButton} type="submit">
          {buttonText}
        </button>
      </form>
    </div>
  );
};
