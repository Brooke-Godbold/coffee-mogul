import { getReviews } from "@/utils/db/get-reviews";
import { Document } from "mongodb";
import RatingBar from "../rating-bar/rating-bar";
import styles from "./average-rating.module.css";
import Spinner from "../spinner/spinner";

interface AverageRatingProps {
  itemId: string;
}

export default async function AverageRating({ itemId }: AverageRatingProps) {
  const reviews = await getReviews(itemId);

  const ratings = reviews.reviewsList?.map((review: Document) => review.rating);

  if (!ratings || ratings.length === 0) {
    return null;
  }

  const total = ratings?.reduce((arr, cur) => arr + cur, 0);

  return (
    <div className={styles.averageRating}>
      <span>Average Rating: </span>
      <RatingBar rating={total / ratings.length} />
    </div>
  );
}

export function AverageRatingSkeleton() {
  return (
    <div className={styles.averageRating}>
      <Spinner />
    </div>
  );
}
