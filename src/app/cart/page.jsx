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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cartContext";
import { CldImage } from "next-cloudinary";
export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  const router = useRouter();
  const { data: session, status } = useSession();

  const getCloudinaryUrl = (publicId) => {
    const cloudinaryBaseUrl =
      "https://res.cloudinary.com/dd0yi5utp/image/upload/v1729430075/";
    return `${cloudinaryBaseUrl}${publicId}`;
  };
  const NumberWithCommas = ({ numberString }) => {
    const number = Number(numberString);
    const formattedNumber = number.toLocaleString();
    return <span>₦ {formattedNumber}</span>;
  };
  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
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
                {cart.length === 0 ? (
                  <center>Your cart is empty</center>
                ) : (
                  <table>
                    <tr className={styles.thead}>
                      <td></td>
                      <td>product</td>
                      <td>price</td>
                      <td>quantity</td>
                      <td>subtotal</td>
                    </tr>
                    {cart.map((item) => (
                      <tr>
                        <td className={styles.action}>
                          <MdClose
                            className={styles.cta}
                            onClick={() => removeFromCart(item.productId)}
                          />
                          <CldImage
                            height={50}
                            width={100}
                            src={getCloudinaryUrl(item.img)}
                            className={styles.img}
                            alt="img"
                          />
                        </td>
                        <td>
                          <Image src={img} alt="img" className={styles.imgs} />{" "}
                          {item.title}
                        </td>
                        <td>
                          <NumberWithCommas numberString={item.price} />
                        </td>
                        <td style={{ textAlign: "center" }}>{item.quantity}</td>
                        <td>
                          <NumberWithCommas
                            numberString={
                              parseFloat(item.price) * parseInt(item.quantity)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </table>
                )}
              </div>
              {cart.length > 0 && (
                <div className={styles.coupon}>
                  <form>
                    <input type="text" placeholder="COUPON CODE" />
                    <button type="submit">
                      <span>apply coupon</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className={styles.cart_totals}>
                <h5>cart totals</h5>
                <div className={styles.subtotal}>
                  <span>subtotal</span>
                  <span>₦{totalPrice.toLocaleString()}</span>
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
                  <span>₦{totalPrice.toLocaleString()}</span>
                </div>

                <button
                  disabled={status === "unauthenticated" ? true : false}
                  className={
                    status === "unauthenticated" && `${styles.disabled}`
                  }
                  onClick={() => router.push("/checkout")}
                >
                  proceed to checkout
                </button>
                {status === "unauthenticated" && (
                  <span>
                    Already have an account?{" "}
                    <Link
                      href="signin"
                      style={{ color: "#f00", fontWeight: "bold" }}
                    >
                      Sign In
                    </Link>
                  </span>
                )}
              </div>
            )}
          </section>
          <TrendingProducts />
          <Contact />
          <Footer />
        </>
      )}
    </>
  );
}
