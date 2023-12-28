import Link from "next/link";
import styles from "./footer.module.css";

import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinksGrid}>
        <div className={styles.footerLinkSection}>
          <h4>Company</h4>
          <div className={styles.footerLinks}>
            <Link href="/">Careers</Link>
            <Link href="/">Abous Us</Link>
            <Link href="/">Contact</Link>
          </div>
        </div>
        <div className={styles.footerLinkSection}>
          <h4>Support</h4>
          <div className={styles.footerLinks}>
            <Link href="/">Payments</Link>
            <Link href="/">Deliveries & Orders</Link>
            <Link href="/">Profile</Link>
            <Link href="/">FAQs</Link>
          </div>
        </div>
      </div>
      <div className={styles.footerBottomGrid}>
        <div className={styles.legal}>
          <Link href="/">Terms & Conditions</Link>
          <Link href="/">Privacy</Link>
          <Link href="/">Cookies</Link>
          <Link href="/">Legal</Link>
        </div>
        <div className={styles.copyright}>
          Copyright&copy; 2018-2023 CoffeeMogul. All rights reserved.
        </div>
        <div className={styles.social}>
          <FaFacebook />
          <FaInstagram />
          <FaXTwitter />
        </div>
      </div>
    </footer>
  );
}
