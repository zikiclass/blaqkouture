"use client";
import { useState, useEffect } from "react";
import styles from "../dashboard/style.module.css";
import Sidebar from "../components/sidebar";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import RightSide from "../components/rightside";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
export default function Messages() {
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const { data: session, status } = useSession();
  const [message, setMessage] = useState([]);
  const getMessages = async () => {
    const response = await axios.get(`/api/message`);
    if (response.data) setMessage(response.data);
  };
  useEffect(() => {
    getMessages();
  }, []);
  const showMenu = () => {
    setMenu(true);
  };
  const closeMenu = () => {
    setMenu(false);
  };
  if (status === "unauthenticated") {
    router.push("signin");
  }
  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "EEEE dd, MMMM yyyy hh:mm:ss a");
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (messageId) => {
    Swal.fire({
      title: "Do you want to delete this message?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const msgDelete = async () => {
          const response = await axios.delete("/api/message", {
            params: { messageId },
          });
          if (response.status === 200) {
            getMessages();
            Swal.fire("Deleted!", "", "success");
          }
        };
        msgDelete();
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
              <h1>Messages</h1>

              <div className={styles.recent_orders}>
                <div className={styles.table}>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>

                        <th className={styles.dates}>Date</th>

                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {message.map((list, index) => (
                        <tr key={index}>
                          <td>
                            <Link href="#">{list.name}</Link>
                          </td>
                          <td>
                            <Link href="#">{list.email}</Link>
                          </td>
                          <td>
                            <Link href="#">
                              <b>{list.subject}</b>
                              <br />
                              {list.message}
                            </Link>
                          </td>

                          <td className={styles.dates}>
                            <Link href="#">{formatDate(list.date)}</Link>
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
                {/* <Link prefetch={true}href="#" className={styles.showAll}>
                  Show All
                </Link> */}
              </div>
            </main>

            <RightSide showMenu={showMenu} />
          </div>
        </>
      )}
    </>
  );
}
