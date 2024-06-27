import { useAppDispatch } from "../services/store/hooks";
import { useNavigate } from "react-router";
import { ROUTE } from "../utils/constants";
import { ChangeEvent, FormEvent, useState } from "react";

export const useForm = <T>(initial: T) => {
  const [formState, setFormState] = useState(initial);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>, func: any) => {
    e.preventDefault();
    dispatch(func(formState))
      .then(() => navigate(`/${ROUTE.mainLayout.profile}`, { replace: true }))
      .catch((error: unknown) => console.error(error));
    setFormState(initial);
  };

  return { formState, setFormState, onChange, onSubmit };
};
