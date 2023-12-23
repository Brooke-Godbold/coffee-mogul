import LoadingSkeleton from "../skeleton";
import styles from "@/features/search/search-results/search-results.module.css";

export default function SearchResultsSkeleton() {
  return (
    <div className={styles.searchResults}>
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
    </div>
  );
}
