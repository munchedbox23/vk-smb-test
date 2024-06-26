import styles from "./Avatar.module.css";
import { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";

export const Avatar: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.account}>
      <Link to="/" className={styles.accountLink}>
        <span className={styles.accountName}>Пользователь</span>
        <div className={styles.profileAvatar}></div>
      </Link>
      {children}
    </div>
  );
};
