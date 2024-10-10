import styles from "./trendingproducts/style.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
export default function Product({ sale, img, amt, prevAmt, title }) {
  const router = useRouter();
  const handleClick = () => {
    router.push("/product");
  };
  return (
    <div className={styles.row}>
      <Image className={styles.img} src={img} alt="img" onClick={handleClick} />
      <div className={styles.producttext}>
        <h5>Sale</h5>
        <FaShoppingCart className={styles.cart} />
      </div>
      <div className={styles.addtocart}>
        <FaShoppingCart />
        Add to Cart
      </div>
      <div className={styles.ratting} onClick={handleClick}>
        <FaStar className={styles.ratestar} />
        <FaStar className={styles.ratestar} />
        <FaStar className={styles.ratestar} />
        <FaStar className={styles.ratestar} />
        <FaStarHalfAlt className={styles.ratestar} />
      </div>
      <div className={styles.price} onClick={handleClick}>
        <h4 onClick={handleClick}>Half Running Set</h4>
        <p onClick={handleClick}>N25,000 - N35,000</p>
      </div>
    </div>
  );
}
