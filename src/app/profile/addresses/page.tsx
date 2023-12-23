import AddressModal from "@/features/addresses/address-modal/address-modal";
import AddressSection from "@/features/addresses/address-section/address-section";
import styles from "@/styles/component-styles.module.css";
import CardListSkeleton from "@/ui/skeleton/card-list-skeleton/card-list-skeleton";
import { Suspense } from "react";

export default function AddressesPage() {
  return (
    <form className={styles.page}>
      <h1 className={`${styles.mainHeading} ${styles.heading}`}>
        Saved Addresses
      </h1>
      <Suspense fallback={<CardListSkeleton />}>
        <AddressModal />
        <AddressSection />
      </Suspense>
    </form>
  );
}
