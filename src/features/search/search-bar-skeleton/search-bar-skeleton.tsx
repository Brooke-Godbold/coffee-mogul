import styles from "@/features/search/search-bar/search-bar.module.css";

export default function SearchBarSkeleton() {
  return (
    <div className={styles.searchBarContainer}>
      <input name="term" className={styles.searchBar} disabled={true} />
    </div>
  );
}
