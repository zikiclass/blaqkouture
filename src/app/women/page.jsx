"use client";
import { useEffect, useState } from "react";
import Banner from "@/components/banner/page";
import ClientReviews from "@/components/clientreviews/page";
import Contact from "@/components/contact/page";
import Footer from "@/components/footer/page";
import Header from "@/components/header/page";
import Loader from "@/components/Loader";
import News from "@/components/news/page";
import TrendingProducts from "@/components/trendingproducts/page";

export default function Women() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Banner text="Blaq Kouture" />
          <TrendingProducts />
          <ClientReviews />
          <News />
          <Contact />
          <Footer />
        </>
      )}
    </>
  );
}
