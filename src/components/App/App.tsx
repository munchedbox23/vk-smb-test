import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { Routes, Route, useLocation, Navigate } from "react-router";
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
import { fetchMoviesWithFilters } from "../../services/features/movies/movieSlice";
import { pageNum } from "../../services/features/movies/movieSelectors";
import { Movie } from "../Movie/Movie";
import { FavoriteMovies } from "../FavoriteMovies/FavoriteMovies";

const App: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(pageNum);

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(fetchMoviesWithFilters(currentPage));
  }, [dispatch, currentPage]);

  return (
    <Routes key={location?.pathname} location={location}>
      <Route path={ROUTE.home} element={<MainLayout />}>
        <Route index element={<Navigate to={ROUTE.mainLayout.movie} />} />
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
          <Route
            path={ROUTE.mainLayout.favouritesMovies}
            element={<OnlyAuth component={<FavoriteMovies />} />}
          />
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
