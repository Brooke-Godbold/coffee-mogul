import styles from "@/styles/component-styles.module.css";

export default function NotFoundPage() {
  return (
    <div className={styles.page}>
      <h1
        className={`${styles.heading} ${styles.mainHeading}`}
      >{`Oops! We couldn't find that!`}</h1>
    </div>
  );
}
