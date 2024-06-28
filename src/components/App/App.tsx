import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { Routes, Route, useLocation } from "react-router";
import { MainLayout } from "../../layouts/MainLayout/MainLayout";
import { FC, useEffect } from "react";
import { ROUTE } from "../../utils/constants";
import {
  NotFound,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  MoviePage,
} from "../../pages";
import { checkUserAuth } from "../../services/features/user/auth";
import { OnlyAuth, OnlyUnAuth } from "../WithProtectedRoute/WithProtectedRoute";
import { ProfileInfo } from "../Profile/ProfileInfo/ProfileInfo";
import { fetchMovies } from "../../services/features/movies/movieSlice";
import { pageNum } from "../../services/features/movies/movieSelectors";
import { Movie } from "../Movie/Movie";

const App: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(pageNum);

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(fetchMovies(currentPage));
  }, [dispatch, currentPage]);

  return (
    <Routes key={location?.pathname} location={location}>
      <Route path={ROUTE.home} element={<MainLayout />}>
        <Route
          path={ROUTE.mainLayout.login}
          element={<OnlyUnAuth component={<LoginPage />} />}
        />
        <Route path={ROUTE.mainLayout.movie} element={<MoviePage />} />
        <Route
          path={ROUTE.mainLayout.register}
          element={<OnlyUnAuth component={<RegisterPage />} />}
        />
        <Route path={ROUTE.mainLayout.currentMovie} element={<Movie />} />
        <Route
          path={ROUTE.mainLayout.profile}
          element={<OnlyAuth component={<ProfilePage />} />}
        >
          <Route index element={<OnlyAuth component={<ProfileInfo />} />} />
        </Route>
        <Route
          path={ROUTE.mainLayout.forgotPass}
          element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
        />
        <Route
          path={ROUTE.mainLayout.resetPass}
          element={<OnlyUnAuth component={<ResetPasswordPage />} />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
