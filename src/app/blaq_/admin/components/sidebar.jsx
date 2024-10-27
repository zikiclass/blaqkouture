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
import axios from "axios";
import logo from "@/image/logo_black.png";
import { GlobalContext } from "@/context";
export default function Sidebar({ menu, closeMenu }) {
  const [isMobile, setIsMobile] = useState(false);
  const [message, setMessage] = useState([]);
  const [products, setProducts] = useState([]);
  const [news, setNews] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [users, setUsers] = useState([]);

  const getMessages = async () => {
    try {
      const response = await axios.get(`/api/message`);
      if (response.data) setMessage(response.data);
    } catch (e) {}
  };
  const getProducts = async () => {
    try {
      const response = await axios.get(`/api/product`);
      if (response.data) setProducts(response.data);
    } catch (e) {}
  };
  const getNews = async () => {
    try {
      const response = await axios.get(`/api/news`);
      if (response.data) setNews(response.data);
    } catch (e) {}
  };
  const getFeedbacks = async () => {
    try {
      const response = await axios.get(`/api/feedback`);
      if (response.data) setFeedbacks(response.data);
    } catch (e) {}
  };
  const getUsers = async () => {
    try {
      const response = await axios.get(`/api/register`);
      if (response.data) setUsers(response.data);
    } catch (e) {}
  };

  useEffect(() => {
    getMessages();
    getProducts();
    getNews();
    getFeedbacks();
    getUsers();
  }, []);

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
        <Link href="dashboard" className={styles.link}>
          <span>
            <IoGrid />
          </span>
          <h1>Dashboard</h1>
        </Link>
        <Link href="customers" className={styles.link}>
          <span>
            <IoPersonOutline />
          </span>
          <h1>Customers</h1>
          <span
            className={styles.message_count}
            style={{ backgroundColor: "var(--color-success)" }}
          >
            {users.length}
          </span>
        </Link>
        <Link href="#" className={styles.link}>
          <span>
            <IoReceiptOutline />
          </span>
          <h1>Orders</h1>
        </Link>

        <Link href="messages" className={styles.link}>
          <span>
            <IoMailOutline />
          </span>
          <h1>Messages</h1>
          <span className={styles.message_count}>{message.length}</span>
        </Link>
        <Link href="products" className={styles.link}>
          <span>
            <MdOutlineInventory />
          </span>
          <h1>Products</h1>
          <span
            className={styles.message_count}
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            {products.length}
          </span>
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
        <Link href="news" className={styles.link}>
          <span>
            <MdInsights />
          </span>
          <h1>New Updates</h1>
          <span
            className={styles.message_count}
            style={{ backgroundColor: "var(--color-success)" }}
          >
            {news.length}
          </span>
        </Link>
        <Link href="feedback" className={styles.link}>
          <span>
            <IoMdAdd />
          </span>
          <h1>Feedback</h1>
          <span
            className={styles.message_count}
            style={{ backgroundColor: "var(--color-primary-variant)" }}
          >
            {feedbacks.length}
          </span>
        </Link>
        <button onClick={handleSignOut} className={styles.link}>
          <IoLogOutOutline /> <h1>Logout</h1>
        </button>
      </div>
    </aside>
  );
}
