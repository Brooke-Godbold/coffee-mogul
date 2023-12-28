import { itemClient } from "@/utils/db";
import styles from "./search-results.module.css";
import SearchItem from "../search-item/search-item";
import ErrorToast from "@/ui/error-toast/error-toast";

async function getSearchResults(term: string) {
  const client = await itemClient;

  try {
    const searchResults = await client
      ?.db()
      .collection("coffee")
      .aggregate([
        {
          $search: {
            index: "item_search",
            autocomplete: {
              query: term,
              path: "name",
            },
          },
        },
      ])
      .toArray();

    return { searchResults };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Something went wrong" };
    }
  }
}

interface SearchResultsProps {
  searchTerm: string;
}

export default async function SearchResults({
  searchTerm,
}: SearchResultsProps) {
  const search = await getSearchResults(searchTerm);

  return (
    <ul className={styles.searchResults}>
      <ErrorToast errors={search.error ? [search.error] : []} />
      {(search.searchResults?.length ?? 0) > 0 ? (
        search.searchResults?.map((result) => (
          <SearchItem key={result.itemId} item={result} />
        ))
      ) : (
        <div className={styles.noResultsFound}>
          <h1>No results found</h1>
          <h3>Try adjusting your search</h3>
        </div>
      )}
    </ul>
  );
}
