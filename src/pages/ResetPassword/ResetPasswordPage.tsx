import { FC } from "react";
import { AuthForm } from "../../components/AuthForm/AuthForm";
import { useForm } from "../../hooks/useForm";
import Input from "../../ui/Input/Input";
import { ForgotLinks } from "../../components/AuthForm/AuthLinks/AuthLinks";
import { IUserResetPassword } from "../../types/user-types";

export const ResetPasswordPage: FC = () => {
  const { formState, onChange } = useForm<IUserResetPassword>({
    token: "",
    password: "",
  });

  return (
    <AuthForm
      onSubmit={() => console.log(1)}
      title="Восстановление пароля"
      buttonText="Восстановить "
      linkComponent={ForgotLinks}
    >
      <Input
        type="password"
        required
        autoComplete="new-password"
        name="password"
        placeholder="Введите пароль"
        value={formState.password || ""}
        onChange={onChange}
      />
      <Input
        type="text"
        required
        autoComplete="one-time-code"
        name="token"
        placeholder={"Введите код из письма"}
        value={formState.token || ""}
        onChange={onChange}
      />
    </AuthForm>
  );
};
