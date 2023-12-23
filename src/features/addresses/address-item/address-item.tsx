import styles from "@/styles/component-styles.module.css";
import { Document } from "mongodb";
import AddressModal from "../address-modal/address-modal";

interface AddressItemProps {
  address: Document;
}

export default function AddressItem({ address }: AddressItemProps) {
  return (
    <div className={styles.cardItem}>
      <div>{address.name}</div>
      <div>{address.address.line1}</div>
      {address.address.line2 && <div>{address.address.line2}</div>}
      <div>{address.address.city}</div>
      <div>{address.address.state}</div>
      <div>{address.address.postal_code}</div>
      <AddressModal existingAddress={address} />
    </div>
  );
}
