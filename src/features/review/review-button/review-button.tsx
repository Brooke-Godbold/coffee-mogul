import { authOptions } from "@/auth";
import { itemClient, userClient } from "@/utils/db";
import { getServerSession } from "next-auth";
import ReviewModal from "../review-modal/review-modal";

async function getUserHasBoughtItem(userId: string, itemId: string) {
  const client = await userClient;

  try {
    const transaction = await client
      ?.db()
      .collection("transaction")
      .findOne(
        { userId, status: "success", items: { $in: [itemId] } },
        { projection: { _id: 0 } }
      );

    return { transactionFound: transaction ? true : false };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Something went wrong" };
    }
  }
}

async function getUserReview(userId: string, itemId: string) {
  const client = await itemClient;

  try {
    const existingReview = await client
      ?.db()
      .collection("review")
      .findOne({ userId, itemId }, { projection: { _id: 0 } });

    return { existingReview };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Something went wrong" };
    }
  }
}

interface ReviewButtonProps {
  itemId: string;
}

export default async function ReviewButton({ itemId }: ReviewButtonProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  const transactionStatus = await getUserHasBoughtItem(
    session.user.email,
    itemId
  );
  const reviewStatus = await getUserReview(session.user.email, itemId);

  return (
    <div>
      {transactionStatus.transactionFound && (
        <ReviewModal
          itemId={itemId}
          existingReview={reviewStatus.existingReview || undefined}
        />
      )}
    </div>
  );
}
