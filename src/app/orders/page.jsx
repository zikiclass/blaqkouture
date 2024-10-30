"use client";
import Header from "@/components/header/page";
import styles from "../cart/style.module.css";
import { useContext, useEffect, useState } from "react";
import Loader from "@/components/Loader";
import TrendingProducts from "@/components/trendingproducts/page";
import Contact from "@/components/contact/page";
import Footer from "@/components/footer/page";
import { MdClose } from "react-icons/md";
import img from "../../image/a28f3b1c-00be-4f69-be0f-f916a31d8bf1 2.JPG";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { GlobalContext } from "@/context";
export default function Orders() {
  const { setUpdateQuery, setTotalPriceCart, setUniqueUpdate, setUseId } =
    useContext(GlobalContext);
  const router = useRouter();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(`/api/order`);
        if (response.data) {
          setProducts(response.data);
        }
      } catch (e) {}
    };
    getOrders();
    console.log(products);
  }, []);

  const handlePay = (amount, update_query, id) => {
    setTotalPriceCart(amount);
    setUpdateQuery(update_query);
    setUniqueUpdate(true);
    setUseId(id);
    router.push("/payment");
  };
  const removeFromOrders = async (id) => {
    try {
      const response = await axios.delete(`/api/order?id=${id}`);
      if (response.data) {
        const response = await axios.get(`/api/order`);
        if (response.data) {
          setProducts(response.data);
        }
      }
    } catch (e) {}
  };
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, []);

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

  return (
    // <>
    //   {loading ? (
    //     <Loader />
    //   ) : (
    <>
      <Header />
      <section className={styles.cartContainer}>
        <div className={styles.cart}>
          <h4>orders</h4>

          <div className={styles.table}>
            {products.length === 0 ? (
              <center>no available order!</center>
            ) : (
              <table>
                <tr className={styles.thead}>
                  <td></td>
                  <td>product</td>
                  <td>price</td>
                  <td>quantity</td>
                  <td>status</td>
                  <td>actions</td>
                </tr>
                {products.map((item, index) => (
                  <tr key={index}>
                    <td className={styles.action}>
                      <MdClose
                        className={styles.cta}
                        onClick={() => removeFromOrders(item.id)}
                      />
                      <CldImage
                        height={50}
                        width={100}
                        src={getCloudinaryUrl(item.product.img1)}
                        className={styles.img}
                        alt="img"
                      />
                    </td>
                    <td>
                      <CldImage
                        height={50}
                        width={100}
                        src={getCloudinaryUrl(item.product.img1)}
                        className={styles.imgs}
                        alt="img"
                      />{" "}
                      {item.product.title}
                    </td>
                    <td>
                      <NumberWithCommas numberString={item.product.price} />
                    </td>
                    <td style={{ textAlign: "center" }}>{item.quantity}</td>

                    <td>
                      {item.status === "NO EVIDENCE!" ? (
                        <span style={{ color: "#808080" }}>no proof!</span>
                      ) : item.status === "PROCESSING" ? (
                        <span style={{ color: "#FF8C00" }}>processing</span>
                      ) : item.status === "RECEIVED" ? (
                        <span style={{ color: "#28A745" }}>received</span>
                      ) : item.status === "DECLINED" ? (
                        <span style={{ color: "#f00" }}>declined</span>
                      ) : (
                        <span style={{ color: "#f00" }}>cancelled</span>
                      )}
                    </td>

                    {item.status === "NO EVIDENCE!" ? (
                      <td>
                        <button
                          onClick={() =>
                            handlePay(
                              "₦" +
                                (
                                  item.product.price +
                                  item.product.price * item.quantity * 0.01
                                ).toLocaleString() +
                                ".00",
                              item.update_query,
                              item.id
                            )
                          }
                          className={styles.pay}
                        >
                          PAY
                        </button>
                      </td>
                    ) : (
                      <td>
                        <button
                          onClick={() => removeFromOrders(item.id)}
                          className={styles.pay}
                          style={{ backgroundColor: "var(--color-danger)" }}
                        >
                          DELETE
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </table>
            )}
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
