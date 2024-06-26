import { FC } from "react";
import { AuthForm } from "../../components/AuthForm/AuthForm";
import { useForm } from "../../hooks/useForm";

export const LoginPage: FC = () => {
  const { formState, onChange } = useForm<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  return (
    <AuthForm
      onSubmit={() => console.log(1)}
      title="Log in to your account"
      buttonText="Sign in"
    ></AuthForm>
  );
};
