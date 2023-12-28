import Image from "next/image";
import styles from "./item-detail-section.module.css";
import componentStyles from "@/styles/component-styles.module.css";
import { Document } from "mongodb";

interface ItemDetailProps {
  item: Document;
}

export default function ItemDetailSection({ item }: ItemDetailProps) {
  return (
    <div className={styles.itemDetailsSection}>
      <div className={`${styles.itemDetailsImage} ${componentStyles.edgeFade}`}>
        <Image src={item.image} alt={item.name} width={500} height={500} />
      </div>
      <div className={styles.itemInformationBlock}>{`£${
        item.price / 100
      }`}</div>
      <div className={styles.itemInformationBlock}>{item.description}</div>
      <div className={styles.itemInformationBlock}>
        {item.nutritionInformation.map((nutrition: string, i: number) => (
          <div key={`nutition_${i}`}>{nutrition}</div>
        ))}
      </div>
      <div className={styles.itemInformationBlock}>
        {item.productInformation.map((product: string, i: number) => (
          <div key={`product_${i}`}>{product}</div>
        ))}
      </div>
    </div>
  );
}
