import Image from "next/image";
import styles from "./style.module.css";
import img1 from "../../image/1.jpg";
import img2 from "../../image/2.jpg";
import img3 from "../../image/3.jpg";
import img4 from "../../image/4.jpg";
import img5 from "../../image/5.jpg";
import img6 from "../../image/6.jpg";
import img7 from "../../image/7.jpg";
import img8 from "../../image/8.jpg";
import { FaRegHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
export default function TrendingProducts() {
  return (
    <section className={styles.trendingproducts}>
      <div className={styles.centertext}>
        <h2>
          Our Trending <span>Collections</span>
        </h2>
      </div>
      <div className={styles.products}>
        <div className={styles.row}>
          <Image className={styles.img} src={img5} alt="img" />
          <div className={styles.producttext}>
            <h5>Sale</h5>
          </div>
          <div className={styles.hearticon}>
            <FaRegHeart />
          </div>
          <div className={styles.ratting}>
            <FaStar className={styles.ratestar} />
            <FaStar className={styles.ratestar} />
            <FaStar className={styles.ratestar} />
            <FaStar className={styles.ratestar} />
            <FaStarHalfAlt className={styles.ratestar} />
          </div>
          <div className={styles.price}>
            <h4>Half Running Set</h4>
            <p>N25,000 - N35,000</p>
          </div>
        </div>

        <div className={styles.row}>
          <Image className={styles.img} src={img4} alt="img" />
          <div className={styles.producttext}>
            <h5>Sale</h5>
          </div>
          <div className={styles.hearticon}>
            <FaRegHeart />
          </div>
          <div className={styles.ratting}>
            <FaStar className={styles.ratestar} />
            <FaStar className={styles.ratestar} />
            <FaStar className={styles.ratestar} />
            <FaStar className={styles.ratestar} />
            <FaStarHalfAlt className={styles.ratestar} />
          </div>
          <div className={styles.price}>
            <h4>Half Running Set</h4>
            <p>N25,000 - N35,000</p>
          </div>
        </div>

        <div className={styles.row}>
          <Image className={styles.img} src={img6} alt="img" />
          <div className={styles.producttext}>
            <h5>Sale</h5>
          </div>
          <div className={styles.hearticon}>
            <FaRegHeart />
          </div>
          <div className={styles.ratting}>
            <FaStar className={styles.ratestar} />
            <FaStar className={styles.ratestar} />
            <FaStar className={styles.ratestar} />
            <FaStar className={styles.ratestar} />
            <FaStarHalfAlt className={styles.ratestar} />
          </div>
          <div className={styles.price}>
            <h4>Half Running Set</h4>
            <p>N25,000 - N35,000</p>
          </div>
        </div>

        <div className={styles.row}>
          <Image className={styles.img} src={img2} alt="img" />
          <div className={styles.producttext}>
            <h5>Sale</h5>
          </div>
          <div className={styles.hearticon}>
            <FaRegHeart />
          </div>
          <div className={styles.ratting}>
            <FaStar className={styles.ratestar} />
            <FaStar className={styles.ratestar} />
            <FaStar className={styles.ratestar} />
            <FaStar className={styles.ratestar} />
            <FaStarHalfAlt className={styles.ratestar} />
          </div>
          <div className={styles.price}>
            <h4>Half Running Set</h4>
            <p>N25,000 - N35,000</p>
          </div>
        </div>

        <div className={styles.row}>
          <Image className={styles.img} src={img1} alt="img" />
          <div className={styles.producttext}>
            <h5>Sale</h5>
          </div>
          <div className={styles.hearticon}>
            <FaRegHeart />
          </div>
          <div className={styles.ratting}>
            <FaStar className={styles.ratestar} />
            <FaStar className={styles.ratestar} />
            <FaStar className={styles.ratestar} />
            <FaStar className={styles.ratestar} />
            <FaStarHalfAlt className={styles.ratestar} />
          </div>
          <div className={styles.price}>
            <h4>Half Running Set</h4>
            <p>N25,000 - N35,000</p>
          </div>
        </div>

        <div className={styles.row}>
          <Image className={styles.img} src={img3} alt="img" />
          <div className={styles.producttext}>
            <h5>Sale</h5>
          </div>
          <div className={styles.hearticon}>
            <FaRegHeart />
          </div>
          <div className={styles.ratting}>
            <FaStar className={styles.ratestar} />
            <FaStar className={styles.ratestar} />
            <FaStar className={styles.ratestar} />
            <FaStar className={styles.ratestar} />
            <FaStarHalfAlt className={styles.ratestar} />
          </div>
          <div className={styles.price}>
            <h4>Half Running Set</h4>
            <p>N25,000 - N35,000</p>
          </div>
        </div>

        <div className={styles.row}>
          <Image className={styles.img} src={img7} alt="img" />
          <div className={styles.producttext}>
            <h5>Sale</h5>
          </div>
          <div className={styles.hearticon}>
            <FaRegHeart />
          </div>
          <div className={styles.ratting}>
            <FaStar className={styles.ratestar} />
            <FaStar className={styles.ratestar} />
            <FaStar className={styles.ratestar} />
            <FaStar className={styles.ratestar} />
            <FaStarHalfAlt className={styles.ratestar} />
          </div>
          <div className={styles.price}>
            <h4>Half Running Set</h4>
            <p>N25,000 - N35,000</p>
          </div>
        </div>

        <div className={styles.row}>
          <Image className={styles.img} src={img8} alt="img" />
          <div className={styles.producttext}>
            <h5>Sale</h5>
          </div>
          <div className={styles.hearticon}>
            <FaRegHeart />
          </div>
          <div className={styles.ratting}>
            <FaStar className={styles.ratestar} />
            <FaStar className={styles.ratestar} />
            <FaStar className={styles.ratestar} />
            <FaStar className={styles.ratestar} />
            <FaStarHalfAlt className={styles.ratestar} />
          </div>
          <div className={styles.price}>
            <h4>Half Running Set</h4>
            <p>N25,000 - N35,000</p>
          </div>
        </div>
      </div>
    </section>
  );
}
