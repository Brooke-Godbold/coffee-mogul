import componentStyles from "@/styles/component-styles.module.css";
import styles from "./styles.module.css";
import SearchResults from "@/features/search/search-results/search-results";
import { Suspense } from "react";
import SearchResultsSkeleton from "@/ui/skeleton/search-results-skeleton/search-results-skeleton";
import SearchOptions from "@/features/search/search-options/search-options";

interface SearchPageProps {
  searchParams: {
    term: string;
    roast: string;
    sort: string;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const { term, roast, sort } = searchParams;

  return (
    <div className={componentStyles.page}>
      <div className={styles.searchPage}>
        <SearchOptions roast={roast} sort={sort} />
        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResults searchTerm={term} roast={roast} sort={sort} />
        </Suspense>
      </div>
    </div>
  );
}
