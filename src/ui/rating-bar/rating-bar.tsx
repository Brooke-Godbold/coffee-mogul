"use client";

import { PiCoffeeFill, PiCoffeeLight } from "react-icons/pi";
import styles from "./rating-bar.module.css";
import { SyntheticEvent, useState } from "react";

interface RatingBarProps {
  rating: number;
  setRating?: (val: number) => void;
}

export default function RatingBar({ rating, setRating }: RatingBarProps) {
  const [ratingBuffer, setRatingBuffer] = useState<number | null>(null);

  function handleRating(e: SyntheticEvent, newRating: number) {
    e.preventDefault();
    setRating?.(newRating);
  }

  function handleSetRatingBuffer(newRating: number) {
    if (setRating) {
      setRatingBuffer(newRating);
    }
  }

  function handleResetRatingBuffer() {
    if (setRating) {
      setRatingBuffer(null);
    }
  }

  return (
    <div>
      <div className={styles.ratingBar}>
        {[...Array(10)].map((e, i) => (
          <button
            className={
              setRating
                ? `${styles.ratingButton}`
                : `${styles.ratingButton} ${styles.nonEditable}`
            }
            style={{ transform: `translateX(${-9 * i}px)` }}
            onClick={(e) => handleRating(e, i + 1)}
            onMouseEnter={() => handleSetRatingBuffer(i + 1)}
            onMouseLeave={handleResetRatingBuffer}
            key={i + 1}
          >
            {ratingBuffer ? (
              ratingBuffer > i ? (
                <PiCoffeeFill />
              ) : (
                <PiCoffeeLight />
              )
            ) : rating > i ? (
              <PiCoffeeFill />
            ) : (
              <PiCoffeeLight />
            )}
          </button>
        ))}
      </div>
      <div
        className={`${styles.ratingNumber} ${!setRating ? "" : styles.hidden}`}
      >{`${rating} / 10`}</div>
      <select
        className={`${styles.ratingSelect} ${setRating ? "" : styles.hidden}`}
        value={rating}
        onChange={(e) => setRating?.(parseInt(e.target.value))}
      >
        {[...Array(10)].map((e, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
}
