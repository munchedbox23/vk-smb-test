import { FC, FormEvent, PropsWithChildren } from "react";
import styles from "./AuthForm.module.css";
import Logo from "../../assets/images/logo.svg";

type TFormProps = {
  title: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  linkComponent: React.ElementType;
  buttonText: string;
};

export const AuthForm: FC<PropsWithChildren<TFormProps>> = ({
  children,
  onSubmit,
  title,
  buttonText,
  linkComponent: Links,
}) => {
  return (
    <section className={styles.formContent}>
      <div className={styles.formWrapper}>
        <form onSubmit={onSubmit} autoComplete="off" className={styles.form}>
          <img src={Logo} alt="Логотип" className={styles.formLogo} />
          <h2 className={styles.formHeading}>{title}</h2>
          {children}
          <button className={styles.formButton} type="submit">
            {buttonText}
          </button>
        </form>
        {Links && <Links />}
      </div>
    </section>
  );
};
