import { FC, FormEvent } from "react";
import { AuthForm } from "../../components/AuthForm/AuthForm";
import { useForm } from "../../hooks/useForm";
import Input from "../../ui/Input/Input";
import { ForgotLinks } from "../../components/AuthForm/AuthLinks/AuthLinks";
import { Navigate, useNavigate } from "react-router";
import { resetPassword } from "../../services/features/user/auth";
import { ROUTE } from "../../utils/constants";

export const ResetPasswordPage: FC = () => {
  const { formState, onChange, setFormState } = useForm<{
    password: string;
    token: string;
  }>({
    password: "",
    token: "",
  });
  const navigate = useNavigate();
  const forgotSuccess: string | null = localStorage.getItem("forgotPassword");

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPassword(formState)
      .then((res) => {
        if (res && res.success) {
          localStorage.removeItem("forgotPassword");
          navigate(`/${ROUTE.mainLayout.login}`, { replace: true });
          setFormState({
            password: "",
            token: "",
          });
        }
      })
      .catch((error) => console.error(error));
  };

  return forgotSuccess ? (
    <AuthForm
      onSubmit={handleReset}
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
  ) : (
    <Navigate to={ROUTE.mainLayout.forgotPassword} replace={true} />
  );
};
