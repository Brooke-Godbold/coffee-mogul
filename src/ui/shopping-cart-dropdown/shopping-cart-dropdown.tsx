"use client";

import { FaShoppingCart } from "react-icons/fa";
import styles from "./shopping-cart-button.module.css";
import { useState } from "react";
import { Cart } from "@/utils/db/get-shopping-cart";
import Link from "next/link";
import paths from "@/paths";
import CheckoutButton from "../checkout-button/checkout-button";
import ShoppingCartDropdownItem from "../shopping-cart-dropdown-item/shopping-cart-dropdown-item";

interface ShoppingCartProps {
  cart: Cart;
}

export default function ShoppingCartButton({
  cart: cartItems,
}: ShoppingCartProps) {
  const [shoppingCartOpen, setShoppingCartOpen] = useState(false);

  return (
    <>
      <button
        onClick={() =>
          setShoppingCartOpen((shoppingCartOpen) => !shoppingCartOpen)
        }
        className={styles.cartButton}
      >
        <FaShoppingCart />
      </button>
      <form
        className={
          shoppingCartOpen
            ? `${styles.dropdown}`
            : `${styles.dropdown} ${styles.inactive}`
        }
      >
        <h3>Shopping Cart</h3>
        {(cartItems?.cart?.length ?? 0) > 0 ? (
          cartItems?.cart?.map((item) => (
            <ShoppingCartDropdownItem key={item.data?.itemId} item={item} />
          ))
        ) : (
          <div>Your Cart is Empty!</div>
        )}
        <Link href={paths.cartPath()} className={styles.cartLink}>
          Cart
        </Link>
        {(cartItems?.cart?.length ?? 0) > 0 && <CheckoutButton />}
      </form>
    </>
  );
}
