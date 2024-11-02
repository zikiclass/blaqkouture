"use client";
import styles from "../trendingproducts/style.module.css";
import Product from "../product";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function UniqueProduct({ title }) {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const fetchLatestProducts = async () => {
    try {
      let response;
      if (title === "All") {
        response = await axios.get(`/api/product`);
      } else if (title === "Men's") {
        response = await axios.get(`/api/product/men/allmen`);
      } else if (title === "Women's") {
        response = await axios.get(`/api/product/women/allwomen`);
      }
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
  };

  return (
    <section className={styles.trendingproducts}>
      <div className={styles.centertext}>
        <h2>
          {title || "Our Trending"}{" "}
          <span className={styles.collection}>Collections</span>
        </h2>
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
