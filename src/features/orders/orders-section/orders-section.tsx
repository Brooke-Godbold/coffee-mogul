import { authOptions } from "@/auth";
import OrderItem from "@/features/orders/order-item";
import { userClient } from "@/utils/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import styles from "@/styles/component-styles.module.css";
import ErrorToast from "@/ui/error-toast/error-toast";

async function getHistoricalTransactions(userId: string) {
  const client = await userClient;

  try {
    const transactions = await client
      ?.db()
      .collection("transaction")
      .find(
        { userId, status: "success" },
        { projection: { _id: 0 }, sort: { created: -1 } }
      )
      .toArray();

    return { transactions: transactions || [] };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Something went wrong" };
    }
  }
}

export default async function OrdersSection() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/");
  }

  const orders = await getHistoricalTransactions(session.user.email);

  return (
    <div className={styles.cardSection}>
      <ErrorToast errors={orders.error ? [orders.error] : []} />
      {orders.transactions?.map((order, i) => (
        <OrderItem key={`order_${i}`} order={order} />
      ))}
    </div>
  );
}
