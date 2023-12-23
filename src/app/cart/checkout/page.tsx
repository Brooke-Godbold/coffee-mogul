import { authOptions } from "@/auth";
import styles from "@/styles/component-styles.module.css";
import CheckoutSection from "@/features/checkout/checkout-section/checkout-section";
import paths from "@/paths";
import { getCart } from "@/utils/db/get-shopping-cart";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authClient } from "@/utils/db";
import ErrorToast from "@/ui/error-toast/error-toast";

async function getAddresses(userId: string) {
  const client = await authClient;

  try {
    const user = await client
      ?.db()
      .collection("users")
      .findOne({ email: userId }, { projection: { _id: 0 } });

    return { addresses: user?.addresses };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Something went wrong" };
    }
  }
}

export default async function CheckoutPage() {
  const cartItems = await getCart("pending");
  const session = await getServerSession(authOptions);

  if (cartItems.cart?.length === 0 || !session?.user?.email) {
    redirect(paths.cartPath());
  }

  const addresses = await getAddresses(session?.user?.email || "");

  const errors = [
    ...(cartItems.error ? [cartItems.error] : []),
    ...(addresses.error ? [addresses.error] : []),
  ];

  return (
    <div className={styles.page} style={{ width: "25%" }}>
      <ErrorToast errors={errors} />
      <h1 className={`${styles.mainHeading} ${styles.heading}`}>Checkout</h1>
      <CheckoutSection
        cartItems={cartItems.cart}
        savedAddresses={addresses.addresses}
      />
    </div>
  );
}
