import { notFound } from "next/navigation";

import ItemDetailSection from "@/features/item/item-detail-section/item-detail-section";

import styles from "@/styles/component-styles.module.css";
import { Document } from "mongodb";
import { authClient, itemClient, userClient } from "@/utils/db";
import AddRemoveItemSection from "@/features/item/add-remove-item-section/add-remove-item-section";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import SignInButton from "@/ui/sign-in-button/sign-in-button";
import ReviewSection from "@/features/review/review-section/review-section";
import ErrorToast from "@/ui/error-toast/error-toast";
import { revalidatePath } from "next/cache";
import AverageRating, {
  AverageRatingSkeleton,
} from "@/ui/average-rating/average-rating";
import { Suspense } from "react";

interface ItemResult {
  item?: Document | null;
  error?: string;
}

async function getItemData(itemId: string): Promise<ItemResult> {
  const client = await itemClient;

  try {
    const item = await client
      ?.db()
      .collection("coffee")
      .findOne({ itemId }, { projection: { _id: 0 } });

    return { item };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Something went wrong" };
    }
  }
}

async function getCartQuantity(itemId: string, userId: string) {
  if (!userId) return;

  const client = await userClient;

  try {
    const userFilter = {
      userId,
      status: "pending",
    };

    const currentTransaction = await client
      ?.db()
      .collection("transaction")
      .findOne(userFilter);

    const quantity = currentTransaction?.items.reduce(
      (arr: number, cur: string) => (itemId === cur ? arr + 1 : arr),
      0
    );

    return { quantity: quantity || 0 };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Something went wrong" };
    }
  }
}

async function updateRecentlyViewed(userId: string, itemId: string) {
  if (!userId) return;

  const client = await authClient;

  try {
    await client
      ?.db()
      .collection("users")
      .findOneAndUpdate({ email: userId }, [
        {
          $set: {
            recentlyViewed: {
              $ifNull: [
                {
                  $concatArrays: [
                    "$recentlyViewed",
                    {
                      $cond: {
                        if: {
                          $in: [itemId, "$recentlyViewed"],
                        },
                        then: [],
                        else: [itemId],
                      },
                    },
                  ],
                },
                [itemId],
              ],
            },
          },
        },
        {
          $set: {
            recentlyViewed: {
              $cond: {
                if: {
                  $gt: [{ $size: "$recentlyViewed" }, 3],
                },
                then: { $slice: ["$recentlyViewed", -3] },
                else: "$recentlyViewed",
              },
            },
          },
        },
      ]);

    revalidatePath("/");

    return {};
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Something went wrong" };
    }
  }
}

interface ItemDetailPageProps {
  params: {
    itemId: string;
  };
}

export default async function ItemDetailPage({
  params: { itemId },
}: ItemDetailPageProps) {
  const itemDetail = await getItemData(itemId);

  if (!itemDetail.item) {
    notFound();
  }

  const session = await getServerSession(authOptions);

  let cartQuantity;
  if (session?.user?.email) {
    cartQuantity = await getCartQuantity(itemId, session.user.email);
    await updateRecentlyViewed(session.user.email, itemId);
  }

  const errors = [
    ...(itemDetail.error ? [itemDetail.error] : []),
    ...(cartQuantity?.error ? [cartQuantity.error] : []),
  ];

  return (
    <form className={styles.page}>
      <ErrorToast errors={errors} />
      <h1 className={`${styles.mainHeading} ${styles.heading}`}>
        {itemDetail.item.name}
      </h1>
      <Suspense fallback={<AverageRatingSkeleton />}>
        <AverageRating itemId={itemId} />
      </Suspense>
      <ItemDetailSection item={itemDetail.item} />
      {session?.user?.email ? (
        <AddRemoveItemSection
          item={itemDetail.item}
          currentQuantity={cartQuantity?.quantity}
        />
      ) : (
        <SignInButton>Sign In to Add to your Cart</SignInButton>
      )}
      <ReviewSection itemId={itemDetail.item.itemId} />
    </form>
  );
}
