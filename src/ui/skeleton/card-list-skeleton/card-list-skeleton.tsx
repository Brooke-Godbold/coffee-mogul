import styles from "@/styles/component-styles.module.css";
import LoadingSkeleton from "../skeleton";

export default function CardListSkeleton() {
  return (
    <div className={styles.cardSection}>
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
    </div>
  );
}
