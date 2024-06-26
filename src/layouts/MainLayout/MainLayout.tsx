import { FC } from "react";
import { Outlet } from "react-router";
import { AppHeader } from "../../components/AppHeader/AppHeader";

export const MainLayout: FC = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
};
