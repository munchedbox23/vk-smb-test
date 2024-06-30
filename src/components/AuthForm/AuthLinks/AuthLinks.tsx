import { FC } from "react";
import { ROUTE } from "../../../utils/constants";
import styles from "./AuthLinks.module.css";
import { Link } from "react-router-dom";

type AuthLinkProps = {
  question: string;
  linkText: string;
  route: string;
};

const AuthLink: FC<AuthLinkProps> = ({ question, linkText, route }) => {
  return (
    <div className={styles.linkContent}>
      <span className={styles.linkQuestion}>{question}</span>
      <Link className={styles.link} to={`/${route}`}>
        {linkText}
      </Link>
    </div>
  );
};

export const LoginLinks: FC = () => {
  return (
    <main className={styles.links}>
      <AuthLink
        question="Вы - новый пользователь?"
        linkText="Зарегистрироваться"
        route={ROUTE.mainLayout.register}
      />
      <AuthLink
        question="Забыли пароль?"
        linkText="Восстановить пароль"
        route={ROUTE.mainLayout.forgotPass}
      />
    </main>
  );
};

export const RegisterLinks: FC = () => {
  return (
    <main className={styles.links}>
      <AuthLink
        question="Уже зарегистрированы?"
        linkText="Войти"
        route={ROUTE.mainLayout.login}
      />
    </main>
  );
};

export const ForgotLinks: FC = () => {
  return (
    <main className={styles.links}>
      <AuthLink
        question="Вспомнили пароль?"
        linkText="Войти"
        route={ROUTE.mainLayout.login}
      />
    </main>
  );
};
