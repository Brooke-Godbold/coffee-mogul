import styles from "./review-section.module.css";
import componentStyles from "@/styles/component-styles.module.css";
import ReviewButton from "../review-button/review-button";
import ReviewItem from "../review-item/review-item";
import UsernameWidget from "@/ui/username-widget/username-widget";
import ErrorToast from "@/ui/error-toast/error-toast";
import { getReviews } from "@/utils/db/get-reviews";

interface ReviewSectionProps {
  itemId: string;
}

export default async function ReviewSection({ itemId }: ReviewSectionProps) {
  const reviews = await getReviews(itemId);

  return (
    <div className={styles.reviewSection}>
      <ErrorToast errors={reviews.error ? [reviews.error] : []} />
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
