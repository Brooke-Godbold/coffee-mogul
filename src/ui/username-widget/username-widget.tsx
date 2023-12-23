"use server";

import { authClient } from "@/utils/db";
import styles from "./username-widget.module.css";
import Image from "next/image";

async function getUserDetails(userId: string) {
  const client = await authClient;

  try {
    const user = await client
      ?.db()
      .collection("users")
      .findOne({ email: userId }, { projection: { _id: 0 } });

    return { user };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Something went wrong" };
    }
  }
}

interface UsernameWidgetProps {
  userId: string;
}

export default async function UsernameWidget({ userId }: UsernameWidgetProps) {
  const userDetails = await getUserDetails(userId);

  return (
    <div className={styles.usernameWidget}>
      <div className={styles.userImage}>
        <Image
          src={userDetails.user?.image}
          alt={userDetails.user?.name}
          width={50}
          height={50}
        />
      </div>
      <div className={styles.userName}>{userDetails.user?.name}</div>
    </div>
  );
}
