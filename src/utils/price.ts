import { Document } from "mongodb";
import { cartItem } from "@/features/checkout/checkout-section/checkout-section";

export const totalPrice = (cartItems: Array<cartItem>) =>
  cartItems.reduce(
    (arr: number, cur: Document) =>
      arr +
      cur.quantity *
        (cur.data?.sale
          ? (cur.data?.price / 100) * cur.data?.sale
          : cur.data?.price),
    0
  );

export const salePrice = (itemData: Document | undefined) =>
  (itemData?.price / 100) * itemData?.sale;
