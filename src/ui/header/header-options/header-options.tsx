import { getCart } from "@/utils/db/get-shopping-cart";
import styles from "./header-options.module.css";
import HeaderAuth from "@/ui/header-auth/header-auth";
import ShoppingCartButton from "@/ui/shopping-cart-dropdown/shopping-cart-dropdown";

export default async function HeaderOptions() {
  const cartItems = await getCart("pending");

  return (
    <div className={styles.options}>
      <HeaderAuth />
      <ShoppingCartButton cart={cartItems} />
    </div>
  );
}
