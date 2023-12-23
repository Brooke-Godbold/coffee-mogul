"use server";

import { FormState } from "@/hooks/useFormErrors";
import paths from "@/paths";
import { itemClient } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const addReviewSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must have at least 5 characters" }),
  content: z
    .string()
    .min(50, { message: "COntent must have at least 50 characters" }),
});

interface ReviewData {
  itemId: string;
  userId: string | null | undefined;
  rating: number;
}

export async function addReview(
  reviewData: ReviewData,
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  if (!reviewData.userId) {
    return {
      errors: {
        _form: ["You must sign in to do this."],
      },
    };
  }

  if (reviewData.rating < 1) {
    return {
      errors: {
        _form: ["You must give a rating."],
      },
    };
  }

  const result = addReviewSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const client = await itemClient;

  try {
    await client
      ?.db()
      .collection("review")
      .replaceOne(
        { userId: reviewData.userId, itemId: reviewData.itemId },
        {
          itemId: reviewData.itemId,
          userId: reviewData.userId,
          title: formData.get("title"),
          content: formData.get("content"),
          rating: reviewData.rating,
        },
        { upsert: true }
      );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    } else {
      return { errors: { _form: ["Something went wrong"] } };
    }
  }

  revalidatePath(paths.itemDetailPath(reviewData.itemId));
  return {
    errors: {},
    success: true,
  };
}
