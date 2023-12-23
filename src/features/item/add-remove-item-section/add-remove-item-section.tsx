"use client";

import type { Document } from "mongodb";
import { useState } from "react";
import styles from "./add-remove-item-section.module.css";
import { useSession } from "next-auth/react";
import { useAddToCart, useRemoveFromCart } from "@/hooks/useAddRemoveItemToast";
import { useFormStatus } from "react-dom";
import SpinnerMini from "@/ui/spinner/spinner-mini";
import useFormErrors from "@/hooks/useFormErrors";

interface AddRemoveItemProps {
  item: Document | undefined;
  currentQuantity: number;
}

export default function AddRemoveItemSection({
  item,
  currentQuantity,
}: AddRemoveItemProps) {
  const [quantity, setQuantity] = useState("1");
  const { data } = useSession();

  const [formStateAddToCart, addToCart] = useAddToCart(
    data,
    item?.itemId,
    quantity
  );

  const [formStateRemoveFromCart, removeFromCart] = useRemoveFromCart(
    data,
    item?.itemId,
    quantity
  );

  useFormErrors(
    formStateAddToCart,
    undefined,
    `Added ${quantity} ${item?.name} to Cart!`
  );

  useFormErrors(
    formStateRemoveFromCart,
    undefined,
    `Removed ${quantity} ${item?.name} from Cart!`
  );

  return (
    <>
      <div>{`${currentQuantity || 0} Currently in Cart`}</div>
      <div className={styles.addRemoveSection}>
        <select
          className={styles.quantitySelect}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        >
          {[...Array(10)].map((e, quantity) => (
            <option key={quantity + 1} value={quantity + 1}>
              {quantity + 1}
            </option>
          ))}
        </select>
        <ItemButton action={addToCart}>Add to Cart</ItemButton>
        {currentQuantity > 0 && (
          <ItemButton action={removeFromCart}>Remove from Cart</ItemButton>
        )}
      </div>
    </>
  );
}

interface ItemButtonProps {
  action: (formData: FormData) => void;
  children: React.ReactNode;
}

function ItemButton({ action, children }: ItemButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      style={{ position: "relative", width: "17rem" }}
      disabled={pending}
      formAction={action}
    >
      {pending ? <SpinnerMini /> : children}
    </button>
  );
}
