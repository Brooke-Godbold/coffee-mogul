"use client";

import { SyntheticEvent, useState } from "react";
import styles from "./review-item.module.css";
import { FaChevronDown } from "react-icons/fa";
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
    <div className={styles.reviewItem}>
      <button onClick={handleOpenReview} className={styles.reviewOpenButton}>
        <FaChevronDown />
      </button>
      <h3>{review.title}</h3>
      <RatingBar rating={review.rating} />
      {children}
      {isOpen && <div className={styles.reviewContent}>{review.content}</div>}
    </div>
  );
}
