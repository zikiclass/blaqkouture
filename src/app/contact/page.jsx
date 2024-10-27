"use client";
import { useEffect, useState } from "react";
import Banner from "@/components/banner/page";
import Contact from "@/components/contact/page";
import Footer from "@/components/footer/page";
import GetInTouch from "@/components/getintouch/page";
import Loader from "@/components/Loader";
import Header from "@/components/header/page";

export default function ContactUs() {
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
      <Banner text="Contact Us" />
      <GetInTouch />

      <Contact />
      <Footer />
    </>
    //   )}
    // </>
  );
}
