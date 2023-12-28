import Link from "next/link";
import styles from "./mobile-navigation-menu.module.css";
import HeaderAuth from "@/ui/header-auth/header-auth";

interface MobileNavigationMenuProps {
  setMenuActive: Function;
}

export default function MobileNavigationMenu({
  setMenuActive,
}: MobileNavigationMenuProps) {
  return (
    <>
      <div className={styles.overlay} />
      <ul className={styles.navigationMenu}>
        <h2>Menu</h2>
        <li>
          <button
            className={styles.backButton}
            onClick={() => setMenuActive(false)}
          >
            Back
          </button>
        </li>
        <li>
          <Link onClick={() => setMenuActive(false)} href="/">
            Home
          </Link>
        </li>
        <HeaderAuth onClickFunc={setMenuActive} />
      </ul>
    </>
  );
}
