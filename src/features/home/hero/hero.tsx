import Image from "next/image";
import styles from "./hero.module.css";
import componentStyles from "@/styles/component-styles.module.css";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={`${styles.heroImage} ${componentStyles.edgeFade}`}>
        <Image
          src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=3737&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Making Coffee"
          height={400}
          width={700}
        />
      </div>
      <h2 className={styles.heroTitle}>Coffee Mogul</h2>
      <div className={styles.heroText}>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          accusamus quasi, aut, optio assumenda necessitatibus harum blanditiis
          dolorum a maiores similique nobis placeat repellendus.
        </span>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          accusamus quasi, aut, optio assumenda necessitatibus harum blanditiis
          dolorum a maiores similique nobis placeat repellendus. Molestias
          tempora sit minus beatae voluptates. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Incidunt accusamus quasi, aut, optio
          assumenda necessitatibus harum blanditiis dolorum a maiores similique
          nobis placeat repellendus.
        </span>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          accusamus quasi, aut, optio assumenda necessitatibus harum.
        </span>
      </div>
    </div>
  );
}
