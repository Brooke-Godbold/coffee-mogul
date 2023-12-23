import { updateCart } from "@/actions/addToCart";
import { Session } from "next-auth";
import { useFormState } from "react-dom";

export const useAddToCart = (
  data: Session | null,
  itemId: string,
  quantity: string
) =>
  useFormState(
    updateCart.bind(null, {
      userId: data?.user?.email,
      itemId,
      quantity,
      remove: false,
    }),
    { success: false }
  );

export const useRemoveFromCart = (
  data: Session | null,
  itemId: string,
  quantity: string
) =>
  useFormState(
    updateCart.bind(null, {
      userId: data?.user?.email,
      itemId,
      quantity,
      remove: true,
    }),
    { success: false }
  );
