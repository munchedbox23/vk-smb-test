import styles from "./ProfilePage.module.css";
import { Outlet } from "react-router";
import { ProfilePanel } from "../../components/Profile/ProfilePanel/ProfilePanel";

export const ProfilePage = () => {
  return (
    <section className={styles.profileWrapper}>
      <ProfilePanel />
      <Outlet />
    </section>
  );
};
