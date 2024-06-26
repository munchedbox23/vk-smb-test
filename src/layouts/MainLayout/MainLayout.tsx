import { FC } from "react";
import { Outlet } from "react-router";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import styles from "./MainLayout.module.css";

export const MainLayout: FC = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </>
  );
};
