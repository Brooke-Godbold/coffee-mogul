import styles from "./sale.module.css";

interface SaleProps {
  saleValue: number;
  price: number;
}

export default function Sale({ saleValue, price }: SaleProps) {
  const newPrice = ((price / 100) * saleValue) / 100;

  return (
    <div className={styles.sale}>
      <span className={styles.saleTag}>
        <label className={styles.saleTagLabel}>SALE</label>
        <p>{`${saleValue}% off!`}</p>
      </span>
      <h4 className={styles.salePrice}>{`£${newPrice.toFixed(2)}`}</h4>
    </div>
  );
}
