"use client";
import { useState, useEffect, useContext } from "react";
import styles from "../dashboard/style.module.css";
import { IoClose } from "react-icons/io5";
import { IoGrid } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoReceiptOutline } from "react-icons/io5";
import { MdInsights } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { MdOutlineInventory } from "react-icons/md";
import { MdReportGmailerrorred } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";

import logo from "@/image/logo_black.png";
import { GlobalContext } from "@/context";
export default function Sidebar({ menu, closeMenu }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Error during NextAuth sign out", error);
    }
  };

  const { activeLink, setActiveLink } = useContext(GlobalContext);
  return (
    <aside style={{ display: isMobile ? (menu ? "block" : "none") : "block" }}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <Image src={logo} alt="logo" className={styles.logoimg} />
          <h2>
            Blaq <span className={styles.info}>Kouture</span>
          </h2>
        </div>
        <div className={styles.close} onClick={closeMenu}>
          <IoClose />
        </div>
      </div>

      <div className={styles.sidebar}>
        <Link
          href="dashboard"
          className={`${styles.link} ${
            activeLink === "dashboard" && styles.active
          }`}
          onClick={() => setActiveLink("dashboard")}
        >
          <span>
            <IoGrid />
          </span>
          <h1>Dashboard</h1>
        </Link>
        <Link
          href="#"
          onClick={() => setActiveLink("customers")}
          className={`${styles.link} ${
            activeLink === "customers" && styles.active
          }`}
        >
          <span>
            <IoPersonOutline />
          </span>
          <h1>Customers</h1>
        </Link>
        <Link
          href="#"
          onClick={() => setActiveLink("orders")}
          className={`${styles.link} ${
            activeLink === "orders" && styles.active
          }`}
        >
          <span>
            <IoReceiptOutline />
          </span>
          <h1>Orders</h1>
        </Link>
        <Link
          href="#"
          onClick={() => setActiveLink("analytics")}
          className={`${styles.link} ${
            activeLink === "analytics" && styles.active
          }`}
        >
          <span>
            <MdInsights />
          </span>
          <h1>Analytics</h1>
        </Link>
        <Link
          href="#"
          onClick={() => setActiveLink("messages")}
          className={`${styles.link} ${
            activeLink === "messages" && styles.active
          }`}
        >
          <span>
            <IoMailOutline />
          </span>
          <h1>Messages</h1>
          <span className={styles.message_count}>20</span>
        </Link>
        <Link
          href="products"
          onClick={() => setActiveLink("products")}
          className={`${styles.link} ${
            activeLink === "products" && styles.active
          }`}
        >
          <span>
            <MdOutlineInventory />
          </span>
          <h1>Products</h1>
        </Link>
        <Link
          href="#"
          onClick={() => setActiveLink("reports")}
          className={`${styles.link} ${
            activeLink === "reports" && styles.active
          }`}
        >
          <span>
            <MdReportGmailerrorred />
          </span>
          <h1>Reports</h1>
        </Link>
        <Link
          href="#"
          onClick={() => setActiveLink("settings")}
          className={`${styles.link} ${
            activeLink === "settings" && styles.active
          }`}
        >
          <span>
            <IoMdSettings />
          </span>
          <h1>Settings</h1>
        </Link>
        <Link
          href="#"
          onClick={() => setActiveLink("feedback")}
          className={`${styles.link} ${
            activeLink === "feedback" && styles.active
          }`}
        >
          <span>
            <IoMdAdd />
          </span>
          <h1>Add Feedback</h1>
        </Link>
        <button onClick={handleSignOut} className={styles.link}>
          <IoLogOutOutline /> <h1>Logout</h1>
        </button>
      </div>
    </aside>
  );
}
