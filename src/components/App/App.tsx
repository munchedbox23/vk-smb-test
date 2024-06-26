import { useAppDispatch } from "../../services/store/hooks";
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
} from "../../pages";
import { checkUserAuth } from "../../services/features/user/auth";

const App: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <Routes key={location?.pathname} location={location}>
      <Route path={ROUTE.home} element={<MainLayout />}>
        <Route path={ROUTE.mainLayout.login} element={<LoginPage />} />
        <Route path={ROUTE.mainLayout.register} element={<RegisterPage />} />
        <Route path={ROUTE.mainLayout.profile} element={<ProfilePage />} />
        <Route
          path={ROUTE.mainLayout.forgotPass}
          element={<ForgotPasswordPage />}
        />
        <Route
          path={ROUTE.mainLayout.resetPass}
          element={<ResetPasswordPage />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
