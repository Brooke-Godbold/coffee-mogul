"use client";

import { FaGoogle } from "react-icons/fa";
import styles from "./sign-in-button.module.css";
import { signIn, useSession } from "next-auth/react";

interface SignInButtonProps {
  children: React.ReactNode;
}

export default function SignInButton({ children }: SignInButtonProps) {
  const { data, status } = useSession();

  return (
    <>
      {data?.user?.email || status === "loading" ? null : (
        <button className={styles.signInButton} onClick={() => signIn()}>
          <span>{children}</span>
          <FaGoogle />
        </button>
      )}
    </>
  );
}
