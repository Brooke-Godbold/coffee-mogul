import { FaCoffee } from "react-icons/fa";

import styles from "./header.module.css";

import Link from "next/link";
import SearchBar from "@/features/search/search-bar/search-bar";
import HeaderOptions from "./header-options/header-options";
import { Suspense } from "react";
import SearchBarSkeleton from "@/features/search/search-bar-skeleton/search-bar-skeleton";
import HeaderProducts from "./header-products/header-products";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.headerNavigation}>
        <Link href={"/"}>
          <h2 className={styles.logo}>
            <FaCoffee /> CoffeeMogul
          </h2>
        </Link>
        <HeaderProducts />
      </nav>
      <div className={styles.searchBar}>
        <Suspense fallback={<SearchBarSkeleton />}>
          <SearchBar />
        </Suspense>
      </div>
      <Suspense fallback={<div />}>
        <HeaderOptions />
      </Suspense>
    </header>
  );
}
