import { FC } from "react";
import styles from "./HeaderLink.module.css";
import { NavLink } from "react-router-dom";

type THeaderLinkProps = {
  route: string;
  textLink: string;
};

export const HeaderLink: FC<THeaderLinkProps> = ({ route, textLink }) => {
  return (
    <NavLink
      to={route}
      className={({ isActive }) =>
        `${styles.navLink} ${isActive && styles.primary}`
      }
    >
      {textLink}
    </NavLink>
  );
};
