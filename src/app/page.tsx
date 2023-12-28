import RecentlyViewed from "@/features/home/recently-viewed/recently-viewed";
import NewlyAdded from "@/features/home/newly-added/newly-added";
import Featured from "@/features/home/featured/featured";
import Hero from "@/features/home/hero/hero";

import styles from "@/styles/component-styles.module.css";
import { Suspense } from "react";
import ProductSectionSkeleton from "@/ui/skeleton/product-section-skeleton/product-section-skeleton";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={`${styles.mainHeading} ${styles.heading}`}>
        Welcome to Coffee Mogul
      </h1>
      <Hero />
      <Suspense fallback={<ProductSectionSkeleton />}>
        <RecentlyViewed />
      </Suspense>
      <h2 className={`${styles.subHeading} ${styles.heading}`}>Featured</h2>
      <Suspense fallback={<ProductSectionSkeleton />}>
        <Featured />
      </Suspense>
      <h2 className={`${styles.subHeading} ${styles.heading}`}>Newly Added</h2>
      <Suspense fallback={<ProductSectionSkeleton />}>
        <NewlyAdded />
      </Suspense>
    </div>
  );
}
