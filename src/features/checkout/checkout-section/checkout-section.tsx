"use client";

import { Elements } from "@stripe/react-stripe-js";
import { ContactOption, loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import styles from "./checkout-section.module.css";

import type { Document } from "mongodb";
import Spinner from "@/ui/spinner/spinner";
import CartSection from "@/features/cart/cart-section";
import { useSession } from "next-auth/react";
import PaymentForm from "@/features/payment/payment-form/payment-form";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

interface CheckoutProps {
  cartItems: cartItem[] | undefined;
  savedAddresses: Array<ContactOption>;
}

export interface cartItem {
  quantity: number;
  data: Document | undefined;
}

export default function CheckoutSection({
  cartItems,
  savedAddresses,
}: CheckoutProps) {
  const [clientSecret, setClientSecret] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const { data } = useSession();

  useEffect(() => {
    async function getCheckoutSession() {
      if (totalPrice < 50) return;

      const checkoutSession = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({
          price: totalPrice,
          email: data?.user?.email,
          orderItems:
            cartItems?.map((item) => ({
              name: item.data?.name,
              quantity: item.quantity,
            })) || [],
        }),
      });
      const checkoutSessionJson = await checkoutSession.json();
      setClientSecret(checkoutSessionJson.client_secret);
    }

    getCheckoutSession();
  }, [totalPrice, data, cartItems]);

  useEffect(() => {
    if (!cartItems) return;

    const totalPrice = cartItems?.reduce(
      (arr, cur) => arr + cur.quantity * cur.data?.price,
      0
    );
    setTotalPrice(totalPrice);
  }, [cartItems]);

  const options = {
    clientSecret: clientSecret || "",
    appearance: {
      theme: "flat",
    },
  };

  if (!cartItems) {
    return <Spinner />;
  }

  return (
    <div>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options} key={clientSecret}>
          <div className={styles.checkoutSection}>
            <CartSection cartItems={cartItems} totalPrice={totalPrice} />
            <PaymentForm savedAddresses={savedAddresses} />
          </div>
        </Elements>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
