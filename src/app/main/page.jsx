"use client";
import { useState, useEffect } from "react";
import ClientReviews from "@/components/clientreviews/page";
import Contact from "@/components/contact/page";
import FindBestCollection from "@/components/findbestcollection/page";
import Footer from "@/components/footer/page";
import MainContent from "@/components/maincontent/page";
import News from "@/components/news/page";
import Loader from "@/components/Loader";
import Header from "@/components/header/page";
import UniqueProduct from "@/components/uniqueproducts/page";

export default function Main() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <MainContent />
          <UniqueProduct title="All" />

          <ClientReviews />
          <FindBestCollection />
          <News />
          <Contact />
          <Footer />
        </>
      )}
    </>
  );
}
