import { Document } from "mongodb";
import styles from "./product-section.module.css";
import SearchItem from "@/features/search/search-item/search-item";

interface ProductSectionProps {
  items: Document[];
}

export default function ProductSection({ items }: ProductSectionProps) {
  return (
    <ul className={styles.productSection}>
      {items.map((item) => (
        <SearchItem key={item.itemId} item={item} />
      ))}
    </ul>
  );
}
