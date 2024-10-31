"use client";
import Header from "@/components/header/page";
import styles from "../payment/style.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import axios from "axios";

import Contact from "@/components/contact/page";
import Footer from "@/components/footer/page";
import TrendingProducts from "@/components/trendingproducts/page";
import toast, { Toaster } from "react-hot-toast";
import { GlobalContext } from "@/context";

export default function UploadProof() {
  const [img1, setImg1] = useState("");
  const [file, setFile] = useState(null);
  const router = useRouter();
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  if (status === "unauthenticated") {
    router.push("/");
  }

  const { setUniqueUpdate, uniqueUpdate, updateQuery, useId } =
    useContext(GlobalContext);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg1(reader.result); // Set the preview image
      };
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile); // Save the selected file for upload
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "czg2ltv9"); // Your Cloudinary upload preset

    try {
      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dd0yi5utp/image/upload",
        formData
      );

      const imagePublicId = uploadResponse.data.public_id;

      // Now you can proceed with your existing logic to save the image ID
      if (!uniqueUpdate) {
        const response = await axios.put(
          `/api/order?update_query=${updateQuery}&image=${imagePublicId}`
        );
        if (response.data) {
          router.push("/pending_order");
        }
      } else {
        const response = await axios.put(
          `/api/order/unique?id=${useId}&image=${imagePublicId}`
        );
        if (response.data) {
          setUniqueUpdate(false);
          router.push("/pending_order");
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload image.");
    }
  };

  return (
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
                    <img
                      src={img1}
                      width={150}
                      height={150}
                      alt="Blaq Kouture"
                      style={{ marginBottom: "1rem" }}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ marginBottom: "1rem" }}
                  />
                </p>
              </div>
              <div className={styles.btns}>
                <button className={styles.placeOrder} onClick={handleUpload}>
                  Upload
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
  );
}
