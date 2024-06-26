import { FC } from "react";
import { ROUTE } from "../../../utils/constants";
import styles from "./AuthLinks.module.css";
import { Link } from "react-router-dom";

export const LoginLinks: FC = (): JSX.Element => {
  return (
    <main className={styles.links}>
      <div className={styles.linkContent}>
        <span className={styles.linkQuestion}>Вы - новый пользователь?</span>
        <Link className={styles.link} to={`/${ROUTE.mainLayout.register}`}>
          Зарегистрироваться
        </Link>
      </div>
      <div className={styles.linkContent}>
        <span className={styles.linkQuestion}>Забыли пароль?</span>
        <Link className={styles.link} to={`/${ROUTE.mainLayout.forgotPass}`}>
          Восстановить пароль
        </Link>
      </div>
    </main>
  );
};

export const RegisterLinks: FC = (): JSX.Element => {
  return (
    <main className={styles.links}>
      <div className={styles.linkContent}>
        <span className={styles.linkQuestion}>Уже зарегистрированы?</span>
        <Link className={styles.link} to={`/${ROUTE.mainLayout.login}`}>
          Войти
        </Link>
      </div>
    </main>
  );
};

export const ForgotLinks: FC = (): JSX.Element => {
  return (
    <main className={styles.links}>
      <div className={styles.linkContent}>
        <span className={styles.linkQuestion}>Вспомнили пароль?</span>
        <Link className={styles.link} to={`/${ROUTE.mainLayout.login}`}>
          Войти
        </Link>
      </div>
    </main>
  );
};
