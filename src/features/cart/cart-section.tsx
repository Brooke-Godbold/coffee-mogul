import type { Document } from "mongodb";
import styles from "./cart-section.module.css";
import componentStyles from "@/styles/component-styles.module.css";
import Link from "next/link";
import paths from "@/paths";
import { salePrice } from "@/utils/price";

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
    <section className={styles.cartSection}>
      <ul className={styles.cartSection}>
        {cartItems?.map((item) => (
          <li className={styles.itemSection} key={item.data?.itemId}>
            <Link
              className={componentStyles.link}
              href={paths.itemDetailPath(item.data?.itemId)}
            >
              {item.data?.name}
            </Link>
            <div className={styles.quantity}>{`x${item.quantity}`}</div>
            <div className={styles.priceSection}>
              <div>{`Subtotal:`}</div>
              <div className={item.data?.sale ? styles.saleStrike : ""}>{`£${
                (item.quantity * item.data?.price) / 100
              }`}</div>
              {item.data?.sale && (
                <div className={styles.salePrice}>{`£${
                  (item.quantity * salePrice(item.data)) / 100
                }`}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div>{`Total Price: £${totalPrice / 100}`}</div>
    </section>
  );
}
