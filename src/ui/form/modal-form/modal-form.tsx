import styles from "@/styles/component-styles.module.css";
import FormHeading from "../form-heading/form-heading";
import { useFormStatus } from "react-dom";
import Spinner from "@/ui/spinner/spinner";

interface ModalFormProps {
  children: React.ReactNode;
  submitAction: (formData: FormData) => void;
  title: string;
}

export default function ModalForm({
  children,
  submitAction,
  title,
}: ModalFormProps) {
  return (
    <form action={submitAction} className={styles.form}>
      <FormHeading title={title} />
      {children}
      <div className={styles.formSection}>
        <Submit />
      </div>
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className={styles.loadingButton}>
      {pending ? <Spinner /> : "Submit"}
    </button>
  );
}
