import { FaCoffee } from "react-icons/fa";

import styles from "./header.module.css";

import Link from "next/link";
import SearchBar from "@/features/search/search-bar/search-bar";
import HeaderOptions from "./header-options/header-options";
import { Suspense } from "react";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href={"/"}>
        <h2 className={styles.logo}>
          <FaCoffee /> CoffeeMogul
        </h2>
      </Link>
      <div className={styles.searchBar}>
        <SearchBar />
      </div>
      <Suspense fallback={<div />}>
        <HeaderOptions />
      </Suspense>
    </header>
  );
}
