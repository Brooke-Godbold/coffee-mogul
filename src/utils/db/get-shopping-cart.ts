import type { Document } from "mongodb";
import { itemClient, userClient } from "../db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export interface Cart {
  cart?: {
    quantity: number;
    data: Document | undefined;
  }[];
  error?: string;
}

export async function getCart(status: string): Promise<Cart> {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.email;

  if (!userId) return {};

  const userFilter = {
    userId,
    status,
  };

  let cartItemIds: string[] = [];

  let client;
  client = await userClient;

  try {
    const currentTransaction = await client
      .db()
      .collection("transaction")
      .findOne(userFilter);

    if (currentTransaction?.items?.length === 0) {
      return {};
    }

    cartItemIds = currentTransaction?.items;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Something went wrong" };
    }
  }

  client = await itemClient;

  let cartItemsData: Document[];

  const uniqueItemIds = Array.from(new Set(cartItemIds));

  try {
    cartItemsData = await client
      ?.db()
      .collection("coffee")
      .find({ itemId: { $in: uniqueItemIds } }, { projection: { _id: 0 } })
      .toArray();

    if (!cartItemsData) {
      return {};
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Something went wrong" };
    }
  }

  const cartItems = Array.from(new Set(cartItemIds)).map((id) => {
    const cartItemData = cartItemsData.find((item) => item.itemId === id);
    return {
      quantity: cartItemIds.reduce(
        (arr, cur) => (cur === id ? arr + 1 : arr),
        0
      ),
      data: cartItemData,
    };
  });

  return { cart: cartItems };
}
