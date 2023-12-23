import LoadingSkeleton from "@/ui/skeleton/skeleton";
import styles from "@/styles/component-styles.module.css";

export default function Loading() {
  return (
    <div className={styles.page}>
      <LoadingSkeleton />
    </div>
  );
}
