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
import { feedbackSchema } from "@/app/validationSchema";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function Feedback() {
  const [addTitle, setAddTitle] = useState("Add Feedback");
  const [img1, setImg1] = useState("");
  const [file, setFile] = useState(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
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

  const [feedbackList, setFeedbackList] = useState([]);
  const getFeedback = async () => {
    const response = await axios.get(`/api/feedback`);
    if (response.data) setFeedbackList(response.data);
  };
  useEffect(() => {
    getFeedback();
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
            getFeedback();
            Swal.fire("Deleted!", "", "success");
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
          <div className={styles.container}>
            <Sidebar menu={menu} closeMenu={closeMenu} />
            <main className={styles.main}>
              <h1 style={{ display: "flex", alignItems: "center" }}>
                Feedback
              </h1>

              <div className={styles.recent_orders}>
                <div className={styles.table}>
                  <table>
                    <thead>
                      <tr>
                        <th>Position</th>
                        <th>Name</th>
                        <th>
                          <center>Content</center>
                        </th>
                        <th className={styles.dates}></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedbackList.map((list, index) => (
                        <tr key={index}>
                          <td>
                            <Link
                              prefetch={true}
                              href={`edit_feedback?id=${list.id}`}
                            >
                              {list.position}
                            </Link>
                          </td>
                          <td>
                            <Link
                              prefetch={true}
                              href={`edit_feedback?id=${list.id}`}
                            >
                              {list.name}
                            </Link>
                          </td>
                          <td>
                            <Link
                              prefetch={true}
                              href={`edit_feedback?id=${list.id}`}
                            >
                              {list.content}
                            </Link>
                          </td>
                          <td className={styles.dates}>
                            <Link
                              prefetch={true}
                              href={`edit_feedback?id=${list.id}`}
                            >
                              {" "}
                              <CldImage
                                src={list.image}
                                width={100}
                                height={100}
                                alt="Blaq Kouture"
                                style={{
                                  borderRadius: "50%",
                                  height: "50px",
                                  width: "70px",
                                }}
                              />{" "}
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
                    <IoMdAdd /> <span>Add Feedback</span>
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

                      <label className={styles.customLabel}>
                        Choose image <span style={{ color: "red" }}>*</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          style={{ marginBottom: "1rem" }}
                          className={styles.customInput}
                        />
                      </label>
                    </div>
                  </div>
                  <form
                    action=""
                    onSubmit={handleSubmit(async (data) => {
                      setAddTitle("Adding Feedback...");
                      if (!img1) {
                        Swal.fire({
                          title: "Error",
                          text: "Please select image",
                          icon: "error",
                        });
                      } else {
                        const formData = new FormData();
                        formData.append("file", file);
                        formData.append("upload_preset", "czg2ltv9");

                        try {
                          const uploadResponse = await axios.post(
                            "https://api.cloudinary.com/v1_1/dd0yi5utp/image/upload",
                            formData
                          );

                          const imagePublicId = uploadResponse.data.public_id;

                          await axios.post("/api/feedback", {
                            ...data,
                            images: img1 ? imagePublicId : "",
                          });
                          Swal.fire({
                            title: "Success",
                            text: "Feedback added successfully",
                            icon: "success",
                          });
                          router.push("dashboard");
                        } catch (error) {
                          setAddTitle("Add Feedback");
                          toast.error(error.message);
                        }
                      }
                    })}
                  >
                    <Toaster position="bottom-left" />
                    <div className={styles.input}>
                      <span>
                        Name: <span className={styles.import}>*</span>
                      </span>
                      <input type="text" name="name" {...register("name")} />
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
                      {errors.position && <p>{errors.position.message}</p>}
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

                    <button type="submit">
                      {addTitle === "Add Feedback" && <IoMdAdd />} {addTitle}
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
