"use client";

import { SyntheticEvent, useState } from "react";
import styles from "./review-item.module.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Document } from "mongodb";
import RatingBar from "@/ui/rating-bar/rating-bar";

interface ReviewItemProps {
  review: Document;
  children: React.ReactNode;
}

export default function ReviewItem({ review, children }: ReviewItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenReview(e: SyntheticEvent) {
    e.preventDefault();

    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <li className={styles.reviewItem}>
      <button onClick={handleOpenReview} className={styles.reviewOpenButton}>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      <h3>{review.title}</h3>
      <RatingBar rating={review.rating} />
      {children}
      <article
        className={
          isOpen
            ? `${styles.reviewContent}`
            : `${styles.reviewContent} ${styles.closed}`
        }
      >
        {review.content}
      </article>
    </li>
  );
}
