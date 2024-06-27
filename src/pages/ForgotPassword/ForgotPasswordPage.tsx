import { FC, FormEvent, useState } from "react";
import { AuthForm } from "../../components/AuthForm/AuthForm";
import { useForm } from "../../hooks/useForm";
import Input from "../../ui/Input/Input";
import { ForgotLinks } from "../../components/AuthForm/AuthLinks/AuthLinks";
import { useNavigate } from "react-router";
import { forgotPassword } from "../../services/features/user/auth";
import { ROUTE } from "../../utils/constants";
import { Preloader } from "../../ui/Preloader/Preloader";

export const ForgotPasswordPage: FC = () => {
  const { formState, onChange, setFormState } = useForm<{ email: string }>({
    email: "",
  });
  const navigate = useNavigate();
  const [state, setState] = useState<Record<string, boolean>>({
    isLoading: false,
    isValidForm: true,
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({ ...state, isLoading: true });
    if (formState.email) {
      forgotPassword(formState.email).then((response) => {
        navigate(`/${ROUTE.mainLayout.resetPass}`);
        localStorage.setItem(
          "forgotPassword",
          JSON.stringify(response.message)
        );
        setFormState({ email: "" });
        setState({ ...state, isLoading: false });
      });
    } else {
      setState({ isLoading: false, isValidForm: false });
    }
  };

  return state.isLoading ? (
    <Preloader />
  ) : (
    <AuthForm
      onSubmit={onSubmit}
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
