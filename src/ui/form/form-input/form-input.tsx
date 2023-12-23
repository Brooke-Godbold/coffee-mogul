import styles from "@/styles/component-styles.module.css";

interface FormInputProps {
  label: string;
  name: string;
  defaultValue?: string;
  errors: { [key: string]: Array<string> } | undefined;
}

export default function FormInput({
  label,
  name,
  defaultValue,
  errors,
}: FormInputProps) {
  return (
    <div className={styles.formSection}>
      <label>{label}</label>
      <input
        name={name}
        defaultValue={defaultValue}
        className={
          errors?.[name]
            ? `${styles.formInput} ${styles.inputError}`
            : `${styles.formInput}`
        }
      />
    </div>
  );
}
