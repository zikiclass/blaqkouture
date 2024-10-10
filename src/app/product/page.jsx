import styles from "./style.module.css";
import Contact from "@/components/contact/page";
import Footer from "@/components/footer/page";
import TrendingProducts from "@/components/trendingproducts/page";
import Image from "next/image";
import img from "../../image/a28f3b1c-00be-4f69-be0f-f916a31d8bf1 2.JPG";
export default function Product() {
  return (
    <>
      <section className={styles.product}>
        <div className={styles.imgs}>
          <Image src={img} alt="Image" />
        </div>
        <div className={styles.productdetails}>
          <h4>T-Shirt Blaq Kouture</h4>
          <span>₦ 78,000</span>
        </div>
      </section>
      <TrendingProducts />
      <Contact />
      <Footer />
    </>
  );
}
