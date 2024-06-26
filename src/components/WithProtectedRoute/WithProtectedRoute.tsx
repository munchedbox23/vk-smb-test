import { FC, ReactElement } from "react";
import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../../services/store/hooks";
import { shallowEqual } from "react-redux";
import { ROUTE } from "../../utils/constants";

type TWithProtectedRouteProps = {
  component: ReactElement;
  onlyUnAuth?: boolean;
};

export const WithProtectedRoute: FC<TWithProtectedRouteProps> = ({
  onlyUnAuth = false,
  component,
}) => {
  const { user, isAuthChecked } = useAppSelector(
    (store) => ({
      user: store.user.user,
      isAuthChecked: store.user.isAuthChecked,
    }),
    shallowEqual
  );
  const location = useLocation();

  if (!isAuthChecked) return null;

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: ROUTE.home } };
    return <Navigate to={from} replace />;
  }

  if (!user && !onlyUnAuth) {
    return <Navigate to={ROUTE.mainLayout.login} state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = WithProtectedRoute;
export const OnlyUnAuth = ({ component }: { component: ReactElement }) => {
  return <WithProtectedRoute onlyUnAuth={true} component={component} />;
};
