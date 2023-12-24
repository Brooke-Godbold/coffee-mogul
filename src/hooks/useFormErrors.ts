import { useEffect } from "react";
import toast from "react-hot-toast";

export interface FormState {
  errors?: { [key: string]: Array<string> };
  success?: boolean;
  loading?: true;
}

export default function useFormErrors(
  formState: FormState,
  onCloseModal: Function | undefined,
  successMessage: string
) {
  useEffect(() => {
    if (formState.success) {
      formState.success = false;
      toast(successMessage);
      onCloseModal?.();
    } else if (formState.errors) {
      for (var errorField in formState.errors) {
        formState.errors[errorField].map((error: string) => toast.error(error));
      }
    }
  }, [formState, onCloseModal, successMessage]);
}
