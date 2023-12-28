import Link from "next/link";
import styles from "./footer.module.css";

import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinksGrid}>
        <nav className={styles.footerLinkSection}>
          <h4>Company</h4>
          <ul className={styles.footerLinks}>
            <li>
              <Link href="/">Careers</Link>
            </li>
            <li>
              <Link href="/">Abous Us</Link>
            </li>
            <li>
              <Link href="/">Contact</Link>
            </li>
          </ul>
        </nav>
        <nav className={styles.footerLinkSection}>
          <h4>Support</h4>
          <ul className={styles.footerLinks}>
            <li>
              <Link href="/">Payments</Link>
            </li>
            <li>
              <Link href="/">Deliveries & Orders</Link>
            </li>
            <li>
              <Link href="/">Profile</Link>
            </li>
            <li>
              <Link href="/">FAQs</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.footerBottomGrid}>
        <ul className={styles.legal}>
          <li>
            <Link href="/">Terms & Conditions</Link>
          </li>
          <li>
            <Link href="/">Privacy</Link>
          </li>
          <li>
            <Link href="/">Cookies</Link>
          </li>
          <li>
            <Link href="/">Legal</Link>
          </li>
        </ul>
        <div className={styles.copyright}>
          Copyright&copy; 2018-2023 CoffeeMogul. All rights reserved.
        </div>
        <ul className={styles.social}>
          <li>
            <Link href="/">
              <FaFacebook />
            </Link>
          </li>
          <li>
            <Link href="/">
              <FaInstagram />
            </Link>
          </li>
          <li>
            <Link href="/">
              <FaXTwitter />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
