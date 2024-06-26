import { FC } from "react";
import { AuthForm } from "../../components/AuthForm/AuthForm";
import { useForm } from "../../hooks/useForm";
import Input from "../../ui/Input/Input";
import { ForgotLinks } from "../../components/AuthForm/AuthLinks/AuthLinks";

export const ForgotPasswordPage: FC = () => {
  const { formState, onChange } = useForm<{ email: string }>({
    email: "",
  });

  return (
    <AuthForm
      onSubmit={() => console.log(1)}
      title="Восстановление пароля"
      buttonText="Восстановить "
      linkComponent={ForgotLinks}
    >
      <Input
        type="email"
        required
        autoComplete="email"
        name="email"
        placeholder={"Укажите e-mail"}
        value={formState.email || ""}
        onChange={onChange}
      />
    </AuthForm>
  );
};
