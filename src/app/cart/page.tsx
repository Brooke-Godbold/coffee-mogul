import styles from "@/styles/component-styles.module.css";
import { Suspense } from "react";
import Cart from "@/features/cart/cart/cart";
import LoadingSkeleton from "@/ui/skeleton/skeleton";

export default function CartPage() {
  return (
    <div className={`${styles.page} ${styles.narrowPage}`}>
      <h1 className={`${styles.mainHeading} ${styles.heading}`}>
        Shopping Cart
      </h1>
      <Suspense fallback={<LoadingSkeleton />}>
        <Cart />
      </Suspense>
    </div>
  );
}
