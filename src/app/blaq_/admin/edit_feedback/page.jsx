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
import { feedbackSchema } from "@/app/validationSchema";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import SearchParamsWrapper from "../components/suspensewrap";

export default function EditFeedback() {
  const router = useRouter();
  const [id, setId] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(feedbackSchema) });

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

  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const getFeedback = async () => {
      try {
        const response = await axios.get(
          `/api/feedback/uniquefeedback?id=${id}`
        );
        if (response.data) setFeedbackList(response.data);
      } catch (error) {}
    };

    getFeedback();
  }, [id]);

  useEffect(() => {
    if (feedbackList) {
      setValue("name", feedbackList.name);
      setValue("position", feedbackList.position);
      setValue("content", feedbackList.content);
    }
  }, [feedbackList, setValue]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = () => {
    Swal.fire({
      title: "Do you want to delete this feedback?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const deleteFeedback = async () => {
          const response = await axios.delete("/api/feedback", {
            params: { id },
          });
          if (response.status === 200) {
            Swal.fire("Deleted!", "", "success");
            router.push("feedback");
          }
        };
        deleteFeedback();
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
                      Update Feedback
                    </h1>

                    <div className={styles.recent_orders}>
                      <div className={styles.table}>
                        <form
                          action=""
                          onSubmit={handleSubmit(async (data) => {
                            try {
                              await axios.put("/api/feedback", {
                                ...data,
                                id,
                              });
                              Swal.fire({
                                title: "Success",
                                text: "Feedback updated successfully",
                                icon: "success",
                              });
                              router.push("feedback");
                            } catch (error) {
                              toast.error(error.message);
                            }
                          })}
                        >
                          <Toaster position="bottom-left" />
                          <div className={styles.input}>
                            <span>
                              Name: <span className={styles.import}>*</span>
                            </span>
                            <input
                              type="text"
                              name="name"
                              {...register("name")}
                            />
                            {errors.name && <p>{errors.name.message}</p>}
                          </div>

                          <div className={styles.input}>
                            <span>
                              Position / Status / Job Role:{" "}
                              <span className={styles.import}>*</span>
                            </span>
                            <input
                              type="text"
                              name="position"
                              {...register("position")}
                            />
                            {errors.position && (
                              <p>{errors.position.message}</p>
                            )}
                          </div>
                          <div className={styles.input}>
                            <span>
                              Content: <span className={styles.import}>*</span>
                            </span>
                            <textarea
                              width="100%"
                              height="100%"
                              {...register("content")}
                            />
                            {errors.content && <p>{errors.content.message}</p>}
                          </div>

                          <button type="submit">Update Feedback</button>
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
        </>
      )}
    </>
  );
}
