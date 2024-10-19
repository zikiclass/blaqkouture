import styles from "../dashboard/style.module.css";
import { IoMenu } from "react-icons/io5";
import { IoSunnySharp } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import img1 from "@/image/bl-3.png";
import Image from "next/image";
import { HiShoppingCart } from "react-icons/hi";
import { MdLocalMall } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { useRouter } from "next/navigation";
export default function RightSide({ showMenu }) {
  const router = useRouter();
  return (
    <div className={styles.right}>
      <div className={styles.top}>
        <button>
          <span>
            <IoMenu onClick={showMenu} />
          </span>
        </button>
        <div className={styles.theme_toggler}>
          <span className={styles.actives}>
            <IoSunnySharp />
          </span>
          <span>
            <IoMoon />
          </span>
        </div>
        <div className={styles.profile}>
          <div className={styles.info}>
            <p>
              Hey, <b>Kelly</b>
            </p>
            <small className={styles.text_muted}>Admin</small>
          </div>
          <div className={styles.profile_photo}>
            <Image src={img1} alt="profile" className={styles.profimg} />
          </div>
        </div>
      </div>

      <div className={styles.recent_updates}>
        <h2>Recent Updates</h2>
        <div className={styles.updates}>
          <div className={styles.update}>
            <div className={styles.profile_photo}>
              <Image src={img1} alt="photo" className={styles.profimg} />
            </div>
            <div className={styles.message}>
              <p>
                <b>Mike Tyson </b>received his order of Night lion tech GPS
                drone.
              </p>
              <small className={styles.text_muted}>2 Minutes Ago</small>
            </div>
          </div>
        </div>

        <div className={styles.sales_analytics}>
          <h2>Sales Analytics</h2>
          <div className={`${styles.item} ${styles.online}`}>
            <div className={styles.icon}>
              <span>
                <HiShoppingCart />
              </span>
            </div>
            <div className={styles.right}>
              <div className={styles.info}>
                <h3>ONLINE ORDERS</h3>
                <small className={styles.text_muted}>Last 24 Hours</small>
              </div>
              <h5 className={styles.success}>+39%</h5>
              <h3>3849</h3>
            </div>
          </div>
          <div className={`${styles.item} ${styles.offline}`}>
            <div className={styles.icon}>
              <span>
                <MdLocalMall />
              </span>
            </div>
            <div className={styles.right}>
              <div className={styles.info}>
                <h3>OFFLINE ORDERS</h3>
                <small className={styles.text_muted}>Last 24 Hours</small>
              </div>
              <h5 className={styles.danger}>-17%</h5>
              <h3>1100</h3>
            </div>
          </div>
          <div className={`${styles.item} ${styles.customers}`}>
            <div className={styles.icon}>
              <span>
                <IoPerson />
              </span>
            </div>
            <div className={styles.right}>
              <div className={styles.info}>
                <h3>NEW CUSTOMERS</h3>
                <small className={styles.text_muted}>Last 24 Hours</small>
              </div>
              <h5 className={styles.success}>+25%</h5>
              <h3>849</h3>
            </div>
          </div>
          <div
            className={`${styles.item} ${styles.add_product}`}
            onClick={() => router.push("add_new_product")}
          >
            <div>
              <span>
                <IoMdAdd />
              </span>
              <h3>Add Product</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
