import styles from "@/styles/component-styles.module.css";
import AddressItem from "../address-item/address-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { authClient } from "@/utils/db";
import { Document } from "mongodb";

async function getAddresses(userId: string) {
  const client = await authClient;

  try {
    const user = await client
      ?.db()
      .collection("users")
      .findOne({ email: userId }, { projection: { _id: 0 } });

    return {
      addresses: user?.addresses.sort(
        (a: { [key: string]: any }, b: { [key: string]: any }) =>
          a.addressId - b.addressId
      ),
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Something went wrong" };
    }
  }
}

export default async function AddressSection() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  const addressData = await getAddresses(session?.user?.email);

  return (
    <div className={styles.cardSection}>
      {addressData.addresses?.map((address: Document, i: number) => (
        <AddressItem key={`address_${i}`} address={address} />
      ))}
    </div>
  );
}
