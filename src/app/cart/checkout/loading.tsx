import LoadingSkeleton from "@/ui/skeleton/skeleton";
import styles from "@/styles/component-styles.module.css";

export default function Loading() {
  return (
    <div className={styles.page} style={{ width: "25%" }}>
      <h1 className={`${styles.mainHeading} ${styles.heading}`}>Checkout</h1>
      <LoadingSkeleton />
    </div>
  );
}
