"use client";
import { useState, useEffect } from "react";
import styles from "../dashboard/style.module.css";
import Sidebar from "../components/sidebar";

import { MdSystemUpdateAlt } from "react-icons/md";
import Link from "next/link";
import RightSide from "../components/rightside";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";
import { CldImage } from "next-cloudinary";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/app/validationSchema";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
export default function EditProduct() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const [uniqueProduct, setUniqueProduct] = useState([]);
  const getUniqueProduct = async () => {
    const response = await axios.get(
      `/api/product/uniqueproduct?productId=${productId}`
    );
    if (response.data) setUniqueProduct(response.data);
  };
  const router = useRouter();

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
    getUniqueProduct();
  }, []);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (uniqueProduct) {
      setValue("title", uniqueProduct.title);
      setValue("price", uniqueProduct.price);
      setValue("overprice", uniqueProduct.overprice);
      setValue("details", uniqueProduct.details);
      setValue("weight", uniqueProduct.weight);
    }
  }, [uniqueProduct, setValue]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = () => {
    Swal.fire({
      title: "Do you want to delete this product?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const deleteProduct = async () => {
          const response = await axios.delete("/api/product", {
            params: { productId },
          });
          if (response.status === 200) {
            toast.success("Delete product successfully");
            setTimeout(() => {
              router.push("products");
            }, 1000);
          }
        };
        deleteProduct();
      } else if (result.isDenied) {
        Swal.fire("Actions denied.", "", "info");
      }
    });
  };
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
                <MdSystemUpdateAlt style={{ marginRight: "4px" }} /> Update
                Product
              </h1>

              <div className={styles.recent_orders}>
                <div className={styles.table}>
                  <div className={styles.imagesUpload}>
                    <div className={styles.input}>
                      {uniqueProduct.img1 && (
                        <CldImage
                          src={uniqueProduct.img1}
                          width={150}
                          height={150}
                          alt="Blaq Kouture"
                          style={{ marginBottom: "1rem" }}
                        />
                      )}
                    </div>
                    <div className={styles.input}>
                      {uniqueProduct.img2 && (
                        <CldImage
                          src={uniqueProduct.img2}
                          width={150}
                          height={150}
                          alt="Blaq Kouture"
                          style={{ marginBottom: "1rem" }}
                        />
                      )}
                    </div>
                    <div className={styles.input}>
                      {uniqueProduct.img3 && (
                        <CldImage
                          src={uniqueProduct.img3}
                          width={150}
                          height={150}
                          alt="Blaq Kouture"
                          style={{ marginBottom: "1rem" }}
                        />
                      )}
                    </div>
                  </div>

                  <form
                    action=""
                    onSubmit={handleSubmit(async (data) => {
                      try {
                        await axios.put("/api/product", {
                          ...data,
                          productId,
                        });
                        toast.success("Product updated successfully");
                        setTimeout(() => {
                          router.push("products");
                        }, 1000);
                      } catch (error) {
                        toast.error(error.message);
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
                          {...register("price")}
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
                          {...register("overprice")}
                        />
                        {errors.overprice && <p>{errors.overprice.message}</p>}
                      </div>

                      <div className={styles.input}>
                        <span>
                          Associated With ({uniqueProduct.associatedWith}):
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
                          Collection ({uniqueProduct.collection}):{" "}
                          <span className={styles.import}>*</span>
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

                    <button type="submit" className={styles.update_btn}>
                      <MdSystemUpdateAlt /> Update Product
                    </button>
                  </form>
                  <button className={styles.delete_btn} onClick={handleDelete}>
                    <MdDelete /> Delete Product
                  </button>
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
