"use client";

import paths from "@/paths";
import Link from "next/link";
import componentStyles from "@/styles/component-styles.module.css";

interface HeaderProductsProps {
  onClickFunc?: Function;
}

export default function HeaderProducts({ onClickFunc }: HeaderProductsProps) {
  return (
    <nav>
      <ul>
        <li>
          <Link
            className={componentStyles.link}
            onClick={() => onClickFunc?.(false)}
            href={paths.productsPath()}
          >
            All Coffees
          </Link>
        </li>
      </ul>
    </nav>
  );
}
