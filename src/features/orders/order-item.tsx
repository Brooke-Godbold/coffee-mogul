import { Document } from "mongodb";
import styles from "@/styles/component-styles.module.css";

interface OrderItemProps {
  order: Document;
}

interface OrderItem {
  name: string;
  quantity: number;
}

export default function OrderItem({ order }: OrderItemProps) {
  const date = new Date(order.created * 1000);

  return (
    <li className={styles.cardItem}>
      <div>{`Order Number: ${order.created}`}</div>
      {order.orderItems?.map((orderItem: OrderItem) => (
        <div
          key={orderItem.name}
        >{`${orderItem.name} x${orderItem.quantity}`}</div>
      ))}
      <div>{`Order Placed on ${date
        .toISOString()
        .replace(/T/, " ") // replace T with a space
        .replace(/\..+/, "")}`}</div>
      <div>{`Total Paid: £${parseInt(order.totalPrice) / 100}`}</div>
      <div>Status: Paid</div>
    </li>
  );
}
