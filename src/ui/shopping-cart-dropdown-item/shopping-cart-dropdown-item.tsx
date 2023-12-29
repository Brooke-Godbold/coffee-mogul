"use client";

import { FaPlus, FaMinus } from "react-icons/fa6";
import styles from "./shopping-cart-dropdown-item.module.css";
import componentStyles from "@/styles/component-styles.module.css";
import { Document } from "mongodb";
import { useSession } from "next-auth/react";
import Link from "next/link";
import paths from "@/paths";
import { useAddToCart, useRemoveFromCart } from "@/hooks/useAddRemoveItemToast";
import useFormErrors from "@/hooks/useFormErrors";

interface ShoppingCartDropdownItemProps {
  item: {
    quantity: number;
    data: Document | undefined;
  };
}

export default function ShoppingCartDropdownItem({
  item,
}: ShoppingCartDropdownItemProps) {
  const { data } = useSession();

  const [formStateAddToCart, addToCart] = useAddToCart(
    data,
    item?.data?.itemId,
    "1"
  );

  const [formStateRemoveFromCart, removeFromCart] = useRemoveFromCart(
    data,
    item?.data?.itemId,
    "1"
  );

  useFormErrors(
    formStateAddToCart,
    undefined,
    `Added ${item?.data?.name} to Cart!`
  );

  useFormErrors(
    formStateRemoveFromCart,
    undefined,
    `Removed ${item?.data?.name} from Cart!`
  );

  return (
    <li className={styles.shoppingCartItem} key={item.data?.itemId}>
      <Link
        className={componentStyles.link}
        href={paths.itemDetailPath(item.data?.itemId)}
      >
        {item.data?.name}
      </Link>
      <div>{`x${item.quantity}`}</div>
      <div className={styles.quantityButtons}>
        <button className={styles.quantityButton} formAction={addToCart}>
          <FaPlus />
        </button>
        <button className={styles.quantityButton} formAction={removeFromCart}>
          <FaMinus />
        </button>
      </div>
    </li>
  );
}
