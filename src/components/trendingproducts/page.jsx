"use client";
import styles from "./style.module.css";
import img1 from "../../image/1.jpg";
import img2 from "../../image/2.jpg";
import img3 from "../../image/3.jpg";
import img4 from "../../image/4.jpg";
import img5 from "../../image/5.jpg";
import img6 from "../../image/6.jpg";
import img7 from "../../image/7.jpg";
import img8 from "../../image/8.jpg";
import Product from "../product";
import { useState } from "react";
export default function TrendingProducts() {
  const products = [img1, img2, img3, img4, img5, img6, img7, img8];
  const [active, setActive] = useState("new");
  const handleClick = (data) => {
    setActive(data);
  };

  return (
    <section className={styles.trendingproducts}>
      <div className={styles.centertext}>
        <h2>
          Our Trending <span className={styles.collection}>Collections</span>
        </h2>
        <div>
          <span
            className={active === "new" && styles.active}
            onClick={() => handleClick("new")}
          >
            New
          </span>
          <span
            className={active === "all" && styles.active}
            onClick={() => handleClick("all")}
          >
            All
          </span>
          <span
            className={active === "men" && styles.active}
            onClick={() => handleClick("men")}
          >
            Men
          </span>
          <span
            className={active === "women" && styles.active}
            onClick={() => handleClick("women")}
          >
            Women
          </span>
        </div>
      </div>
      <div className={styles.products}>
        {products.map((pro) => (
          <Product img={pro} key={pro} />
        ))}
      </div>
    </section>
  );
}
