import { useAppDispatch } from "../../services/store/hooks";
import { Routes, Route, useLocation } from "react-router";
import { MainLayout } from "../../layouts/MainLayout/MainLayout";
import { FC } from "react";
import { ROUTE } from "../../utils/contstants";

const App: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  return (
    <Routes key={location?.pathname} location={location}>
      <Route path={ROUTE.home} element={<MainLayout />}></Route>
    </Routes>
  );
};

export default App;
