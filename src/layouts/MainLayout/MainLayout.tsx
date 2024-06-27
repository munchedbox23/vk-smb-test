import { FC } from "react";
import { Outlet } from "react-router";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import styles from "./MainLayout.module.css";
import { useAppSelector } from "../../services/store/hooks";
import { Preloader } from "../../ui/Preloader/Preloader";

export const MainLayout: FC = () => {
  const isRequestLoading = useAppSelector(
    (store) => store.user.isRequestLoading
  );

  return (
    <>
      <AppHeader />
      {isRequestLoading ? (
        <Preloader />
      ) : (
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      )}
    </>
  );
};
