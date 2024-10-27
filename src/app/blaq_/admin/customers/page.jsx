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

export default function Customers() {
  const [img1, setImg1] = useState("");

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

  const [customersList, setCustomers] = useState([]);
  const getCustomers = async () => {
    const response = await axios.get(`/api/register`);
    if (response.data) setCustomers(response.data);
  };
  useEffect(() => {
    getCustomers();
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
      title: "Do you want to delete this customer record?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const deletenews = async () => {
          const response = await axios.delete("/api/register", {
            params: { id },
          });
          if (response.status === 200) {
            getCustomers();
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
              <h1 style={{ display: "flex", alignItems: "center" }}>
                Customers
              </h1>

              <div className={styles.recent_orders}>
                <div className={styles.table}>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>

                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {customersList.map((list, index) => (
                        <tr key={index}>
                          <td>
                            <Link
                              prefetch={true}
                              href={`edit_news?id=${list.id}`}
                            >
                              {list.name}
                            </Link>
                          </td>
                          <td>
                            <Link
                              prefetch={true}
                              href={`edit_news?id=${list.id}`}
                            >
                              {list.email}
                            </Link>
                          </td>
                          <td>
                            <Link
                              prefetch={true}
                              href={`edit_news?id=${list.id}`}
                            >
                              {list.phone}
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
