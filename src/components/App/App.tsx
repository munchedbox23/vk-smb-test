import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
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
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(pageNum);

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(fetchMoviesWithFilters(currentPage));
  }, [dispatch, currentPage]);

  const router = createBrowserRouter([
    {
      path: ROUTE.home,
      element: <MainLayout />,
      children: [
        { index: true, element: <Navigate to={ROUTE.mainLayout.movie} /> },
        {
          path: ROUTE.mainLayout.login,
          element: <OnlyUnAuth component={<LoginPage />} />,
        },
        { path: ROUTE.mainLayout.movie, element: <MoviePage /> },
        {
          path: ROUTE.mainLayout.register,
          element: <OnlyUnAuth component={<RegisterPage />} />,
        },
        { path: ROUTE.mainLayout.currentMovie, element: <Movie /> },
        {
          path: ROUTE.mainLayout.profile,
          element: <OnlyAuth component={<ProfilePage />} />,
          children: [
            { index: true, element: <OnlyAuth component={<ProfileInfo />} /> },
            {
              path: ROUTE.mainLayout.favouritesMovies,
              element: <OnlyAuth component={<FavoriteMovies />} />,
            },
          ],
        },
        {
          path: ROUTE.mainLayout.forgotPass,
          element: <OnlyUnAuth component={<ForgotPasswordPage />} />,
        },
        {
          path: ROUTE.mainLayout.resetPass,
          element: <OnlyUnAuth component={<ResetPasswordPage />} />,
        },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
