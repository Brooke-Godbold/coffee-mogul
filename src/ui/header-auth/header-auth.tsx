"use client";

import { signOut, useSession } from "next-auth/react";
import Spinner from "../spinner/spinner";
import styles from "./header-auth.module.css";
import SignInButton from "../sign-in-button/sign-in-button";
import Link from "next/link";
import paths from "@/paths";

interface HeaderAuthProps {
  onClickFunc?: Function;
}

export default function HeaderAuth({ onClickFunc }: HeaderAuthProps) {
  const { status } = useSession();

  return (
    <form className={styles.authSection}>
      {status === "loading" ? (
        <Spinner />
      ) : status === "authenticated" ? (
        <ul>
          <li>
            <Link onClick={() => onClickFunc?.()} href={paths.cartPath()}>
              Cart
            </Link>
          </li>
          <li>
            <Link onClick={() => onClickFunc?.()} href={paths.ordersPath()}>
              Orders
            </Link>
          </li>
          <li>
            <Link onClick={() => onClickFunc?.()} href={paths.addressesPath()}>
              Addresses
            </Link>
          </li>
          <li>
            <button type="button" onClick={() => signOut()}>
              Sign Out
            </button>
          </li>
        </ul>
      ) : (
        <SignInButton>Sign In</SignInButton>
      )}
    </form>
  );
}
