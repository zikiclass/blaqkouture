import styles from "./style.module.css";
import img1 from "../../image/bl-1.png";
import img2 from "../../image/bl-2.png";
import Image from "next/image";
export default function News() {
  return (
    <section className={styles.updatenews}>
      <div className={styles.upcentertext}>
        <h2>New Updates</h2>
      </div>
      <div className={styles.updatecart}>
        <div className={styles.cart}>
          <Image className={styles.img} src={img1} alt="News1" />
          <h5>26 Sept. 2024</h5>
          <h4>Let's start bring sale on this summer vacation.</h4>
          <p>
            Lorem ipsuum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis
          </p>
          <h6>Continue Reading...</h6>
        </div>
        <div className={styles.cart}>
          <Image className={styles.img} src={img2} alt="News1" />
          <h5>26 Sept. 2024</h5>
          <h4>Let's start bring sale on this summer vacation.</h4>
          <p>
            Lorem ipsuum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis
          </p>
          <h6>Continue Reading...</h6>
        </div>
        <div className={styles.cart}>
          <Image className={styles.img} src={img1} alt="News1" />
          <h5>26 Sept. 2024</h5>
          <h4>Let's start bring sale on this summer vacation.</h4>
          <p>
            Lorem ipsuum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis
          </p>
          <h6>Continue Reading...</h6>
        </div>
      </div>
    </section>
  );
}
