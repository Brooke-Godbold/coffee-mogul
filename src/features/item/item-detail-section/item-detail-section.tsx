import Image from "next/image";
import styles from "./item-detail-section.module.css";
import componentStyles from "@/styles/component-styles.module.css";
import { Document } from "mongodb";

interface ItemDetailProps {
  item: Document;
}

export default function ItemDetailSection({ item }: ItemDetailProps) {
  let backgroundColor;
  switch (item.roast) {
    case "light":
      backgroundColor = 400;
      break;
    case "medium":
      backgroundColor = 600;
      break;
    case "dark":
      backgroundColor = 800;
      break;
    default:
      backgroundColor = 600;
  }

  return (
    <section className={styles.itemDetailsSection}>
      <figure
        className={`${styles.itemDetailsImage} ${componentStyles.edgeFade}`}
      >
        <Image
          src={item.image}
          alt={item.name}
          width={500}
          height={500}
          layout="responsive"
        />
      </figure>
      <div
        className={`${styles.itemInformationBlock} ${styles.price} ${styles.sectionBorder}`}
      >
        <h3>Price</h3>
        <p>{`£${item.price / 100}`}</p>
      </div>
      <article
        className={`${styles.itemInformationBlock} ${styles.about} ${styles.sectionBorder}`}
      >
        <h3>{`About ${item.name}`}</h3>
        <p>{item.description}</p>
        <div>
          <span
            className={styles.roastTag}
            style={{ backgroundColor: `var(--color-brand-${backgroundColor})` }}
          >
            {`${item.roast.charAt(0).toUpperCase()}${item.roast.slice(
              1
            )} Roast`}
          </span>
        </div>
      </article>
      <aside
        className={`${styles.itemInformationBlock} ${styles.nutritionInformation} ${styles.sectionBorder}`}
      >
        <h3>Nutrition</h3>
        <ul>
          {item.nutritionInformation.map((nutrition: string, i: number) => (
            <li key={`nutition_${i}`}>{nutrition}</li>
          ))}
        </ul>
      </aside>
      <aside
        className={`${styles.itemInformationBlock} ${styles.productInformation}`}
      >
        <h3>Product Information</h3>
        <ul>
          {item.productInformation.map((product: string, i: number) => (
            <li key={`product_${i}`}>{product}</li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
