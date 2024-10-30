"use client";
import Header from "@/components/header/page";

import styles from "../payment/style.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo, useContext } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";

import Link from "next/link";
import { CheckBox } from "@mui/icons-material";
import Contact from "@/components/contact/page";
import Footer from "@/components/footer/page";
import TrendingProducts from "@/components/trendingproducts/page";

import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import Image from "next/image";
import { GlobalContext } from "@/context";

export default function UploadProof() {
  const [img1, setImg1] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  if (status === "unauthenticated") {
    router.push("/");
  }

  const { setUniqueUpdate, uniqueUpdate, updateQuery, useId } =
    useContext(GlobalContext);

  const handleUpload = async () => {
    try {
      if (!uniqueUpdate) {
        const response = await axios.put(
          `/api/order?update_query=${updateQuery}&image=${img1}`
        );
        if (response.data) {
          router.push("/pending_order");
        }
      } else {
        const response = await axios.put(
          `/api/order/unique?id=${useId}&image=${img1}`
        );
        if (response.data) {
          setUniqueUpdate(false);
          router.push("/pending_order");
        }
      }
    } catch (e) {}
  };
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    // <>
    //   {loading ? (
    //     <Loader />
    //   ) : (
    <>
      <Header />
      <section className={styles.checkout}>
        <div className={styles.bankDetails}>
          <div className={styles.form}>
            <Toaster position="bottom-left" />

            <div className={styles.payment}>
              <h3>blaq kouture</h3>
              <h4>drip with style</h4>

              <div className={styles.acct}>
                <p>
                  <span>Upload Proof of Payment</span>
                </p>
                <p>
                  {img1 && (
                    <CldImage
                      src={img1}
                      width={150}
                      height={150}
                      alt="Blaq Kouture"
                      style={{ marginBottom: "1rem" }}
                    />
                  )}

                  <CldUploadWidget
                    uploadPreset="czg2ltv9"
                    options={{
                      sources: ["local"],
                      multiple: false,
                      maxFiles: 5,
                      styles: {
                        palette: {
                          window: "#FFFFFF",
                          windowBorder: "#90A0B3",
                          tabIcon: "#0078FF",
                          menuIcons: "#5A616A",
                          textDark: "#000000",
                          textLight: "#FFFFFF",
                          link: "#0078FF",
                          action: "#FF620C",
                          inactiveTabIcon: "#0E2F5A",
                          error: "#F44235",
                          inProgress: "#0078FF",
                          complete: "#20B832",
                          sourceBg: "#E4EBF1",
                        },
                        fonts: {
                          default: null,
                          "'Fira Sans', sans-serif": {
                            url: "https://fonts.googleapis.com/css?family=Fira+Sans",
                            active: true,
                          },
                        },
                      },
                    }}
                    onUpload={(result, widget) => {
                      if (result.event !== "success") return;
                      setImg1(result.info.public_id);
                    }}
                  >
                    {({ open }) =>
                      !img1 && (
                        <button
                          className={styles.btnAdd}
                          onClick={() => open()}
                        >
                          Select proof of payment
                          <span className={styles.import}>*</span>
                        </button>
                      )
                    }
                  </CldUploadWidget>
                </p>
              </div>
              <div className={styles.btns}>
                <button className={styles.placeOrder} onClick={handleUpload}>
                  upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TrendingProducts />
      <Contact />
      <Footer />
    </>
    //   )}
    // </>
  );
}
