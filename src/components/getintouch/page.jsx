import styles from "./style.module.css";
import { TfiHome } from "react-icons/tfi";
import { FaPhoneVolume } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
export default function GetInTouch() {
  return (
    <section className={styles.getintouch}>
      <div className={styles.form}>
        <h3>Get in Touch</h3>
        <form>
          <textarea name="message" placeholder="Enter Message"></textarea>
          <div className={styles.row}>
            <input type="text" placeholder="Enter your name" />
            <input type="email" placeholder="Email" />
          </div>
          <input type="text" placeholder="Enter Subject" />
          <button type="submit">
            <span>Send</span>
          </button>
        </form>
      </div>
      <div className={styles.contact}>
        <div className={styles.col}>
          <div className={styles.icon}>
            <TfiHome />
          </div>
          <div className={styles.content}>
            <p>Ugbomoro, Warri</p>
            <span>Delta State, Nigeria</span>
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.icon}>
            <FaPhoneVolume />
          </div>
          <div className={styles.content}>
            <p>+2349063152812</p>
            <span>Mon to Fri 9am to 6pm</span>
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.icon}>
            <TfiEmail />
          </div>
          <div className={styles.content}>
            <p>info@blaqkouture.com</p>
            <span>Send us your query anytime!</span>
          </div>
        </div>
      </div>
    </section>
  );
}
