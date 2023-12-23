import Spinner from "../spinner/spinner";
import styles from "./skeleton.module.css";

export default function LoadingSkeleton() {
  return (
    <div className={styles.skeleton}>
      <Spinner />
    </div>
  );
}
