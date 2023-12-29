import CartSection from "@/features/cart/cart-section";
import CheckoutButton from "@/ui/checkout-button/checkout-button";
import ErrorToast from "@/ui/error-toast/error-toast";
import Spinner from "@/ui/spinner/spinner";
import { getCart } from "@/utils/db/get-shopping-cart";
import { totalPrice } from "@/utils/price";

export default async function Cart() {
  const cartItems = await getCart("pending");

  if (
    !cartItems ||
    ((cartItems.cart?.length ?? 0) > 0 && !totalPrice(cartItems.cart || []))
  ) {
    return <Spinner />;
  }

  return (
    <>
      <ErrorToast errors={cartItems.error ? [cartItems.error] : []} />
      {(cartItems?.cart?.length ?? 0) > 0 ? (
        <>
          <CartSection
            cartItems={cartItems.cart}
            totalPrice={totalPrice(cartItems.cart || []) || 0}
          />
          <CheckoutButton />
        </>
      ) : (
        <div>Your Cart is Empty!</div>
      )}
    </>
  );
}
