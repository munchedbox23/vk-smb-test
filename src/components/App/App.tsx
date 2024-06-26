import { useAppDispatch } from "../../services/store/hooks";
import { Routes, Route, useLocation } from "react-router";
import { MainLayout } from "../../layouts/MainLayout/MainLayout";
import { FC } from "react";
import { ROUTE } from "../../utils/contstants";
import { NotFound } from "../../pages";

const App: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  return (
    <Routes key={location?.pathname} location={location}>
      <Route path={ROUTE.home} element={<MainLayout />}></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
