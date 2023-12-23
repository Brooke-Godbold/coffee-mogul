import type { Document } from "mongodb";
import styles from "./cart-section.module.css";
import Link from "next/link";
import paths from "@/paths";

export interface CartProps {
  cartItems:
    | {
        quantity: number;
        data: Document | undefined;
      }[]
    | undefined;
  totalPrice: number;
}

export default function CartSection({ cartItems, totalPrice }: CartProps) {
  return (
    <div className={styles.cartSection}>
      {cartItems?.map((item) => (
        <div className={styles.itemSection} key={item.data?.itemId}>
          <Link
            className={styles.itemLink}
            href={paths.itemDetailPath(item.data?.itemId)}
          >
            {item.data?.name}
          </Link>
          <div className={styles.quantity}>{`x${item.quantity}`}</div>
          <div>{`Subtotal: £${(item.quantity * item.data?.price) / 100}`}</div>
        </div>
      ))}
      <div>{`Total Price: £${totalPrice / 100}`}</div>
    </div>
  );
}
