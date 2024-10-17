"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./style.module.css";
import { FaArrowRight } from "react-icons/fa6";
import img1 from "../../image/0c53e62b-1333-49c1-b7dc-67799722b9d0 2.JPG";
import img2 from "../../image/9f8f2ef2-6cc7-4bfe-96e6-52c88302afaa 2.JPG";
import img3 from "../../image/5968f1d6-695a-4d48-a44c-691e6009dd42 2.JPG";
import img4 from "../../image/2c2bcdf3-53aa-4790-b836-477b46e0544b 4.JPG";
import img5 from "../../image/d81a68f1-400f-4541-b9df-64ec94ac4860 2.JPG";
import img6 from "../../image/fa04059d-2c50-4d3c-89a2-e819d95e45ea 2.JPG";
import img7 from "../..//image/25650424-a891-4dfb-8ecd-c95605567086 2.JPG";

import Image from "next/image";
export default function MainContent() {
  const images = [img1, img2, img3, img4, img5, img6, img7];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <section className={styles.mainhome}>
      <div className={styles.container}>
        <div className={styles.maintext}>
          <h5>Blaq kouture Collection</h5>
          <h1>
            New Blaq Kouture <br />
            Collection
          </h1>
          <p>
            Drip With Style <br />
            EST. 2024
          </p>

          <Link href="#" className={styles.mainbtn}>
            <span>Shop Now </span>
            <FaArrowRight />
          </Link>
        </div>

        <div className={styles.row}>
          <Image
            src={images[currentImageIndex]}
            alt="Display Image"
            className={styles.img}
            layout="responsive"
            width={600}
            height={400}
          />
        </div>
      </div>
    </section>
  );
}
