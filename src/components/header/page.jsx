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
import { FaUserTie } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useCart } from "@/context/cartContext";
export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { data: session, status } = useSession();
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
  const handleRemove = () => {
    setShowMenu(false);
  };

  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Error during NextAuth sign out", error);
    }
  };
  const { cart } = useCart();
  const itemCount = cart.length;
  return (
    <>
      <div className={styles.topbar}>
        <marquee>
          BLAQ KOUTURE - EST. 2024 - DRIP WITH STYLE ✅🔥 &nbsp;&nbsp; BLAQ
          KOUTURE - EST. 2024 - DRIP WITH STYLE ✅🔥
        </marquee>
      </div>
      <div className={`${styles.header} ${isSticky ? styles.sticky : ""}`}>
        <Link href="/" className="logo">
          <Image src={logo_black} alt="logo" className={styles.logo} />
        </Link>
        <ul className={`${styles.navmenu} ${showMenu && styles.open}`}>
          <li>
            <Link href="/" className={styles.navlinks} onClick={handleRemove}>
              home
            </Link>
          </li>
          <li>
            <Link
              href="collections"
              onClick={handleRemove}
              className={styles.navlinks}
            >
              collections
            </Link>
          </li>
          <li>
            <Link href="men" className={styles.navlinks} onClick={handleRemove}>
              men
            </Link>
          </li>
          <li>
            <Link
              href="women"
              className={styles.navlinks}
              onClick={handleRemove}
            >
              women
            </Link>
          </li>

          <li>
            <Link
              href="contact"
              className={styles.navlinks}
              onClick={handleRemove}
            >
              contact us
            </Link>
          </li>
        </ul>

        <div className={styles.navicon}>
          {/* <Link href="#" className={styles.nav}>
            <SearchIcon />
          </Link> */}

          {status === "unauthenticated" ? (
            <Link href="signin" className={styles.nav}>
              <FiUser />
            </Link>
          ) : (
            <button onClick={handleSignOut} className={styles.nav}>
              <FaUserTie /> <span className={styles.smallText}>Sign Out</span>
            </button>
          )}
          <Link href="cart" className={styles.nav}>
            <FiShoppingCart />{" "}
            <span className={styles.cartCount}>{itemCount}</span>
          </Link>
          <div className={styles.menuicon} onClick={handleClick}>
            {!showMenu ? <IoMdMenu /> : <MdClose />}
          </div>
        </div>
      </div>
    </>
  );
}
