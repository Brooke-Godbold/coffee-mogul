import { itemClient } from "../db";

export async function getReviews(itemId: string) {
  const client = await itemClient;

  try {
    const reviewsList = await client
      ?.db()
      .collection("review")
      .find({ itemId }, { projection: { _id: 0 }, sort: { _id: -1 } })
      .toArray();

    return { reviewsList };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Something went wrong" };
    }
  }
}
