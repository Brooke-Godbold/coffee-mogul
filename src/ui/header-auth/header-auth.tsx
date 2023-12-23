"use client";

import { signOut, useSession } from "next-auth/react";
import Spinner from "../spinner/spinner";
import styles from "./header-auth.module.css";
import SignInButton from "../sign-in-button/sign-in-button";
import Link from "next/link";
import paths from "@/paths";

export default function HeaderAuth() {
  const { status } = useSession();

  return (
    <form className={styles.authSection}>
      {status === "loading" ? (
        <Spinner />
      ) : status === "authenticated" ? (
        <>
          <button onClick={() => signOut()}>Sign Out</button>
          <Link href={paths.ordersPath()}>Orders</Link>
          <Link href={paths.addressesPath()}>Addresses</Link>
        </>
      ) : (
        <SignInButton>Sign In</SignInButton>
      )}
    </form>
  );
}
