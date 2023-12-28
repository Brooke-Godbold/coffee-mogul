import Image from "next/image";
import styles from "./search-item.module.css";
import componentStyles from "@/styles/component-styles.module.css";
import Link from "next/link";
import { Document } from "mongodb";

interface SearchItemProps {
  item: Document;
}

export default function SearchItem({ item }: SearchItemProps) {
  return (
    <li>
      <Link
        key={item.itemId}
        href={`/item/${item.itemId}`}
        className={styles.searchItem}
      >
        <div
          className={`${styles.searchItemImage} ${componentStyles.edgeFade}`}
        >
          <Image src={item.image} alt={item.name} width={200} height={200} />
        </div>
        <h4 className={styles.searchItemTitle}>{item.name}</h4>
        <h5 className={styles.searchItemPrice}>{`£${item.price / 100}`}</h5>
      </Link>
    </li>
  );
}
