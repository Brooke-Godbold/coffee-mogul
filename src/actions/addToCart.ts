"use server";

import { FormState } from "@/hooks/useFormErrors";
import paths from "@/paths";
import connectDatabase from "@/utils/db";
import { revalidatePath } from "next/cache";

interface CartData {
  userId: string | null | undefined;
  itemId: string;
  quantity: string;
  remove: boolean;
}

export async function updateCart(
  cartData: CartData,
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  if (!cartData.userId) return { success: false };

  const MONGO_USER_DATABASE = process.env.MONGO_USER_DATABASE;

  const { client, error } = await connectDatabase(MONGO_USER_DATABASE);

  if (client) {
    try {
      const transaction = {
        userId: cartData.userId,
        status: "pending",
      };

      const userFilter = {
        userId: cartData.userId,
        status: "pending",
      };

      const currentTransaction = await client
        ?.db()
        .collection("transaction")
        .findOne(userFilter);

      const itemsToAdd = [...Array(parseInt(cartData.quantity))].map(
        (e) => cartData.itemId
      );

      if (currentTransaction) {
        let items;
        if (cartData.remove) {
          items = [...currentTransaction.items];
          for (let i = 0; i < parseInt(cartData.quantity); i++) {
            let index = items.indexOf(cartData.itemId);
            if (index !== -1) items.splice(index, 1);
            else break;
          }
        } else {
          items = [...currentTransaction.items, ...itemsToAdd];
        }

        await client?.db().collection("transaction").updateOne(userFilter, {
          $set: {
            items,
          },
        });
      } else {
        await client
          ?.db()
          .collection("transaction")
          .insertOne({ ...transaction, items: itemsToAdd });
      }

      revalidatePath(paths.itemDetailPath(cartData.itemId));
      revalidatePath(paths.checkoutPath());

      return { success: true };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { errors: { error: [error.message] }, success: false };
      } else {
        return { errors: { error: ["Something went wrong"] }, success: false };
      }
    }
  } else {
    return {
      errors: { error: [error || "Something went wrong"] },
      success: false,
    };
  }
}
