"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import logo_black from "../../image/logo_black.png";
import SearchIcon from "@mui/icons-material/Search";
import { FiUser } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdMenu } from "react-icons/io";
import styles from "./style.module.css";
import { MdClose } from "react-icons/md";
export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleClick = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className={`${styles.header} ${isSticky ? styles.sticky : ""}`}>
      <Link href="#" className="logo">
        <Image src={logo_black} alt="logo" className={styles.logo} />
      </Link>
      <ul className={`${styles.navmenu} ${showMenu && styles.open}`}>
        <li>
          <Link href="#" className={styles.navlinks}>
            home
          </Link>
        </li>
        <li>
          <Link href="#" className={styles.navlinks}>
            shop
          </Link>
        </li>
        <li>
          <Link href="#" className={styles.navlinks}>
            products
          </Link>
        </li>
        <li>
          <Link href="#" className={styles.navlinks}>
            contact us
          </Link>
        </li>
      </ul>

      <div className={styles.navicon}>
        <Link href="#" className={styles.nav}>
          <SearchIcon />
        </Link>
        <Link href="#" className={styles.nav}>
          <FiUser />
        </Link>
        <Link href="#" className={styles.nav}>
          <FiShoppingCart />
        </Link>
        <div className={styles.menuicon} onClick={handleClick}>
          {!showMenu ? <IoMdMenu /> : <MdClose />}
        </div>
      </div>
    </div>
  );
}
