import styles from "./review-section.module.css";
import componentStyles from "@/styles/component-styles.module.css";
import ReviewButton from "../review-button/review-button";
import ReviewItem from "../review-item/review-item";
import { itemClient } from "@/utils/db";
import UsernameWidget from "@/ui/username-widget/username-widget";

async function getReviews(itemId: string) {
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

interface ReviewSectionProps {
  itemId: string;
}

export default async function ReviewSection({ itemId }: ReviewSectionProps) {
  const reviews = await getReviews(itemId);

  return (
    <div className={styles.reviewSection}>
      <ReviewButton itemId={itemId} />
      <h2
        className={`${componentStyles.subHeading} ${componentStyles.heading}`}
      >
        Reviews
      </h2>
      <div className={styles.reviewsContainer}>
        {reviews.reviewsList?.length ?? 0 > 0 ? (
          reviews.reviewsList?.map((review) => (
            <ReviewItem key={review.title} review={review}>
              <UsernameWidget userId={review.userId} />
            </ReviewItem>
          ))
        ) : (
          <div>No reviews for this item currently</div>
        )}
      </div>
    </div>
  );
}
