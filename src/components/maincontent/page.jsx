"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./style.module.css";
import { FaArrowRight } from "react-icons/fa6";
import img2 from "../../image/IMG_82382345.png";
import img3 from "../../image/IMG_8238132153.png";
import Image from "next/image";
export default function MainContent() {
  const images = [img2, img3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

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
