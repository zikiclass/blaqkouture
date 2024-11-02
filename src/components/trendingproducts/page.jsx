"use client";
import styles from "./style.module.css";
import Product from "../product";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function TrendingProducts({ title }) {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const fetchLatestProducts = async () => {
    try {
      const response = await axios.get(`/api/product/latestproducts`);
      if (response.data) {
        setProducts(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchLatestProducts();
  }, []);

  const [active, setActive] = useState("new");
  const handleClick = (data) => {
    setActive(data);

    const fetchOtherProducts = async (data) => {
      try {
        const response = await axios.get(`/api/product/${data}`);
        if (response.data) {
          setProducts(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (data === "men") {
      fetchOtherProducts("men");
    } else if (data === "new") {
      fetchLatestProducts();
    } else if (data === "women") {
      fetchOtherProducts("women");
    }
  };

  return (
    <section className={styles.trendingproducts}>
      <div className={styles.centertext}>
        <h2>
          {title || "Our Trending"}{" "}
          <span className={styles.collection}>Collections</span>
        </h2>
        <div>
          <span
            className={active === "new" && styles.active}
            onClick={() => handleClick("new")}
          >
            Latest
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
        {products.length > 0 ? (
          products.map((pro) => (
            <Product
              img={pro.img1}
              key={pro.productId}
              amt={pro.price}
              title={pro.title}
              prevAmt={pro.overprice}
              sale={pro.stockquantity}
              productId={pro.productId}
            />
          ))
        ) : (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Getting collections...</p>
          </div>
        )}
      </div>
    </section>
  );
}
