"use client";
import { useState, useEffect } from "react";
import styles from "../dashboard/style.module.css";
import Sidebar from "../components/sidebar";

import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import RightSide from "../components/rightside";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import Swal from "sweetalert2";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/app/validationSchema";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function AddProducts() {
  const [addTitle, setAddTitle] = useState("Add Product");
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");

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
  const handleFileChange2 = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg2(reader.result); // Set the preview image
      };
      reader.readAsDataURL(selectedFile);
      setFile2(selectedFile); // Save the selected file for upload
    }
  };
  const handleFileChange3 = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg3(reader.result); // Set the preview image
      };
      reader.readAsDataURL(selectedFile);
      setFile3(selectedFile); // Save the selected file for upload
    }
  };

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(productSchema) });

  const { data: session, status } = useSession();
  const [menu, setMenu] = useState(false);
  const showMenu = () => {
    setMenu(true);
  };
  const closeMenu = () => {
    setMenu(false);
  };
  if (status === "unauthenticated") {
    router.push("signin");
  }

  const [productsList, setProductList] = useState([]);
  const getProduct = async () => {
    const response = await axios.get(`/api/product`);
    if (response.data) setProductList(response.data);
  };
  useEffect(() => {
    getProduct();
  }, []);

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
          <div className={styles.container}>
            <Sidebar menu={menu} closeMenu={closeMenu} />
            <main className={styles.main}>
              <h1 style={{ display: "flex", alignItems: "center" }}>
                <IoMdAdd /> New Product
              </h1>

              <div className={styles.recent_orders}>
                <div className={styles.table}>
                  <div className={styles.imagesUpload}>
                    <div className={styles.input}>
                      {img1 && (
                        <CldImage
                          src={img1}
                          width={150}
                          height={150}
                          alt="Blaq Kouture"
                          style={{ marginBottom: "1rem" }}
                        />
                      )}
                      <label className={styles.customLabel}>
                        Choose product image{" "}
                        <span style={{ color: "red" }}>*</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          style={{ marginBottom: "1rem" }}
                          className={styles.customInput}
                        />
                      </label>
                    </div>
                    <div className={styles.input}>
                      {img2 && (
                        <CldImage
                          src={img2}
                          width={150}
                          height={150}
                          alt="Blaq Kouture"
                          style={{ marginBottom: "1rem" }}
                        />
                      )}
                      <label className={styles.customLabel}>
                        2nd image (optional)
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange2}
                          style={{ marginBottom: "1rem" }}
                          className={styles.customInput}
                        />
                      </label>
                    </div>
                    <div className={styles.input}>
                      {img3 && (
                        <CldImage
                          src={img3}
                          width={150}
                          height={150}
                          alt="Blaq Kouture"
                          style={{ marginBottom: "1rem" }}
                        />
                      )}
                      <label className={styles.customLabel}>
                        3rd image (optional)
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange3}
                          style={{ marginBottom: "1rem" }}
                          className={styles.customInput}
                        />
                      </label>
                    </div>
                  </div>
                  <form
                    action=""
                    onSubmit={handleSubmit(async (data) => {
                      setAddTitle("Adding Product...");
                      if (!img1) {
                        Swal.fire({
                          title: "Error",
                          text: "Please select product image (1st image is compulsory)",
                          icon: "error",
                        });
                      } else {
                        const formData = new FormData();
                        const formData2 = new FormData();
                        const formData3 = new FormData();
                        let uploadResponse2 = null;
                        let uploadResponse3 = null;
                        formData.append("file", file);
                        formData.append("upload_preset", "czg2ltv9");
                        if (img2 && file2) {
                          formData2.append("file", file2);
                          formData2.append("upload_preset", "czg2ltv9");
                          try {
                            uploadResponse2 = await axios.post(
                              "https://api.cloudinary.com/v1_1/dd0yi5utp/image/upload",
                              formData2
                            );
                          } catch (e) {
                            console.error("Error uploading image 2:", e);
                            // Handle the error (e.g., show a notification)
                          }
                        }
                        if (img3 && file3) {
                          formData3.append("file", file3);
                          formData3.append("upload_preset", "czg2ltv9");
                          try {
                            uploadResponse3 = await axios.post(
                              "https://api.cloudinary.com/v1_1/dd0yi5utp/image/upload",
                              formData3
                            );
                          } catch (e) {
                            console.error("Error uploading image 3:", e);
                            // Handle the error (e.g., show a notification)
                          }
                        }

                        try {
                          const uploadResponse = await axios.post(
                            "https://api.cloudinary.com/v1_1/dd0yi5utp/image/upload",
                            formData
                          );

                          const imagePublicId = uploadResponse.data.public_id;
                          const imagePublicId2 = uploadResponse2
                            ? uploadResponse2.data.public_id
                            : "";
                          const imagePublicId3 = uploadResponse3
                            ? uploadResponse3.data.public_id
                            : "";

                          await axios.post("/api/product", {
                            ...data,
                            image1: img1 ? imagePublicId : "",
                            image2: img2 ? imagePublicId2 : "",
                            image3: img3 ? imagePublicId3 : "",
                          });
                          Swal.fire({
                            title: "Success",
                            text: "Product added successfully",
                            icon: "success",
                          });
                          router.push("products");
                        } catch (error) {
                          setAddTitle("Add Product");
                          toast.error(error.message);
                        }
                      }
                    })}
                  >
                    <Toaster position="bottom-left" />
                    <div className={styles.input}>
                      <span>
                        Title: <span className={styles.import}>*</span>
                      </span>
                      <input type="text" name="title" {...register("title")} />
                      {errors.title && <p>{errors.title.message}</p>}
                    </div>
                    <div className={styles.group}>
                      <div className={styles.input}>
                        <span>
                          Actual Price: <span className={styles.import}>*</span>
                        </span>
                        <input
                          type="number"
                          name="price"
                          {...register("price", {
                            setValueAs: (value) => parseFloat(value),
                          })}
                        />
                        {errors.price && <p>{errors.price.message}</p>}
                      </div>

                      <div className={styles.input}>
                        <span>
                          Overrated Price:{" "}
                          <span className={styles.import}>*</span>
                        </span>
                        <input
                          type="number"
                          name="overprice"
                          {...register("overprice", {
                            setValueAs: (value) => parseFloat(value),
                          })}
                        />
                        {errors.overprice && <p>{errors.overprice.message}</p>}
                      </div>

                      <div className={styles.input}>
                        <span>
                          Associated With:
                          <span className={styles.import}>*</span>
                        </span>
                        <select
                          name="associatedWith"
                          {...register("associatedWith")}
                        >
                          <option value="-">None</option>
                          {productsList.map((list, index) => (
                            <option key={index} value={list.productId}>
                              {list.title + " (" + list.productId + ")"}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className={styles.input}>
                      <span>
                        Details: <span className={styles.import}>*</span>
                      </span>
                      <textarea
                        width="100%"
                        height="100%"
                        {...register("details")}
                      />
                      {errors.details && <p>{errors.details.message}</p>}
                    </div>
                    <div className={styles.group}>
                      <div className={styles.input}>
                        <span>
                          Availability in stock:{" "}
                          <span className={styles.import}>*</span>
                        </span>
                        <select
                          id="number"
                          name="stock"
                          {...register("stockquantity")}
                        >
                          <option value={0}>Out of Stock</option>
                          {Array.from({ length: 100 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                        {errors.stockquantity && (
                          <p>{errors.stockquantity.message}</p>
                        )}
                      </div>
                      <div className={styles.input}>
                        <span>
                          Collection: <span className={styles.import}>*</span>
                        </span>
                        <select name="collection" {...register("collection")}>
                          <option value="men">Men</option>
                          <option value="women">Women</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit">
                      {addTitle === "Add Product" && <IoMdAdd />} {addTitle}
                    </button>
                  </form>
                </div>
              </div>
            </main>

            <RightSide showMenu={showMenu} />
          </div>
        </>
      )}
    </>
  );
}
