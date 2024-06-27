import styles from "./Avatar.module.css";
import { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { ROUTE } from "../../utils/constants";
import { useAppSelector } from "../../services/store/hooks";

export const Avatar: FC<PropsWithChildren> = ({ children }) => {
  const user = useAppSelector((store) => store.user.user);

  return (
    <div className={styles.account}>
      <Link to={`/${ROUTE.mainLayout.profile}`} className={styles.accountLink}>
        <span className={styles.accountName}>{user?.name ?? "Войти"}</span>
        <div className={styles.profileAvatar}></div>
      </Link>
      {children}
    </div>
  );
};
