import { Outlet } from "react-router";
import { ProfilePanel } from "../../components/Profile/ProfilePanel/ProfilePanel";

export const ProfilePage = () => {
  return (
    <>
      <ProfilePanel />
      <Outlet />
    </>
  );
};
