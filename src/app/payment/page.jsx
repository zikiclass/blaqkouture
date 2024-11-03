"use client";
import Header from "@/components/header/page";

import styles from "./style.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo, useContext } from "react";
import firstBank from "../../image/firstbank.jpg";
import palmpay from "../../image/palmpay.png";
import kudaBank from "../../image/kuda.jpg";
import opayBank from "../../image/opay.jpg";
import Link from "next/link";
import { CheckBox } from "@mui/icons-material";
import Contact from "@/components/contact/page";
import Footer from "@/components/footer/page";
import TrendingProducts from "@/components/trendingproducts/page";

import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import Image from "next/image";
import { GlobalContext } from "@/context";

export default function Payment() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  if (status === "unauthenticated") {
    router.push("/");
  }
  const { setUniqueUpdate, uniqueUpdate, updateQuery, useId, totalPriceCart } =
    useContext(GlobalContext);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  const handlePayment = () => {
    router.push("/uploadproof");
  };
  const handleCancel = async () => {
    try {
      if (!uniqueUpdate) {
        const response = await axios.put(
          `/api/order/cancel?update_query=${updateQuery}`
        );
        if (response.data) {
          router.push("/orders");
        }
      } else {
        const response = await axios.put(
          `/api/order/unique_cancel?update_query=${updateQuery}&id=${useId}`
        );
        if (response.data) {
          setUniqueUpdate(false);
          router.push("/orders");
        }
      }
    } catch (e) {}
  };
  const [accountDetails, setAccountDetails] = useState({
    accountNumber: "",
    accountName: "",
  });

  const [bankTitle, setBankTitle] = useState("First Bank");
  const [bank, setBank] = useState([]);
  const getBank = async () => {
    const response = await axios.get(`/api/bkdetails`);

    if (response.data) setBank(response.data);
  };

  const handleLoading = (bk) => {
    const bankDetails = bank.find((b) => b.bank === bk);

    if (bankDetails) {
      setAccountDetails({
        accountNumber: bankDetails.accountNumber || "",
        accountName: bankDetails.accountName || "",
      });
    }
  };

  useEffect(() => {
    const fetchBankDetails = async () => {
      await getBank();
      handleLoading("First Bank");
    };

    fetchBankDetails();
  }, []);

  return (
    // <>
    //   {loading ? (
    //     <Loader />
    //   ) : (
    <>
      <Header />
      <section className={styles.checkout}>
        <div className={styles.imgsBank}>
          <Image
            src={palmpay}
            className={styles.bank}
            alt="Img"
            // onClick={() => {
            //   setBankTitle("First Bank");
            //   handleLoading("First Bank");
            // }}
          />
          {/* <Image
            src={kudaBank}
            className={styles.bank}
            alt="Img"
            onClick={() => {
              setBankTitle("Kuda");
              handleLoading("Kuda");
            }}
          />
          <Image
            src={opayBank}
            className={styles.bank}
            alt="Img"
            onClick={() => {
              setBankTitle("Opay");
              handleLoading("Opay");
            }}
          /> */}
        </div>
        <div className={styles.bankDetails}>
          <div className={styles.form}>
            <Toaster position="bottom-left" />

            <div className={styles.payment}>
              <h3>blaq kouture</h3>
              <h4>drip with style</h4>
              <h2>{totalPriceCart}</h2>
              <div className={styles.acct}>
                {/* {accountDetails.accountNumber ? (
                  <>
                    <p>
                      <span>Account Number</span>
                      <b>{accountDetails.accountNumber}</b>
                    </p>
                    <p>
                      <span>Account Name</span>
                      <b>{accountDetails.accountName}</b>
                    </p>
                    <p>
                      <span>Bank</span>
                      <b>{bankTitle}</b>
                    </p>
                  </>
                ) : (
                  <p>
                    <span>SELECT YOUR BANK</span>
                  </p>
                )} */}

                <p>
                  <span>Account Number</span>
                  <b>9063152812</b>
                </p>
                <p>
                  <span>Account Name</span>
                  <b>KELVIN OGHENEVWEGBA</b>
                </p>
                <p>
                  <span>Bank</span>
                  <b>Palmpay</b>
                </p>
              </div>
              <div className={styles.btns}>
                {accountDetails.accountNumber && (
                  <button className={styles.placeOrder} onClick={handlePayment}>
                    I&#39;ve made the transfer
                  </button>
                )}
                <button
                  className={styles.placeOrder}
                  style={{ backgroundColor: "var(--color-danger)" }}
                  onClick={handleCancel}
                >
                  Cancel
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
