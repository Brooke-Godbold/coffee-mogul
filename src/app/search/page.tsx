import { redirect } from "next/navigation";
import styles from "@/styles/component-styles.module.css";
import SearchResults from "@/features/search/search-results/search-results";
import { Suspense } from "react";
import SearchResultsSkeleton from "@/ui/skeleton/search-results-skeleton/search-results-skeleton";

interface SearchPageProps {
  searchParams: {
    term: string;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const { term } = searchParams;

  if (term?.length < 3) {
    redirect("/");
  }

  return (
    <div className={styles.page}>
      <Suspense fallback={<SearchResultsSkeleton />}>
        <SearchResults searchTerm={term} />
      </Suspense>
    </div>
  );
}
