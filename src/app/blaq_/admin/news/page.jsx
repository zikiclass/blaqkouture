"use client";
import { useState, useEffect } from "react";
import styles from "../dashboard/style.module.css";
import Sidebar from "../components/sidebar";
import { MdDelete } from "react-icons/md";
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
import { newsSchema } from "@/app/validationSchema";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function News() {
  const [img1, setImg1] = useState("");

  const router = useRouter();
  const {
    register,
    handleSubmit,
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
  const getnews = async () => {
    const response = await axios.get(`/api/news`);
    if (response.data) setNewsList(response.data);
  };
  useEffect(() => {
    getnews();
  }, []);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (id) => {
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
            getnews();
            Swal.fire("Deleted!", "", "success");
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
          <div className={styles.container}>
            <Sidebar menu={menu} closeMenu={closeMenu} />
            <main className={styles.main}>
              <h1 style={{ display: "flex", alignItems: "center" }}>News</h1>

              <div className={styles.recent_orders}>
                <div className={styles.table}>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Headline</th>
                        <th>Date</th>

                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {newsList.map((list, index) => (
                        <tr key={index}>
                          <td>
                            <Link
                              prefetch={true}
                              href={`edit_news?id=${list.id}`}
                            >
                              #
                            </Link>
                          </td>
                          <td>
                            <Link
                              prefetch={true}
                              href={`edit_news?id=${list.id}`}
                            >
                              {list.headline}
                            </Link>
                          </td>
                          <td>
                            <Link
                              prefetch={true}
                              href={`edit_news?id=${list.id}`}
                            >
                              {list.date}
                            </Link>
                          </td>

                          <td
                            className={styles.actions}
                            onClick={() => handleDelete(list.id)}
                          >
                            <span className={styles.danger}>
                              <MdDelete />
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <h1
                    style={{
                      marginTop: "3rem",
                      fontWeight: "700",
                      fontSize: "1.4rem",
                      display: "flex",
                      alignItems: "center",
                      color: "#111e88",
                    }}
                  >
                    <IoMdAdd /> <span>Add news</span>
                  </h1>
                  <div
                    className={styles.imagesUpload}
                    style={{ marginTop: "1rem" }}
                  >
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
                              Select Image{" "}
                              <span className={styles.import}>*</span>
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
                          text: "Please select image",
                          icon: "error",
                        });
                      } else {
                        try {
                          await axios.post("/api/news", {
                            ...data,
                            img1,
                          });
                          Swal.fire({
                            title: "Success",
                            text: "news added successfully",
                            icon: "success",
                          });
                          router.push("dashboard");
                        } catch (error) {
                          toast.error(error.message);
                        }
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
                      {errors.headline && <p>{errors.headline.message}</p>}
                    </div>

                    <div className={styles.input}>
                      <span>
                        Date:
                        <span className={styles.import}>*</span>
                      </span>
                      <input type="text" name="date" {...register("date")} />
                      {errors.date && <p>{errors.date.message}</p>}
                    </div>
                    <div className={styles.input}>
                      <span>
                        Content (1): <span className={styles.import}>*</span>
                      </span>
                      <textarea
                        width="100%"
                        height="100%"
                        {...register("content1")}
                      />
                      {errors.content1 && <p>{errors.content1.message}</p>}
                    </div>
                    <div className={styles.input}>
                      <span>
                        Content (2): <span className={styles.import}>*</span>
                      </span>
                      <textarea
                        width="100%"
                        height="100%"
                        {...register("content2")}
                      />
                      {errors.content2 && <p>{errors.content2.message}</p>}
                    </div>
                    <div className={styles.input}>
                      <span>
                        Content (3): <span className={styles.import}>*</span>
                      </span>
                      <textarea
                        width="100%"
                        height="100%"
                        {...register("content3")}
                      />
                      {errors.content3 && <p>{errors.content3.message}</p>}
                    </div>

                    <button type="submit">
                      <IoMdAdd /> Add news
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
