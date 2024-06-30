import { FC, useEffect } from "react";
import profileStyles from "./ProfileInfo.module.css";
import Input from "../../../ui/Input/Input";
import { useAppSelector } from "../../../services/store/hooks";
import { useForm } from "../../../hooks/useForm";
import { IUser } from "../../../types/user-types";
import { editUser } from "../../../services/features/user/auth";
import { PrimaryButton } from "../../../ui/PrimaryButton/PrimaryButton";

type TProfileInfo = IUser & { password?: string };

export const ProfileInfo: FC = () => {
  const user = useAppSelector((store) => store.user.user);
  const { formState, onChange, setFormState, onSubmit } = useForm<TProfileInfo>(
    {
      name: "",
      email: "",
      password: "",
    }
  );

  useEffect(() => {
    if (user) {
      setFormState({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, setFormState]);

  return (
    <article className={profileStyles.profileInfo}>
      <h1 className={profileStyles.heading}>Профиль</h1>
      <div className={profileStyles.info}>
        <div className={profileStyles.infoWrapper}>
          <h4 className={profileStyles.formTitle}>Личные данные</h4>
          <form
            className={profileStyles.form}
            autoComplete="off"
            onSubmit={(e) => onSubmit(e, editUser)}
          >
            <Input
              type="text"
              placeholder="Имя"
              name="name"
              autoComplete="name"
              value={formState.name || ""}
              onChange={onChange}
            />
            <Input
              type="email"
              placeholder="Логин"
              name="email"
              autoComplete="email"
              value={formState.email || ""}
              onChange={onChange}
            />
            <Input
              type="password"
              name="password"
              autoComplete="new-password"
              value={formState.password || ""}
              onChange={onChange}
            />
            <PrimaryButton buttonType="submit">
              Сохранить изменения
            </PrimaryButton>
          </form>
        </div>
      </div>
    </article>
  );
};
