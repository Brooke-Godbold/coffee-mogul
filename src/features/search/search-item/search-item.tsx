import Image from "next/image";
import styles from "./search-item.module.css";
import componentStyles from "@/styles/component-styles.module.css";
import Link from "next/link";
import { Document } from "mongodb";
import { salePrice } from "@/utils/price";

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
        <div className={styles.priceSection}>
          <h5
            className={
              item.sale
                ? `${styles.searchItemPrice} ${styles.saleStrike}`
                : styles.searchItemPrice
            }
          >{`£${item.price / 100}`}</h5>
          {item.sale && (
            <h5 className={styles.salePrice}>{`£${(
              salePrice(item) / 100
            ).toFixed(2)}`}</h5>
          )}
        </div>
      </Link>
    </li>
  );
}
