"use client";

import { FaSearch } from "react-icons/fa";
import styles from "./search-bar.module.css";
import { search } from "@/actions/search";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import SpinnerMini from "@/ui/spinner/spinner-mini";

export default function SearchBar() {
  return (
    <form action={search} className={styles.searchBarContainer}>
      <SearchBarInput />
    </form>
  );
}

function SearchBarInput() {
  const searchParams = useSearchParams();
  const { pending } = useFormStatus();

  return (
    <>
      <input
        defaultValue={searchParams.get("term") || ""}
        name="term"
        className={styles.searchBar}
        disabled={pending}
      />
      {pending ? <SpinnerMini /> : <FaSearch />}
    </>
  );
}
