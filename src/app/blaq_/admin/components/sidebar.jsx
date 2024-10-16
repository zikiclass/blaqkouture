"use client";
import { useState, useEffect } from "react";
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

import logo from "@/image/logo_black.png";
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
        <Link href="#" className={`${styles.link} ${styles.active}`}>
          <span>
            <IoGrid />
          </span>
          <h1>Dashboard</h1>
        </Link>
        <Link href="#" className={styles.link}>
          <span>
            <IoPersonOutline />
          </span>
          <h1>Customers</h1>
        </Link>
        <Link href="#" className={styles.link}>
          <span>
            <IoReceiptOutline />
          </span>
          <h1>Orders</h1>
        </Link>
        <Link href="#" className={styles.link}>
          <span>
            <MdInsights />
          </span>
          <h1>Analytics</h1>
        </Link>
        <Link href="#" className={styles.link}>
          <span>
            <IoMailOutline />
          </span>
          <h1>Messages</h1>
          <span className={styles.message_count}>20</span>
        </Link>
        <Link href="#" className={styles.link}>
          <span>
            <MdOutlineInventory />
          </span>
          <h1>Products</h1>
        </Link>
        <Link href="#" className={styles.link}>
          <span>
            <MdReportGmailerrorred />
          </span>
          <h1>Reports</h1>
        </Link>
        <Link href="#" className={styles.link}>
          <span>
            <IoMdSettings />
          </span>
          <h1>Settings</h1>
        </Link>
        <Link href="#" className={styles.link}>
          <span>
            <IoMdAdd />
          </span>
          <h1>Add Feedback</h1>
        </Link>
        <Link href="#" className={styles.link}>
          <IoLogOutOutline /> <h1>Logout</h1>
        </Link>
      </div>
    </aside>
  );
}
