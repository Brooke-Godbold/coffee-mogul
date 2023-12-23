import styles from "@/styles/component-styles.module.css";
import SignInButton from "@/ui/sign-in-button/sign-in-button";
import { Suspense } from "react";
import Cart from "@/features/cart/cart/cart";
import LoadingSkeleton from "@/ui/skeleton/skeleton";

export default function CartPage() {
  return (
    <div className={styles.page} style={{ width: "25%" }}>
      <h1 className={`${styles.mainHeading} ${styles.heading}`}>
        Shopping Cart
      </h1>
      <Suspense fallback={<LoadingSkeleton />}>
        <Cart />
      </Suspense>
      <SignInButton>Sign In to Add to your Cart</SignInButton>
    </div>
  );
}
