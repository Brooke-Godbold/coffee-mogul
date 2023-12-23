import styles from "@/styles/component-styles.module.css";

interface FormHeadingProps {
  title: string;
}

export default function FormHeading({ title }: FormHeadingProps) {
  return (
    <div className={styles.formSection}>
      <h3>{title}</h3>
    </div>
  );
}
