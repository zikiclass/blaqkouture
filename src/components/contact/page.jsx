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
            PTI Road, Warri, <br /> Delta State, Nigeria
          </p>
          <p style={{ display: "flex", gap: "5px" }}>
            <FaPhoneAlt />
            09063152812
          </p>
          <p style={{ display: "flex", gap: "5px" }}>
            <MdOutlineEmail />
            info@blaqkouture.com
          </p>

          <div className={styles.socialicon}>
            <Link href="#" className={styles.icon}>
              <RiFacebookFill />
            </Link>
            <Link href="#" className={styles.icon}>
              <LuInstagram />
            </Link>
            <Link href="#" className={styles.icon}>
              <FaTwitter />
            </Link>
            <Link href="#" className={styles.icon}>
              <FaYoutube />
            </Link>
            <Link href="#" className={styles.icon}>
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
        <div className={styles.secondinfo}>
          <h4>Support</h4>
          <p>Contact Us</p>
          <p>About Us</p>
          <p>Size Guide</p>
          <p>Shopping & Resturns</p>
          <p>Privacy</p>
        </div>
        <div className={styles.thirdinfo}>
          <h4>Shop</h4>
          <p>Men's Shopping</p>
          <p>Women's Shopping</p>
          <p>Kid's Shopping</p>
          <p>Discount</p>
        </div>
        <div className={styles.fourthinfo}>
          <h4>Company</h4>
          <p>About</p>
          <p>Blog</p>
          <p>Affiliate</p>
          <p>Login</p>
        </div>
        <div className={styles.five}>
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
        </div>
      </div>
    </section>
  );
}
