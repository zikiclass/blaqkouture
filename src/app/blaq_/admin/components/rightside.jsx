"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../dashboard/style.module.css";
import { IoMenu } from "react-icons/io5";
import { IoSunnySharp } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import img1 from "@/image/avatar.png";
import Image from "next/image";
import { HiShoppingCart } from "react-icons/hi";
import { MdLocalMall } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
export default function RightSide({ showMenu }) {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [offlineOrders, setOfflineOrders] = useState([]);
  const getUsers = async () => {
    try {
      const response = await axios.get(`/api/register`);
      if (response.data) setUsers(response.data);
    } catch (e) {}
  };
  const getOfflineOrders = async () => {
    try {
      const response = await axios.get(`/api/order/all`);
      if (response.data) setOfflineOrders(response.data);
    } catch (e) {}
  };
  useEffect(() => {
    getUsers();
    getOfflineOrders();
  }, []);
  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Error during NextAuth sign out", error);
    }
  };

  return (
    <div className={styles.right}>
      <div className={styles.top}>
        <button>
          <span>
            <IoMenu onClick={showMenu} />
          </span>
        </button>
        {/* <div className={styles.theme_toggler}>
          <span className={styles.actives}>
            <IoSunnySharp />
          </span>
          <span>
            <IoMoon />
          </span>
        </div> */}
        <div className={styles.profile}>
          <div className={styles.info}>
            <p>
              Hey, <b>Blaq</b>
            </p>
            <small className={styles.text_muted}>Admin</small>
          </div>
          <div onClick={handleSignOut} className={styles.profile_photo}>
            <Image src={img1} alt="profile" className={styles.profimg} />
          </div>
        </div>
      </div>

      <div className={styles.recent_updates}>
        <div className={styles.sales_analytics}>
          <h2>Sales Analytics</h2>
          <div className={`${styles.item} ${styles.online}`}>
            <div className={styles.icon}>
              <span>
                <HiShoppingCart />
              </span>
            </div>
            <div className={styles.right}>
              <div className={styles.info}>
                <h3>ONLINE ORDERS</h3>
              </div>
              <h5 className={styles.success}>0</h5>
            </div>
          </div>
          <div className={`${styles.item} ${styles.offline}`}>
            <div className={styles.icon}>
              <span>
                <MdLocalMall />
              </span>
            </div>
            <div className={styles.right}>
              <div className={styles.info}>
                <h3>OFFLINE ORDERS</h3>
              </div>
              <h5 className={styles.danger}>{offlineOrders.length}</h5>
            </div>
          </div>
          <div className={`${styles.item} ${styles.customers}`}>
            <div className={styles.icon}>
              <span>
                <IoPerson />
              </span>
            </div>
            <div className={styles.right}>
              <div className={styles.info}>
                <h3>NEW CUSTOMERS</h3>
              </div>
              <h5 className={styles.success}>{users.length}</h5>
            </div>
          </div>
          <div
            className={`${styles.item} ${styles.add_product}`}
            onClick={() => router.push("add_new_product")}
          >
            <div>
              <span>
                <IoMdAdd />
              </span>
              <h3>Add Product</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
