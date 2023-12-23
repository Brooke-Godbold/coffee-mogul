import paths from "@/paths";
import styles from "./checkout-button.module.css";
import Link from "next/link";

export default function CheckoutButton() {
  return (
    <Link href={paths.checkoutPath()} className={styles.checkoutLink}>
      Checkout
    </Link>
  );
}
