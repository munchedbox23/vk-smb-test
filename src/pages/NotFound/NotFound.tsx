import { FC } from "react";
import { ROUTE } from "../../utils/constants";
import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

export const NotFound: FC = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.noise}></div>
      <div className={styles.overlay}></div>
      <div className={styles.terminal}>
        <h1>
          Error <span className={styles.errorCode}>404</span>
        </h1>
        <p className={styles.errorOutput}>
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
        <p className={styles.errorOutput}>
          Please try to
          <Link to={ROUTE.home} className={styles.link}>
            go home
          </Link>
        </p>
        <p className={styles.errorOutput}>Good luck.</p>
      </div>
    </div>
  );
};
