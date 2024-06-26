import styles from "./Avatar.module.css";
import { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { ROUTE } from "../../utils/constants";

export const Avatar: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.account}>
      <Link to={`/${ROUTE.mainLayout.login}`} className={styles.accountLink}>
        <span className={styles.accountName}>Войти</span>
        <div className={styles.profileAvatar}></div>
      </Link>
      {children}
    </div>
  );
};
