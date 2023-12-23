"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

interface ErrorToastProps {
  error: string | undefined;
}

export default function ErrorToast({ error }: ErrorToastProps) {
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return <div style={{ position: "absolute" }} />;
}
