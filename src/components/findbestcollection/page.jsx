import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import styles from "./style.module.css";
import img1 from "../../image/IMG_82382345.png";
import img2 from "../../image/IMG_82381321.png";
export default function FindBestCollection() {
  return (
    <div className={styles.bestcollection}>
      <Image src={img1} alt="Image" className={styles.img} />
      <div className={styles.content}>
        <div>
          <h2>Find the best drip from our shop</h2>
          <p>Drip with style</p>
          <Link href="#" className={styles.mainbtn}>
            <span>Shop Now </span>
            <FaArrowRight />
          </Link>
        </div>
        <Image src={img2} alt="shortimg" className={styles.shortimg} />
      </div>
    </div>
  );
}
