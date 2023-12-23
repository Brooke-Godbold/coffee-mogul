"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

interface ErrorToastProps {
  errors: string[];
}

export default function ErrorToast({ errors }: ErrorToastProps) {
  useEffect(() => {
    errors.map((error) => toast.error(error));
  }, [errors]);

  return <div style={{ position: "absolute" }} />;
}
