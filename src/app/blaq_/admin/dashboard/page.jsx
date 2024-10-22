"use client";
import { useState, useEffect } from "react";
import styles from "./style.module.css";
import Sidebar from "../components/sidebar";
import { MdAnalytics } from "react-icons/md";
import { MdOutlineBarChart } from "react-icons/md";
import { MdStackedLineChart } from "react-icons/md";
import Link from "next/link";
import RightSide from "../components/rightside";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
export default function Admin() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [menu, setMenu] = useState(false);
  const showMenu = () => {
    setMenu(true);
  };
  const closeMenu = () => {
    setMenu(false);
  };
  if (status === "unauthenticated") {
    router.push("signin");
  }

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.container}>
            <Sidebar menu={menu} closeMenu={closeMenu} />
            <main className={styles.main}>
              <h1>Dashboard</h1>
              <div className={styles.insights}>
                <div className={styles.sales}>
                  <span>
                    <MdAnalytics className={styles.insights_icon} />
                  </span>
                  <div className={styles.middle}>
                    <div className={styles.left}>
                      <h3>Total Sales</h3>
                      <h1>₦1,900,000</h1>
                    </div>
                    <div className={styles.progress}>
                      <svg>
                        <circle cx="38" cy="38" r="36"></circle>
                      </svg>
                      <div className={styles.number}>
                        <p>81%</p>
                      </div>
                    </div>
                  </div>
                  <small className={styles.text_muted}>Last 24 Hours</small>
                </div>

                <div className={styles.expenses}>
                  <span>
                    <MdOutlineBarChart className={styles.insights_icon_exp} />
                  </span>
                  <div className={styles.middle}>
                    <div className={styles.left}>
                      <h3>Total Expenses</h3>
                      <h1>₦4,800,000</h1>
                    </div>
                    <div className={styles.progress}>
                      <svg>
                        <circle cx="38" cy="38" r="36"></circle>
                      </svg>
                      <div className={styles.number}>
                        <p>62%</p>
                      </div>
                    </div>
                  </div>
                  <small className={styles.text_muted}>Last 24 Hours</small>
                </div>

                <div className={styles.income}>
                  <span>
                    <MdStackedLineChart
                      className={styles.insights_icon_income}
                    />
                  </span>
                  <div className={styles.middle}>
                    <div className={styles.left}>
                      <h3>Total Income</h3>
                      <h1>₦19,600,000</h1>
                    </div>
                    <div className={styles.progress}>
                      <svg>
                        <circle cx="38" cy="38" r="36"></circle>
                      </svg>
                      <div className={styles.number}>
                        <p>44%</p>
                      </div>
                    </div>
                  </div>
                  <small className={styles.text_muted}>Last 24 Hours</small>
                </div>
              </div>

              <div className={styles.recent_orders}>
                <h1>Recent Orders</h1>
                <div className={styles.table}>
                  <table>
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Product Number</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Foladable Mini Drone</td>
                        <td>85631</td>
                        <td>Due</td>
                        <td className={styles.warning}>Pending</td>
                        <td className={styles.primary}>Details</td>
                      </tr>
                      <tr>
                        <td>Foladable Mini Drone</td>
                        <td>85631</td>
                        <td>Due</td>
                        <td className={styles.warning}>Pending</td>
                        <td className={styles.primary}>Details</td>
                      </tr>
                      <tr>
                        <td>Foladable Mini Drone</td>
                        <td>85631</td>
                        <td>Due</td>
                        <td className={styles.warning}>Pending</td>
                        <td className={styles.primary}>Details</td>
                      </tr>
                      <tr>
                        <td>Foladable Mini Drone</td>
                        <td>85631</td>
                        <td>Due</td>
                        <td className={styles.warning}>Pending</td>
                        <td className={styles.primary}>Details</td>
                      </tr>
                      <tr>
                        <td>Foladable Mini Drone</td>
                        <td>85631</td>
                        <td>Due</td>
                        <td className={styles.warning}>Pending</td>
                        <td className={styles.primary}>Details</td>
                      </tr>
                      <tr>
                        <td>Foladable Mini Drone</td>
                        <td>85631</td>
                        <td>Due</td>
                        <td className={styles.warning}>Pending</td>
                        <td className={styles.primary}>Details</td>
                      </tr>
                      <tr>
                        <td>Foladable Mini Drone</td>
                        <td>85631</td>
                        <td>Due</td>
                        <td className={styles.warning}>Pending</td>
                        <td className={styles.primary}>Details</td>
                      </tr>
                      <tr>
                        <td>Foladable Mini Drone</td>
                        <td>85631</td>
                        <td>Due</td>
                        <td className={styles.warning}>Pending</td>
                        <td className={styles.primary}>Details</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Link prefetch={true} href="#" className={styles.showAll}>
                  Show All
                </Link>
              </div>
            </main>

            <RightSide showMenu={showMenu} />
          </div>
        </>
      )}
    </>
  );
}
