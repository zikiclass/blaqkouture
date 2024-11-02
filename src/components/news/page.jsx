"use client";
import { useState, useEffect } from "react";
import styles from "./style.module.css";
import img1 from "../../image/bl-1.png";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
export default function News() {
  const [newUpdate, setNewUpdate] = useState([]);
  const getUpdates = async () => {
    const response = await axios.get(`/api/news`);
    if (response.data) setNewUpdate(response.data);
  };
  useEffect(() => {
    getUpdates();
  }, []);

  const truncateText = (text, length) => {
    if (!text) return "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };
  return (
    <section className={styles.updatenews}>
      {newUpdate.length > 0 && (
        <>
          <div className={styles.upcentertext}>
            <h2>New Updates</h2>
          </div>
          <div className={styles.updatecart}>
            {newUpdate.map((news, index) => (
              <div className={styles.cart} key={index}>
                {news.image ? (
                  <CldImage
                    src={news.image}
                    width={150}
                    height={150}
                    className={styles.img}
                    alt="Client Image"
                  />
                ) : (
                  <Image src={img1} className={styles.img} alt="News Updates" />
                )}{" "}
                <h5>{news.date}</h5>
                <h4>{news.headline}</h4>
                <p>{truncateText(news.content1, 100)}</p>
                <h6>
                  <Link href={`/uniq_news?id=${news.id}`}>
                    Continue Reading...
                  </Link>
                </h6>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
