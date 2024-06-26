import { FC } from "react";
import { AuthForm } from "../../components/AuthForm/AuthForm";
import { useForm } from "../../hooks/useForm";
import Input from "../../ui/Input/Input";
import { RegisterLinks } from "../../components/AuthForm/AuthLinks/AuthLinks";
import { IUserRegister } from "../../types/user-types";

export const RegisterPage: FC = () => {
  const { formState, onChange } = useForm<IUserRegister>({
    name: "",
    password: "",
    email: "",
  });

  return (
    <AuthForm
      onSubmit={() => console.log(1)}
      title="Регистрация ВКонтакте"
      buttonText="Зарегистрироваться "
      linkComponent={RegisterLinks}
    >
      <Input
        type="text"
        required
        autoComplete="off"
        name="name"
        placeholder="Имя"
        value={formState.name || ""}
        onChange={onChange}
      />
      <Input
        type="email"
        required
        autoComplete="off"
        name="email"
        placeholder="Почта"
        value={formState.email || ""}
        onChange={onChange}
      />
      <Input
        type="password"
        required
        autoComplete="new-password"
        name="password"
        placeholder="Введите пароль"
        value={formState.password || ""}
        onChange={onChange}
      />
    </AuthForm>
  );
};
