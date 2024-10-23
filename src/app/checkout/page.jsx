"use client";
import Header from "@/components/header/page";
import dynamic from "next/dynamic";
const PaystackButton = dynamic(
  () => import("react-paystack").then((module) => module.PaystackButton),
  { ssr: false }
);
import styles from "./style.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import Loader from "@/components/Loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { billingSchema } from "@/app/validationSchema";
import Image from "next/image";
import paystackImg from "../../image/paystack-wc.png";
import Link from "next/link";
import { CheckBox } from "@mui/icons-material";
import Contact from "@/components/contact/page";
import Footer from "@/components/footer/page";
import TrendingProducts from "@/components/trendingproducts/page";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useCart } from "@/context/cartContext";
import { CldImage } from "next-cloudinary";

export default function CheckOut() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  if (status === "unauthenticated") {
    router.push("/");
  }
  const { cart } = useCart();

  const getCloudinaryUrl = (publicId) => {
    const cloudinaryBaseUrl =
      "https://res.cloudinary.com/dd0yi5utp/image/upload/v1729430075/";
    return `${cloudinaryBaseUrl}${publicId}`;
  };
  const NumberWithCommas = ({ numberString }) => {
    const number = Number(numberString);
    const formattedNumber = number.toLocaleString();
    return <span>₦ {formattedNumber}.00</span>;
  };
  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const totalTax = cart.reduce((acc, item) => {
    const itemTax = item.price * item.quantity * 0.01;
    return acc + itemTax;
  }, 0);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(billingSchema) });

  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  const [billing, setBilling] = useState({});

  useEffect(() => {
    const getBilling = async () => {
      try {
        const response = await axios.get(`/api/billing`);
        if (response.data) {
          setBilling(response.data[0]);
        }
      } catch (error) {}
    };

    getBilling();
  }, []);

  useEffect(() => {
    if (billing && Object.keys(billing).length > 0) {
      setValue("firstName", billing.firstName);
      setValue("lastName", billing.lastName);
      setValue("streetAddress", billing.streetAddress);
      setValue("townCity", billing.townCity);
      setValue("phoneNumber", billing.phoneNumber);
    }
  }, [billing, setValue]);

  const [selectedValue, setSelectedValue] = useState("DE");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const publicKey = "pk_test_ff9f110106f1f717068a5ed1bd5667b211e74c6c";
  const componentProps = useMemo(
    () => ({
      email: session?.user?.email,
      amount: (totalPrice + totalTax) * 100,
      publicKey,
      text: "Place order ₦ " + (totalPrice + totalTax).toLocaleString() + ".00",
      onSuccess: () => alert("Thanks for patronizing us"),
      onClose: () => alert("Wait! you need to make this purchase, don't go!!!"),
    }),
    [session, totalPrice, totalTax]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadPaystackScript = () => {
        return new Promise((resolve, reject) => {
          if (window.PaystackPop) {
            resolve();
          } else {
            const script = document.createElement("script");
            script.src = "https://js.paystack.co/v1/inline.js";
            script.async = true;
            script.onload = () => {
              if (window.PaystackPop) {
                resolve();
              } else {
                reject(new Error("Paystack script not loaded"));
              }
            };
            script.onerror = reject;
            document.body.appendChild(script);
          }
        });
      };

      // Load Paystack script
      loadPaystackScript()
        .then(() => {
          const handler = window.PaystackPop.setup({
            ...componentProps,
            amount: (totalPrice + totalTax) * 100,
          });
          setPaystackHandler(() => handler);
        })
        .catch((error) =>
          console.error("Error loading Paystack script:", error)
        );
    }
  }, [totalPrice, totalTax, componentProps]);

  const handlePaymentSubmit = async (data) => {
    try {
      const response = await axios.post("/api/billing", { ...data, userId });

      if (response.data.success && paystackHandler) {
        paystackHandler.onSuccess = async (paymentResponse) => {
          try {
            await axios.post("/api/payment-success", {
              userId,
              orderId: response.data.orderId,
              paymentReference: paymentResponse.reference,
            });
            toast.success("Payment successful!");
            router.push("/products");
          } catch (error) {
            toast.error("Error updating payment status.");
          }
        };
        paystackHandler.openIframe();
      }
    } catch (error) {
      toast.error("Error submitting billing details. Please try again.");
    }
  };

  return (
    // <>
    //   {loading ? (
    //     <Loader />
    //   ) : (
    <>
      <Header />
      <section className={styles.checkout}>
        <form action="" onSubmit={handleSubmit(handlePaymentSubmit)}>
          <Toaster position="bottom-left" />
          <div className={styles.payment}>
            <h3>your order</h3>
            <div className={styles.product}>
              <span>product</span>
              <span>subtotal</span>
            </div>
            {cart.map((item, index) => (
              <div className={styles.sub_product} key={index}>
                <CldImage
                  height={50}
                  width={100}
                  src={getCloudinaryUrl(item.img)}
                  className={styles.img}
                  alt="img"
                />

                <span className={styles.title}>{item.title}</span>
                <span>&times; {item.quantity}</span>
                <span>
                  <NumberWithCommas
                    numberString={
                      parseFloat(item.price) * parseInt(item.quantity)
                    }
                  />
                </span>
              </div>
            ))}
            <div className={styles.subtotal}>
              <div>
                <span>subtotal</span>
                <span>
                  <b>₦ {totalPrice.toLocaleString()}.00</b>
                </span>
              </div>
              <div>
                <span>tax</span>
                <span>tax: ₦ {totalTax.toLocaleString()}.00</span>
              </div>
            </div>
            <div className={styles.total}>
              <span>total</span>
              <span>
                <b>₦ {(totalPrice + totalTax).toLocaleString()}.00</b>
              </span>
            </div>
            {/* <div className={styles.coupon}>
            <form>
              <input type="text" placeholder="Coupon Code" name="coupon" />
              <button>apply</button>
            </form>
          </div> */}
            <div className={styles.paystack}>
              <div>
                <span>debit/credit card</span>
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
                <Link
                  prefetch={true}
                  href="terms"
                  style={{ fontWeight: "bold" }}
                >
                  terms and conditions
                </Link>{" "}
                <span className={styles.import}>*</span>
              </span>
            </div>
            <PaystackButton
              className={styles.placeOrder}
              type="submit"
              onClick={handleSubmit(handlePaymentSubmit)}
              {...componentProps}
            />
          </div>

          <div className={styles.billing}>
            <h2>billing details</h2>

            <div className={styles.row}>
              <div>
                <span>
                  first name <span className={styles.import}>*</span>
                </span>
                <input
                  type="text"
                  name="firstName"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className={styles.error}>{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <span>
                  last name <span className={styles.import}>*</span>
                </span>
                <input type="text" name="lastName" {...register("lastName")} />
                {errors.lastName && (
                  <p className={styles.error}>{errors.lastName.message}</p>
                )}
              </div>
            </div>
            <div className={styles.input}>
              <span>
                state <span className={styles.import}>*</span>
              </span>
              <select
                name="state"
                {...register("state")}
                value={selectedValue}
                onChange={handleChange}
              >
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
                <option value="DE">Delta</option>
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
                <input
                  type="text"
                  name="streetAddress"
                  {...register("streetAddress")}
                />
                {errors.streetAddress && (
                  <p className={styles.error}>{errors.streetAddress.message}</p>
                )}
              </div>
              <div>
                <span>
                  town / city <span className={styles.import}>*</span>
                </span>
                <input type="text" name="townCity" {...register("townCity")} />
                {errors.townCity && (
                  <p className={styles.error}>{errors.townCity.message}</p>
                )}
              </div>
            </div>
            <div className={styles.row}>
              <div>
                <span>
                  phone <span className={styles.import}>*</span>
                </span>
                <input
                  type="text"
                  name="phoneNumber"
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && (
                  <p className={styles.error}>{errors.phoneNumber.message}</p>
                )}
              </div>
            </div>
          </div>
        </form>
      </section>
      <TrendingProducts />
      <Contact />
      <Footer />
    </>
    //   )}
    // </>
  );
}
