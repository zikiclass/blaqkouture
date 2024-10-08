import Link from "next/link";
import styles from "./style.module.css";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
export default function MainContent() {
  return (
    <section className={styles.mainhome}>
      <div className={styles.maintext}>
        <h5>Blaqkouture Collection</h5>
        <h1>
          New Blaqkouture <br />
          Collection
        </h1>
        <p>There&apos;s Nothing like Trend</p>
        <Link href="#" className={styles.mainbtn}>
          <span>Shop Now </span>
          <FaArrowRight />
        </Link>
      </div>
      {/* <div className={styles.downarrow}>
        <Link href="#">
          <FaArrowDown className={styles.down} />
        </Link>
      </div> */}
    </section>
  );
}
