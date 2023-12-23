import styles from "@/ui/product-section/product-section.module.css";
import LoadingSkeleton from "../skeleton";

export default function ProductSectionSkeleton() {
  return (
    <div className={styles.productSection}>
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
    </div>
  );
}
