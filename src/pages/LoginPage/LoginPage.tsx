import { FC } from "react";
import { AuthForm } from "../../components/AuthForm/AuthForm";
import { useForm } from "../../hooks/useForm";
import Input from "../../ui/Input/Input";
import { LoginLinks } from "../../components/AuthForm/AuthLinks/AuthLinks";
import { IUserLogin } from "../../types/user-types";
import { userLogin } from "../../services/features/user/auth";

export const LoginPage: FC = () => {
  const { formState, onChange, onSubmit } = useForm<IUserLogin>({
    email: "",
    password: "",
  });

  return (
    <AuthForm
      onSubmit={(e) => onSubmit(e, userLogin)}
      title="Вход ВКонтакте"
      buttonText="Войти"
      linkComponent={LoginLinks}
    >
      <Input
        type="email"
        autoComplete="email"
        name="email"
        placeholder="example@gmail.com"
        value={formState.email || ""}
        onChange={onChange}
      />
      <Input
        type="password"
        autoComplete="current-password"
        name="password"
        placeholder="Введите пароль"
        value={formState.password || ""}
        onChange={onChange}
      />
    </AuthForm>
  );
};
