import { itemClient } from "@/utils/db";
import styles from "./search-results.module.css";
import SearchItem from "../search-item/search-item";
import ErrorToast from "@/ui/error-toast/error-toast";

async function getSearchResults(term: string, roast: string, sortType: string) {
  const client = await itemClient;

  const filter = { ...(roast && { roast }) };

  let sortQuery;

  if (!sortType) {
    sortQuery = { name: 1 };
  } else {
    switch (sortType) {
      case "newest":
        sortQuery = { _id: -1 };
        break;
      case "oldest":
        sortQuery = { _id: 1 };
        break;
      default:
        sortQuery = { [sortType]: 1 };
        break;
    }
  }

  try {
    let searchResults;

    if (!term || term.length < 3) {
      searchResults = await client
        ?.db()
        .collection("coffee")
        .find(filter, { sort: sortQuery as any })
        .toArray();
    } else {
      searchResults = await client
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
          {
            $match: filter,
          },
          {
            $sort: sortQuery as any,
          },
        ])
        .toArray();
    }

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
  roast: string;
  sort: string;
}

export default async function SearchResults({
  searchTerm,
  roast,
  sort,
}: SearchResultsProps) {
  const search = await getSearchResults(searchTerm, roast, sort);

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
