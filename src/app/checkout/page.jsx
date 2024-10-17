"use client";
import Header from "@/components/header/page";
import styles from "./style.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import Image from "next/image";
import img from "../../image/a28f3b1c-00be-4f69-be0f-f916a31d8bf1 2.JPG";
import paystackImg from "../../image/paystack-wc.png";
import Link from "next/link";
import { CheckBox } from "@mui/icons-material";
import Contact from "@/components/contact/page";
import Footer from "@/components/footer/page";
import TrendingProducts from "@/components/trendingproducts/page";
export default function CheckOut() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    router.push("/");
  }

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
          <section className={styles.checkout}>
            <div className={styles.payment}>
              <h3>your order</h3>
              <div className={styles.product}>
                <span>product</span>
                <span>subtotal</span>
              </div>
              <div className={styles.sub_product}>
                <Image src={img} alt="img" className={styles.img} />
                <span className={styles.title}>
                  HF PANEL CAP GREY - Grey, One Size Fits All
                </span>
                <span>&times; 2</span>
                <span>₦ 330,000.00</span>
              </div>
              <div className={styles.subtotal}>
                <div>
                  <span>subtotal</span>
                  <span>₦ 330,000.00</span>
                </div>
                <div>
                  <span>shipping</span>
                  <span>shipping: ₦ 29,700.00</span>
                </div>
              </div>
              <div className={styles.total}>
                <span>total</span>
                <span>₦ 359,700.00</span>
              </div>
              <div className={styles.coupon}>
                <form>
                  <input type="text" placeholder="Coupon Code" name="coupon" />
                  <button>apply</button>
                </form>
              </div>
              <div className={styles.paystack}>
                <div>
                  <span>debit/credit cards</span>
                  <Image
                    src={paystackImg}
                    alt="Credit Card"
                    className={styles.credit}
                  />
                </div>
                <div>make payment using your debit and credit cards</div>
              </div>
              <div className={styles.terms}>
                <CheckBox name="terms" />{" "}
                <span>
                  I have read and agree to the website{" "}
                  <Link href="terms" style={{ fontWeight: "bold" }}>
                    terms and conditions
                  </Link>{" "}
                  <span className={styles.import}>*</span>
                </span>
              </div>
              <button className={styles.placeOrder}>
                place order ₦ 359,700.00
              </button>
            </div>

            <div className={styles.billing}>
              <h2>billing details</h2>
              <form>
                <div className={styles.row}>
                  <div>
                    <span>
                      first name <span className={styles.import}>*</span>
                    </span>
                    <input type="text" name="firstname" />
                  </div>
                  <div>
                    <span>
                      last name <span className={styles.import}>*</span>
                    </span>
                    <input type="text" name="lastname" />
                  </div>
                </div>
                <div className={styles.input}>
                  <span>
                    state <span className={styles.import}>*</span>
                  </span>
                  <select name="state">
                    <option value="">Select an option&hellip;</option>
                    <option value="AB">Abia</option>
                    <option value="FC">Abuja</option>
                    <option value="AD">Adamawa</option>
                    <option value="AK">Akwa Ibom</option>
                    <option value="AN">Anambra</option>
                    <option value="BA">Bauchi</option>
                    <option value="BY">Bayelsa</option>
                    <option value="BE">Benue</option>
                    <option value="BO">Borno</option>
                    <option value="CR">Cross River</option>
                    <option value="DE" selected="selected">
                      Delta
                    </option>
                    <option value="EB">Ebonyi</option>
                    <option value="ED">Edo</option>
                    <option value="EK">Ekiti</option>
                    <option value="EN">Enugu</option>
                    <option value="GO">Gombe</option>
                    <option value="IM">Imo</option>
                    <option value="JI">Jigawa</option>
                    <option value="KD">Kaduna</option>
                    <option value="KN">Kano</option>
                    <option value="KT">Katsina</option>
                    <option value="KE">Kebbi</option>
                    <option value="KO">Kogi</option>
                    <option value="KW">Kwara</option>
                    <option value="LA">Lagos</option>
                    <option value="NA">Nasarawa</option>
                    <option value="NI">Niger</option>
                    <option value="OG">Ogun</option>
                    <option value="ON">Ondo</option>
                    <option value="OS">Osun</option>
                    <option value="OY">Oyo</option>
                    <option value="PL">Plateau</option>
                    <option value="RI">Rivers</option>
                    <option value="SO">Sokoto</option>
                    <option value="TA">Taraba</option>
                    <option value="YO">Yobe</option>
                    <option value="ZA">Zamfara</option>
                  </select>
                </div>
                <div className={styles.row}>
                  <div>
                    <span>
                      street address <span className={styles.import}>*</span>
                    </span>
                    <input type="text" name="street" />
                  </div>
                  <div>
                    <span>
                      town / city <span className={styles.import}>*</span>
                    </span>
                    <input type="text" name="town" />
                  </div>
                </div>
                <div className={styles.row}>
                  <div>
                    <span>
                      phone <span className={styles.import}>*</span>
                    </span>
                    <input type="text" name="phone" />
                  </div>
                </div>
              </form>
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
