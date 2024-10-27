"use client";
import { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import Contact from "@/components/contact/page";
import Footer from "@/components/footer/page";
import Header from "@/components/header/page";
import Loader from "@/components/Loader";
import axios from "axios";
import styles from "./styles.module.css";
import SearchParamsWrapper from "../blaq_/admin/components/suspensewrap";
export default function Men() {
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const getnews = async () => {
      try {
        const response = await axios.get(`/api/news/unique?id=${id}`);
        if (response.data) setNewsList(response.data);
      } catch (error) {}
    };

    getnews();
  }, [id]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <SearchParamsWrapper>
            {(id) => {
              setId(id);
              return (
                <>
                  <Header />
                  <section className={styles.wrapper}>
                    <CldImage
                      src={newsList.image}
                      width={150}
                      height={150}
                      alt="News"
                      className={styles.banner}
                    />
                    <span>{newsList.date}</span>
                    <h2>{newsList.headline}</h2>
                    <p>{newsList.content1}</p>
                    <p>{newsList.content2}</p>
                    <p>{newsList.content3}</p>
                  </section>
                  <Contact />
                  <Footer />
                </>
              );
            }}
          </SearchParamsWrapper>
        </>
      )}
    </>
  );
}
