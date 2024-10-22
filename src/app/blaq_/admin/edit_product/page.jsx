"use client";
import { useState, useEffect } from "react";
import styles from "../dashboard/style.module.css";
import Sidebar from "../components/sidebar";
import { MdSystemUpdateAlt, MdDelete } from "react-icons/md";
import RightSide from "../components/rightside";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { CldImage } from "next-cloudinary";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/app/validationSchema";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SearchParamsWrapper from "../components/suspensewrap";

export default function EditProduct() {
  const [id, setId] = useState(null);
  const [uniqueProduct, setUniqueProduct] = useState({});
  const [productsList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { data: session, status } = useSession();
  const [menu, setMenu] = useState(false);

  const showMenu = () => {
    setMenu(true);
  };
  const closeMenu = () => {
    setMenu(false);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const getUniqueProduct = async () => {
      try {
        const response = await axios.get(
          `/api/product/uniqueproduct?productId=${id}`
        );
        if (response.data) {
          setUniqueProduct(response.data);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    const getProduct = async () => {
      try {
        const response = await axios.get("/api/product");
        if (response.data) {
          setProductList(response.data);
        }
      } catch (error) {
        console.error("Error fetching product list:", error);
        toast.error("Failed to fetch product list");
      }
    };

    getProduct();
    getUniqueProduct();
  }, [id]);

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
      setValue("tax", uniqueProduct.tax);
      setValue("associatedWith", uniqueProduct.associatedWith);
      setValue("collection", uniqueProduct.collection);
    }
  }, [uniqueProduct, setValue]);

  const handleDelete = () => {
    Swal.fire({
      title: "Do you want to delete this product?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteProduct = async () => {
          try {
            const response = await axios.delete("/api/product", {
              params: { productId },
            });
            if (response.status === 200) {
              toast.success("Product deleted successfully");
              setTimeout(() => {
                router.push("/products");
              }, 1000);
            }
          } catch (error) {
            toast.error("Failed to delete the product");
          }
        };
        deleteProduct();
      } else if (result.isDenied) {
        Swal.fire("Action denied.", "", "info");
      }
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <SearchParamsWrapper>
          {(id) => {
            setId(id); // Set the `id` from SearchParamsWrapper
            return (
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
                        {uniqueProduct.img1 && (
                          <CldImage
                            src={uniqueProduct.img1}
                            width={150}
                            height={150}
                            alt="Product Image 1"
                            style={{ marginBottom: "1rem" }}
                          />
                        )}
                        {uniqueProduct.img2 && (
                          <CldImage
                            src={uniqueProduct.img2}
                            width={150}
                            height={150}
                            alt="Product Image 2"
                            style={{ marginBottom: "1rem" }}
                          />
                        )}
                        {uniqueProduct.img3 && (
                          <CldImage
                            src={uniqueProduct.img3}
                            width={150}
                            height={150}
                            alt="Product Image 3"
                            style={{ marginBottom: "1rem" }}
                          />
                        )}
                      </div>

                      <form
                        onSubmit={handleSubmit(async (data) => {
                          try {
                            await axios.put("/api/product", {
                              ...data,
                              id,
                            });
                            toast.success("Product updated successfully");
                            setTimeout(() => {
                              router.push("products");
                            }, 1000);
                          } catch (error) {
                            toast.error("Failed to update product");
                          }
                        })}
                      >
                        <Toaster position="bottom-left" />
                        <div className={styles.input}>
                          <span>
                            Title: <span className={styles.import}>*</span>
                          </span>
                          <input
                            type="text"
                            name="title"
                            {...register("title")}
                          />
                          {errors.title && <p>{errors.title.message}</p>}
                        </div>
                        <div className={styles.group}>
                          <div className={styles.input}>
                            <span>
                              Actual Price:{" "}
                              <span className={styles.import}>*</span>
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
                            {errors.overprice && (
                              <p>{errors.overprice.message}</p>
                            )}
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
                                  {list.title} ({list.productId})
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className={styles.input}>
                          <span>
                            Details: <span className={styles.import}>*</span>
                          </span>
                          <textarea {...register("details")} />
                          {errors.details && <p>{errors.details.message}</p>}
                        </div>
                        <div className={styles.group}>
                          <div className={styles.input}>
                            <span>
                              Availability in stock (
                              {uniqueProduct.stockquantity}):{" "}
                              <span className={styles.import}>*</span>
                            </span>
                            <select name="stock" {...register("stockquantity")}>
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
                              Collection ({uniqueProduct.collection}):{" "}
                              <span className={styles.import}>*</span>
                            </span>
                            <select
                              name="collection"
                              {...register("collection")}
                            >
                              <option value="men">Men</option>
                              <option value="women">Women</option>
                            </select>
                          </div>
                        </div>

                        <button type="submit" className={styles.update_btn}>
                          <MdSystemUpdateAlt /> Update Product
                        </button>
                      </form>

                      <button
                        className={styles.delete_btn}
                        onClick={handleDelete}
                      >
                        <MdDelete /> Delete Product
                      </button>
                    </div>
                  </div>
                </main>

                <RightSide showMenu={showMenu} />
              </div>
            );
          }}
        </SearchParamsWrapper>
      )}
    </>
  );
}
