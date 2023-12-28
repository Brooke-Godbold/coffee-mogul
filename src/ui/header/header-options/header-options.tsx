import { getCart } from "@/utils/db/get-shopping-cart";
import styles from "./header-options.module.css";
import HeaderAuth from "@/ui/header-auth/header-auth";
import ShoppingCartButton from "@/ui/shopping-cart-dropdown/shopping-cart-dropdown";
import ErrorToast from "@/ui/error-toast/error-toast";

export default async function HeaderOptions() {
  const cartItems = await getCart("pending");

  return (
    <nav className={styles.options}>
      <ErrorToast errors={cartItems.error ? [cartItems.error] : []} />
      <HeaderAuth />
      <ShoppingCartButton cart={cartItems} />
    </nav>
  );
}
