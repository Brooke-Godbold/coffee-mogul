import styles from "@/styles/component-styles.module.css";
import { Suspense } from "react";
import OrdersSection from "@/features/orders/orders-section/orders-section";
import CardListSkeleton from "@/ui/skeleton/card-list-skeleton/card-list-skeleton";

export default function OrdersPage() {
  return (
    <section className={styles.page}>
      <h1 className={`${styles.mainHeading} ${styles.heading}`}>
        Order History
      </h1>
      <Suspense fallback={<CardListSkeleton />}>
        <OrdersSection />
      </Suspense>
    </section>
  );
}
