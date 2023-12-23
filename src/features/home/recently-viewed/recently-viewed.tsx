import { authOptions } from "@/auth";
import ErrorToast from "@/ui/error-toast/error-toast";
import ProductSection from "@/ui/product-section/product-section";
import { authClient, itemClient } from "@/utils/db";
import { getServerSession } from "next-auth";

async function getRecentlyViewedItemIds(userId: string) {
  const client = await authClient;

  try {
    const user = await client
      ?.db()
      .collection("users")
      .findOne({ email: userId });

    const itemIds = user?.recentlyViewed;

    return { itemIds };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Something went wrong" };
    }
  }
}

async function getRecentlyViewedItems(itemIds: Array<string>) {
  const client = await itemClient;

  try {
    const items = await client
      ?.db()
      .collection("coffee")
      .find({ itemId: { $in: itemIds } }, { projection: { _id: 0 } })
      .toArray();

    return { items };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Something went wrong" };
    }
  }
}

export default async function RecentlyViewed() {
  const session = await getServerSession(authOptions);

  let recentlyViewedItems;
  if (session?.user?.email) {
    const recentlyViewed = await getRecentlyViewedItemIds(session.user.email);

    recentlyViewedItems = await getRecentlyViewedItems(recentlyViewed.itemIds);
  }

  return (
    <>
      <ErrorToast
        errors={recentlyViewedItems?.error ? [recentlyViewedItems.error] : []}
      />
      {recentlyViewedItems?.items ? (
        <ProductSection items={recentlyViewedItems.items} />
      ) : null}
    </>
  );
}
