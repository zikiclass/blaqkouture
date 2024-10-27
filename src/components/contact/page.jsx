import styles from "./style.module.css";
import logo from "../../image/logo.png";
import Image from "next/image";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import { LuInstagram } from "react-icons/lu";
import { RiFacebookFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
export default function Contact() {
  return (
    <section className={styles.contact}>
      <div className={styles.contactinfo}>
        <div className={styles.firstinfo}>
          <Image src={logo} alt="Logo" className={styles.img} />
          <p style={{ display: "flex", gap: "5px" }}>
            <MdOutlineLocationOn />
            Ugbomro, Warri, <br /> Delta State, Nigeria
          </p>
          <p style={{ display: "flex", gap: "5px" }}>
            <FaPhoneAlt />
            09063152812
          </p>
          <p
            style={{ display: "flex", gap: "5px", textTransform: "lowercase" }}
          >
            <MdOutlineEmail />
            info@blaqkouture.com
          </p>

          <div className={styles.socialicon}>
            <Link prefetch={true} href="#" className={styles.icon}>
              <RiFacebookFill />
            </Link>
            <Link prefetch={true} href="#" className={styles.icon}>
              <LuInstagram />
            </Link>
            <Link prefetch={true} href="#" className={styles.icon}>
              <FaTwitter />
            </Link>
            <Link prefetch={true} href="#" className={styles.icon}>
              <FaYoutube />
            </Link>
            <Link prefetch={true} href="#" className={styles.icon}>
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
        <div className={styles.secondinfo}>
          <h4>Support</h4>
          <p>
            <Link prefetch={true} href="/contact">
              Contact Us
            </Link>
          </p>
          {/* <p>About Us</p>
          <p>Size Guide</p>
          <p>Shopping &amp; Resturns</p>
          <p>Privacy</p> */}
        </div>
        <div className={styles.thirdinfo}>
          <h4>Shop</h4>
          <p>
            <Link prefetch={true} href="/men">
              Men&apos;s Shopping
            </Link>
          </p>
          <p>
            <Link prefetch={true} href="/women">
              Women&apos;s Shopping
            </Link>
          </p>
          {/* <p>Kid&apos;s Shopping</p>
          <p>Discount</p> */}
        </div>
        <div className={styles.fourthinfo}>
          <h4>Company</h4>
          <p>About</p>
          <p>Blog</p>
          <p>Affiliate</p>
          <p>
            <Link prefetch={true} href="/signin">
              Login
            </Link>
          </p>
        </div>
        {/* <div className={styles.five}>
          <h4>Subscribe</h4>
          <p>
            Receive Updates, Hot Deals, Discounts Sent Straight In Your Inbox
            Daily
          </p>
          <p>
            Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit. Enum,
            Debitits.
          </p>
          <p>
            Receive Updates, Hot Deals, Discounts Sent Straight In Your Inbox
            Daily
          </p>
        </div> */}
      </div>
    </section>
  );
}
