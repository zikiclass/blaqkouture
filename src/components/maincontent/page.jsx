import Link from "next/link";
import styles from "./style.module.css";
import { FaArrowRight } from "react-icons/fa6";
import img1 from "../../image/IMG_8239.jpg";
import img2 from "../../image/IMG_82382345.png";
import img3 from "../../image/IMG_82382567.png";
import img4 from "../../image/IMG_823890345.png";
import Image from "next/image";
export default function MainContent() {
  return (
    <section className={styles.mainhome}>
      <div className={styles.container}>
        <div className={styles.maintext}>
          <h5>Blaq kouture Collection</h5>
          <h1>
            New Blaq Kouture <br />
            Collection
          </h1>
          <p>
            Drip With Style <br />
            EST. 2024
          </p>

          <Link href="#" className={styles.mainbtn}>
            <span>Shop Now </span>
            <FaArrowRight />
          </Link>
        </div>

        <div className={styles.row}>
          <Image src={img1} alt="Display Image" className={styles.img} />
        </div>
      </div>
    </section>
  );
}
