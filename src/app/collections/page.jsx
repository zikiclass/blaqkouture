"use client";
import { useEffect, useState } from "react";
import Banner from "@/components/banner/page";
import ClientReviews from "@/components/clientreviews/page";
import Contact from "@/components/contact/page";
import Footer from "@/components/footer/page";
import News from "@/components/news/page";
import Header from "@/components/header/page";
import Loader from "@/components/Loader";
import UniqueProduct from "@/components/uniqueproducts/page";

export default function Collections() {
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, []);
  return (
    // <>
    //   {loading ? (
    //     <Loader />
    //   ) : (
    <>
      <Header />
      <Banner text="Blaq Kouture" />
      <UniqueProduct title="All" />
      <ClientReviews />
      <News />
      <Contact />
      <Footer />
    </>
    //   )}
    // </>
  );
}
