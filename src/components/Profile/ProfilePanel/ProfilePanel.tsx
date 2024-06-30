import { useAppDispatch, useAppSelector } from "../../../services/store/hooks";
import profileStyles from "./ProfilePanel.module.css";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LogoutIcon from "@mui/icons-material/Logout";
import { HeaderLink } from "../../HeaderLink/HeaderLink";
import { ROUTE } from "../../../utils/constants";
import { userLogout } from "../../../services/features/user/auth";
import { useLocation, useNavigate } from "react-router";
import { FC } from "react";

export const ProfilePanel: FC = () => {
  const user = useAppSelector((store) => store.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const profileLinks: { id: number; name: string; route: string }[] = [
    { id: 1, name: "Профиль", route: `/${ROUTE.mainLayout.profile}` },
    {
      id: 2,
      name: "Избранное",
      route: `/${ROUTE.mainLayout.profile}/${ROUTE.mainLayout.favouritesMovies}`,
    },
  ];

  const handleLogout = (): void => {
    dispatch(userLogout())
      .then(() => navigate(`/${ROUTE.mainLayout.login}`, { replace: true }))
      .catch((error) => console.error(error));
  };

  const getDescription = (): string => {
    if (location.pathname.endsWith(ROUTE.mainLayout.profile)) {
      return "В этом разделе вы можете изменить свои персональные данные";
    } else {
      return "В этом разделе вы можете посмотреть свои любимые фильмы";
    }
  };

  return (
    <aside className={profileStyles.panel}>
      <div className={profileStyles.panelContainer}>
        <div className={profileStyles.profileUser}>
          <PermIdentityIcon
            style={{ width: "116px", height: "116px" }}
            className={profileStyles.icon}
          />
          <div className={profileStyles.userInfo}>
            <p>{user?.name}</p>
            <span className={profileStyles.userEmail}>{user?.email}</span>
          </div>
        </div>
        <ul className={profileStyles.panelLinks}>
          {profileLinks.map((link) => (
            <HeaderLink key={link.id} route={link.route} textLink={link.name} />
          ))}
          <button
            onClick={handleLogout}
            type="button"
            className={profileStyles.logoutBtn}
          >
            <LogoutIcon />
            <span> Выйти из профиля</span>
          </button>
        </ul>
        <p className={profileStyles.description}>{getDescription()}</p>
      </div>
    </aside>
  );
};
