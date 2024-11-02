"use client";
import { useState, useEffect } from "react";
import styles from "./style.module.css";
import imgClient from "../../image/bl-3.png";
import Image from "next/image";
import axios from "axios";
import { CldImage } from "next-cloudinary";
export default function ClientReviews() {
  const [reviews, setReviews] = useState([]);
  const getReview = async () => {
    const response = await axios.get(`/api/feedback`);
    if (response.data) setReviews(response.data);
  };
  useEffect(() => {
    getReview();
  }, []);
  return (
    <section className={styles.clientreviews}>
      {reviews.length > 0 && (
        <>
          <h3>Client Reviews</h3>
          <div className={styles.rev}>
            {reviews.map((review, index) => (
              <div className={styles.reviews} key={index}>
                {review.image ? (
                  <CldImage
                    src={review.image}
                    width={150}
                    height={150}
                    className={styles.img}
                    alt="Client Image"
                  />
                ) : (
                  <Image
                    src={imgClient}
                    className={styles.img}
                    alt="Client Image"
                  />
                )}

                <p>{review.content}</p>
                <h2>{review.name}</h2>
                <p>{review.position}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
