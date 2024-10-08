import styles from "./style.module.css";
import imgClient from "../../image/bl-3.png";
import Image from "next/image";
export default function ClientReviews() {
  return (
    <section className={styles.clientreviews}>
      <div className={styles.reviews}>
        <h3>Client Reviews</h3>
        <Image src={imgClient} className={styles.img} alt="Client Image" />
        <p>
          lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          elusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis mnostrud exercitation ullamco laboris nisi ut{" "}
          <br />
          alliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum.
        </p>
        <h2>Mark Jevenue</h2>
        <p>CEO of Addle</p>
      </div>
    </section>
  );
}
