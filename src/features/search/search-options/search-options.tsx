"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import styles from "./search-options.module.css";

interface SearchOptionsProps {
  roast: string;
  sort: string;
}

export default function SearchOptions({ roast, sort }: SearchOptionsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const roastTypes = ["light", "medium", "dark"];
  const sortTypes = ["name", "price", "newest", "oldest"];

  function handleSearch(param: string, query: string) {
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set(param, query);
    } else {
      params.delete(param);
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <section className={styles.searchOptions}>
      <div className={styles.searchOptionsSection}>
        <h3>Search Options</h3>

        <div className={styles.option}>
          <label>Roast Type</label>
          <select
            onChange={(e) => handleSearch("roast", e.target.value)}
            className={styles.select}
            value={roastTypes.includes(roast) ? roast : ""}
          >
            <option value={""}>All</option>
            {roastTypes.map((type) => (
              <option key={`roast_${type}`} value={type}>
                {`${type.charAt(0).toUpperCase()}${type.slice(1)}`}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.option}>
          <label>Sort</label>
          <select
            onChange={(e) => handleSearch("sort", e.target.value)}
            className={styles.select}
            value={sortTypes.includes(sort) ? sort : "name"}
          >
            {sortTypes.map((type) => (
              <option key={`sort_${type}`} value={type}>
                {`${type.charAt(0).toUpperCase()}${type.slice(1)}`}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
