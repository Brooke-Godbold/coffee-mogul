"use client";

import { GrMenu } from "react-icons/gr";
import styles from "./mobile-navigation-button.module.css";
import { Suspense, useState } from "react";
import MobileNavigationMenu from "../mobile-navigation-menu/mobile-navigation-menu";
import SearchBarSkeleton from "@/features/search/search-bar-skeleton/search-bar-skeleton";
import SearchBar from "@/features/search/search-bar/search-bar";

export default function MobileNavigationButton() {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <nav className={styles.mobileNavigation}>
      <Suspense fallback={<SearchBarSkeleton />}>
        <SearchBar />
      </Suspense>
      <button onClick={() => setMenuActive((menuActive) => !menuActive)}>
        <GrMenu />
      </button>
      {menuActive && <MobileNavigationMenu setMenuActive={setMenuActive} />}
    </nav>
  );
}
