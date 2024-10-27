"use client";
import { useState, useEffect } from "react";
import styles from "../dashboard/style.module.css";
import Sidebar from "../components/sidebar";
import { MdDelete } from "react-icons/md";

import RightSide from "../components/rightside";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import Swal from "sweetalert2";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsSchema } from "@/app/validationSchema";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import SearchParamsWrapper from "../components/suspensewrap";

export default function EditNews() {
  const router = useRouter();
  const [id, setId] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(newsSchema) });

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

  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const getnews = async () => {
      try {
        const response = await axios.get(`/api/news/unique?id=${id}`);
        if (response.data) setNewsList(response.data);
      } catch (error) {}
    };

    getnews();
  }, [id]);

  useEffect(() => {
    if (newsList) {
      setValue("headline", newsList.headline);
      setValue("date", newsList.date);
      setValue("content1", newsList.content1);
      setValue("content2", newsList.content2);
      setValue("content3", newsList.content3);
    }
  }, [newsList, setValue]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = () => {
    Swal.fire({
      title: "Do you want to delete this news?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const deletenews = async () => {
          const response = await axios.delete("/api/news", {
            params: { id },
          });
          if (response.status === 200) {
            Swal.fire("Deleted!", "", "success");
            router.push("news");
          }
        };
        deletenews();
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
          <SearchParamsWrapper>
            {(id) => {
              setId(id); // Set the `id` from SearchParamsWrapper
              return (
                <div className={styles.container}>
                  <Sidebar menu={menu} closeMenu={closeMenu} />
                  <main className={styles.main}>
                    <h1 style={{ display: "flex", alignItems: "center" }}>
                      Update News
                    </h1>

                    <div className={styles.recent_orders}>
                      <div className={styles.table}>
                        <form
                          action=""
                          onSubmit={handleSubmit(async (data) => {
                            try {
                              await axios.put("/api/news", {
                                ...data,
                                id,
                              });
                              Swal.fire({
                                title: "Success",
                                text: "News updated successfully",
                                icon: "success",
                              });
                              router.push("news");
                            } catch (error) {
                              toast.error(error.message);
                            }
                          })}
                        >
                          <Toaster position="bottom-left" />
                          <div className={styles.input}>
                            <span>
                              Headline: <span className={styles.import}>*</span>
                            </span>
                            <input
                              type="text"
                              name="headline"
                              {...register("headline")}
                            />
                            {errors.headline && (
                              <p>{errors.headline.message}</p>
                            )}
                          </div>

                          <div className={styles.input}>
                            <span>
                              Date:
                              <span className={styles.import}>*</span>
                            </span>
                            <input
                              type="text"
                              name="date"
                              {...register("date")}
                            />
                            {errors.date && <p>{errors.date.message}</p>}
                          </div>
                          <div className={styles.input}>
                            <span>
                              Content (1):{" "}
                              <span className={styles.import}>*</span>
                            </span>
                            <textarea
                              width="100%"
                              height="100%"
                              {...register("content1")}
                            />
                            {errors.content1 && (
                              <p>{errors.content1.message}</p>
                            )}
                          </div>
                          <div className={styles.input}>
                            <span>
                              Content (2):{" "}
                              <span className={styles.import}>*</span>
                            </span>
                            <textarea
                              width="100%"
                              height="100%"
                              {...register("content2")}
                            />
                            {errors.content2 && (
                              <p>{errors.content2.message}</p>
                            )}
                          </div>
                          <div className={styles.input}>
                            <span>
                              Content (3):{" "}
                              <span className={styles.import}>*</span>
                            </span>
                            <textarea
                              width="100%"
                              height="100%"
                              {...register("content3")}
                            />
                            {errors.content3 && (
                              <p>{errors.content3.message}</p>
                            )}
                          </div>

                          <button type="submit">Update news</button>
                        </form>
                        <button
                          className={styles.delete_btn}
                          onClick={handleDelete}
                        >
                          <MdDelete /> Delete News
                        </button>
                      </div>
                    </div>
                  </main>

                  <RightSide showMenu={showMenu} />
                </div>
              );
            }}
          </SearchParamsWrapper>
        </>
      )}
    </>
  );
}
