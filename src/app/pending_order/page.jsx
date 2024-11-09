"use client";
import Header from "@/components/header/page";

import { WhatsApp } from "@mui/icons-material";
import styles from "../payment/style.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Contact from "@/components/contact/page";
import Footer from "@/components/footer/page";
import TrendingProducts from "@/components/trendingproducts/page";
import UniqueProduct from "@/components/uniqueproducts/page";

export default function UploadProof() {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    router.push("/");
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/orders");
    }, 10000);
    return () => clearTimeout(timer);
  }, [router]);

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
            <div className={styles.payment}>
              <h3>blaq kouture</h3>
              <h4>drip with style</h4>

              <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Processing...</p>
                <p style={{ textAlign: "center", marginTop: "14px" }}>
                  Send payment slip & details of the product you want to the
                  Whatsapp number below:
                </p>
                <p className={styles.whatsapp}>
                  <b>
                    <WhatsApp />
                    <a
                      href="https://wa.me/+2349072561418"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      09072561418
                    </a>
                  </b>
                </p>
              </div>
              <div className={styles.acct}>
                <p
                  style={{
                    textAlign: "center",
                    color: "var(--color-primary)",
                    fontSize: "13px",
                  }}
                >
                  Your transaction is being confirmed.
                </p>
              </div>
              <div className={styles.btns}>
                <button
                  className={styles.placeOrder}
                  onClick={() => router.push("/orders")}
                >
                  view orders
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <UniqueProduct title="All" />
      <Contact />
      <Footer />
    </>
    //   )}
    // </>
  );
}
