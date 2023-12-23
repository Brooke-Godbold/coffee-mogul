import styles from "@/styles/component-styles.module.css";

interface FormTextareaProps {
  label: string;
  name: string;
  defaultValue?: string;
  errors: { [key: string]: Array<string> } | undefined;
}

export default function FormTextarea({
  label,
  name,
  defaultValue,
  errors,
}: FormTextareaProps) {
  return (
    <div className={styles.formSection}>
      <label>{label}</label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        className={
          errors?.[name]
            ? `${styles.formTextArea} ${styles.inputError}`
            : `${styles.formTextArea}`
        }
      />
    </div>
  );
}
