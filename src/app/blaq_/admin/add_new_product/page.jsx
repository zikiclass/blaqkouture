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
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");

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
                              Select First Image{" "}
                              <span className={styles.import}>*</span>
                            </button>
                          )
                        }
                      </CldUploadWidget>
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
                          setImg2(result.info.public_id);
                        }}
                      >
                        {({ open }) =>
                          !img2 && (
                            <button
                              className={styles.btnAdd}
                              onClick={() => open()}
                            >
                              Second Image (Optional)
                            </button>
                          )
                        }
                      </CldUploadWidget>
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
                          setImg3(result.info.public_id);
                        }}
                      >
                        {({ open }) =>
                          !img3 && (
                            <button
                              className={styles.btnAdd}
                              onClick={() => open()}
                            >
                              Third Image (Optional)
                            </button>
                          )
                        }
                      </CldUploadWidget>
                    </div>
                  </div>
                  <form
                    action=""
                    onSubmit={handleSubmit(async (data) => {
                      if (!img1) {
                        Swal.fire({
                          title: "Error",
                          text: "Please select first image",
                          icon: "error",
                        });
                      } else {
                        try {
                          await axios.post("/api/product", {
                            ...data,
                            img1,
                            img2,
                            img3,
                          });
                          Swal.fire({
                            title: "Success",
                            text: "Product added successfully",
                            icon: "success",
                          });
                          router.push("products");
                        } catch (error) {
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
                      <div className={styles.input}>
                        <span>
                          Weight (KG): <span className={styles.import}>*</span>
                        </span>
                        <input
                          type="text"
                          name="weight"
                          {...register("weight")}
                        />
                        {errors.weight && <p>{errors.weight.message}</p>}
                      </div>
                    </div>

                    <button type="submit">
                      <IoMdAdd /> Add Product
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
