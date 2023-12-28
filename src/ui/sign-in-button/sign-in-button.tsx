"use client";

import { FaGoogle } from "react-icons/fa";
import styles from "./sign-in-button.module.css";
import { signIn, useSession } from "next-auth/react";
import SpinnerMini from "../spinner/spinner-mini";

interface SignInButtonProps {
  children: React.ReactNode;
}

export default function SignInButton({ children }: SignInButtonProps) {
  const { status } = useSession();

  return (
    <button
      className={styles.signInButton}
      type="button"
      onClick={() => signIn("google")}
    >
      {status !== "loading" ? (
        <>
          <span>{children}</span>
          <FaGoogle />
        </>
      ) : (
        <SpinnerMini />
      )}
    </button>
  );
}
