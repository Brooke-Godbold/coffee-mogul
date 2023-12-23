"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/component-styles.module.css";
import Modal from "@/ui/modal/modal";
import { useFormState } from "react-dom";
import { addReview } from "@/actions/addReview";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import RatingBar from "@/ui/rating-bar/rating-bar";
import { Document } from "mongodb";
import useFormErrors from "@/hooks/useFormErrors";
import ModalForm from "@/ui/form/modal-form/modal-form";
import FormInput from "@/ui/form/form-input/form-input";
import FormTextarea from "@/ui/form/form-textarea/form-textarea";

interface ReviewModalProps {
  itemId: string;
  existingReview?: Document;
}

export default function ReviewModal({
  itemId,
  existingReview,
}: ReviewModalProps) {
  return (
    <Modal>
      <Modal.Open opens="new-review">
        <button>{existingReview ? "Edit Review" : "Leave a Review!"}</button>
      </Modal.Open>
      <Modal.Window name="new-review">
        <ReviewForm itemId={itemId} existingReview={existingReview} />
      </Modal.Window>
    </Modal>
  );
}

interface ReviewFormProps {
  onCloseModal?: Function;
  itemId: string;
  existingReview?: Document;
}

function ReviewForm({ onCloseModal, itemId, existingReview }: ReviewFormProps) {
  const { data } = useSession();
  const [rating, setRating] = useState(existingReview?.rating || 0);

  const [formState, addReviewAction] = useFormState(
    addReview.bind(null, { itemId, userId: data?.user?.email, rating }),
    { errors: {} }
  );

  useFormErrors(formState, onCloseModal, "Successfully Added Review!");

  return (
    <ModalForm submitAction={addReviewAction} title="Add a Review">
      <div className={styles.formSection}>
        <label>Rating</label>
        <RatingBar rating={rating} setRating={setRating} />
      </div>
      <FormInput
        label="Title"
        name="title"
        errors={formState.errors}
        defaultValue={existingReview?.title}
      />
      <FormTextarea
        label="Content"
        name="content"
        errors={formState.errors}
        defaultValue={existingReview?.content}
      />
    </ModalForm>
  );
}
