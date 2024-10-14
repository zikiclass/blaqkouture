"use client";
import Header from "@/components/header/page";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import TrendingProducts from "@/components/trendingproducts/page";
import Contact from "@/components/contact/page";
import Footer from "@/components/footer/page";
import { MdClose } from "react-icons/md";
import img from "../../image/a28f3b1c-00be-4f69-be0f-f916a31d8bf1 2.JPG";
import Image from "next/image";
import Link from "next/link";
export default function Cart() {
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
          <section className={styles.cartContainer}>
            <div className={styles.cart}>
              <h4>cart</h4>

              <div className={styles.table}>
                <table>
                  <tr className={styles.thead}>
                    <td></td>
                    <td>product</td>
                    <td>price</td>
                    <td>quantity</td>
                    <td>subtotal</td>
                  </tr>
                  <tr>
                    <td className={styles.action}>
                      <MdClose className={styles.cta} />
                      <Image src={img} alt="img" className={styles.img} />
                    </td>
                    <td>
                      <Image src={img} alt="img" className={styles.imgs} /> HF
                      PANEL CAP ORANGE - One Size Fits All, Orange
                    </td>
                    <td>₦165,000.00</td>
                    <td style={{ textAlign: "center" }}>1</td>
                    <td>₦165,000.00</td>
                  </tr>
                </table>
              </div>
              <div className={styles.coupon}>
                <form>
                  <input type="text" placeholder="COUPON CODE" />
                  <button type="submit">
                    <span>apply coupon</span>
                  </button>
                </form>
              </div>
            </div>
            <div className={styles.cart_totals}>
              <h5>cart totals</h5>
              <div className={styles.subtotal}>
                <span>subtotal</span>
                <span>₦ 165,000.00</span>
              </div>
              <div className={styles.shipping}>
                <span style={{ marginBottom: "0.4rem" }}>
                  <b>shipping</b>
                </span>
                <div>
                  <p style={{ color: "#444" }}>
                    <span style={{ textTransform: "Capitalize" }}>
                      Shipping:
                    </span>
                    <b>₦ 29,700.00</b>
                  </p>
                  <p style={{ color: "#444", marginBottom: "0.7rem" }}>
                    <span>
                      SHIPPING TO <b>LAGOS</b>
                    </span>
                  </p>
                </div>
              </div>
              <div className={styles.total}>
                <span>total</span>
                <span>₦ 194,700.00</span>
              </div>

              <button>proceed to checkout</button>
              <span>
                Already have an account?{" "}
                <Link
                  href="signin"
                  style={{ color: "#f00", fontWeight: "bold" }}
                >
                  Sign In
                </Link>
              </span>
            </div>
          </section>
          <TrendingProducts />
          <Contact />
          <Footer />
        </>
      )}
    </>
  );
}
