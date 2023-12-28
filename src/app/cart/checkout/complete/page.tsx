import paths from "@/paths";
import componentStyles from "@/styles/component-styles.module.css";
import styles from "./styles.module.css";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function CheckoutCompletePage() {
  return (
    <div className={componentStyles.page}>
      <h1
        className={`${componentStyles.mainHeading} ${componentStyles.heading}`}
      >
        Thank you for your Order!
      </h1>
      <div className={styles.content}>
        <p>You can check the status of your Order under the Orders Page</p>
        <Link className={styles.ordersLink} href={paths.ordersPath()}>
          Go to my Orders
        </Link>
      </div>
    </div>
  );
}
