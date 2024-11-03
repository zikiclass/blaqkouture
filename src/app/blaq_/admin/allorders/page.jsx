"use client";
import React from "react";
import { useState, useEffect } from "react";
import styles from "../dashboard/style.module.css";
import Sidebar from "../components/sidebar";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import RightSide from "../components/rightside";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import Swal from "sweetalert2";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { CldImage } from "next-cloudinary";
export default function Orders() {
  const router = useRouter();

  const { data: session, status } = useSession();
  const [menu, setMenu] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [proId, setProId] = useState("");
  const [statusOrder, setStatusOrder] = useState("");
  const showMenu = () => {
    setMenu(true);
  };
  const closeMenu = () => {
    setMenu(false);
  };
  if (status === "unauthenticated") {
    router.push("signin");
  }

  const [ordersList, setOrders] = useState([]);
  const [ordersList2, setOrders2] = useState([]);
  const [ordersList3, setOrders3] = useState([]);
  const [ordersList4, setOrders4] = useState([]);
  const [ordersList5, setOrders5] = useState([]);
  const getOrders = async () => {
    const response = await axios.get(
      `/api/order/unique_processing?status=PROCESSING`
    );
    if (response.data) setOrders(response.data);

    const response2 = await axios.get(
      `/api/order/unique_processing?status=NO EVIDENCE!`
    );
    if (response2.data) setOrders2(response2.data);
    const response3 = await axios.get(
      `/api/order/unique_processing?status=DECLINED`
    );
    if (response3.data) setOrders3(response3.data);

    const response4 = await axios.get(
      `/api/order/unique_processing?status=CANCELLED`
    );
    if (response4.data) setOrders4(response4.data);
    const response5 = await axios.get(
      `/api/order/unique_processing?status=RECEIVED`
    );
    if (response5.data) setOrders5(response4.data);
  };
  useEffect(() => {
    getOrders();
  }, []);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const getCloudinaryUrl = (publicId) => {
    const cloudinaryBaseUrl =
      "https://res.cloudinary.com/dd0yi5utp/image/upload/v1729430075/";
    return `${cloudinaryBaseUrl}${publicId}`;
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Do you want to delete this transaction?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const deletenews = async () => {
          const response = await axios.delete("/api/order", {
            params: { id },
          });
          if (response.status === 200) {
            getOrders();
            Swal.fire("Deleted!", "", "success");
          }
        };
        deletenews();
      } else if (result.isDenied) {
        Swal.fire("Actions denied.", "", "info");
      }
    });
  };
  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "dd, MMMM yyyy");
  };

  const handleUpdateOrder = async (id) => {
    try {
      const response = await axios.put(
        `/api/order/unique_admin?id=${id}&status=${statusOrder}`
      );
      if (response.data) {
        setShowDialog(false);
        getOrders();
      }
    } catch (e) {}
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.container}>
            <Sidebar menu={menu} closeMenu={closeMenu} />
            <main className={styles.main}>
              <h1 style={{ display: "flex", alignItems: "center" }}>Orders</h1>

              <div className={styles.recent_orders}>
                <div className={styles.table}>
                  <table style={{ fontSize: "13px" }}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Product</th>
                        <th>Status</th>
                        <th>User</th>
                        <th>Date</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordersList.map((list, index) => (
                        <React.Fragment key={index}>
                          <tr key={index}>
                            <td>
                              <button
                                onClick={() => {
                                  setProId(list.id);
                                  setShowDialog(true);
                                }}
                              >
                                {list.productId}
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  setProId(list.id);
                                  setShowDialog(true);
                                }}
                              >
                                {list.product.title}
                              </button>
                            </td>

                            <td>
                              <button
                                onClick={() => {
                                  setProId(list.id);
                                  setShowDialog(true);
                                }}
                              >
                                {list.status === "NO EVIDENCE!" ? (
                                  <span style={{ color: "#808080" }}>
                                    No Proof
                                  </span>
                                ) : list.status === "PROCESSING" ? (
                                  <span style={{ color: "#FF8C00" }}>
                                    Processing
                                  </span>
                                ) : list.status === "RECEIVED" ? (
                                  <span style={{ color: "#28A745" }}>
                                    Received
                                  </span>
                                ) : list.status === "DECLINED" ? (
                                  <span style={{ color: "#f00" }}>
                                    Declined
                                  </span>
                                ) : (
                                  <span style={{ color: "#f00" }}>
                                    Cancelled
                                  </span>
                                )}
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  setProId(list.id);
                                  setShowDialog(true);
                                }}
                              >
                                {list.user.name}
                              </button>
                            </td>
                            <td style={{ fontSize: "13px" }}>
                              <button
                                onClick={() => {
                                  setProId(list.id);
                                  setShowDialog(true);
                                }}
                              >
                                {formatDate(list.createdAt)}
                              </button>
                            </td>
                            <td
                              className={styles.actions}
                              onClick={() => handleDelete(list.id)}
                            >
                              <span className={styles.danger}>
                                <MdDelete />
                              </span>
                            </td>
                          </tr>
                          {proId === list.id && showDialog && (
                            <tr>
                              <td></td>

                              <td>
                                <CldImage
                                  height={100}
                                  width={100}
                                  src={getCloudinaryUrl(list.paymentProof)}
                                  className={styles.imgs}
                                  alt="img"
                                />
                              </td>
                              <td>
                                <select
                                  name="status"
                                  onChange={(e) =>
                                    setStatusOrder(e.target.value)
                                  }
                                >
                                  <option value="NO EVIDENCE!">
                                    Select Status
                                  </option>
                                  <option value="RECEIVED">Received</option>
                                  <option value="PROCESSING">Processing</option>
                                  <option value="DECLINED">Declined</option>
                                </select>
                              </td>
                              <td>
                                {" "}
                                <button
                                  type="submit"
                                  className={styles.btUp}
                                  onClick={() => handleUpdateOrder(list.id)}
                                >
                                  Update
                                </button>
                              </td>

                              <td>
                                {" "}
                                <button
                                  className={styles.btCan}
                                  onClick={() => setShowDialog(false)}
                                >
                                  Cancel
                                </button>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                      {ordersList2.map((list, index) => (
                        <React.Fragment key={index}>
                          <tr key={index}>
                            <td>
                              <button
                                onClick={() => {
                                  setProId(list.id);
                                  setShowDialog(true);
                                }}
                              >
                                {list.productId}
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  setProId(list.id);
                                  setShowDialog(true);
                                }}
                              >
                                {list.product.title}
                              </button>
                            </td>

                            <td>
                              <button
                                onClick={() => {
                                  setProId(list.id);
                                  setShowDialog(true);
                                }}
                              >
                                {list.status === "NO EVIDENCE!" ? (
                                  <span style={{ color: "#808080" }}>
                                    No Proof
                                  </span>
                                ) : list.status === "PROCESSING" ? (
                                  <span style={{ color: "#FF8C00" }}>
                                    Processing
                                  </span>
                                ) : list.status === "RECEIVED" ? (
                                  <span style={{ color: "#28A745" }}>
                                    Received
                                  </span>
                                ) : list.status === "DECLINED" ? (
                                  <span style={{ color: "#f00" }}>
                                    Declined
                                  </span>
                                ) : (
                                  <span style={{ color: "#f00" }}>
                                    Cancelled
                                  </span>
                                )}
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  setProId(list.id);
                                  setShowDialog(true);
                                }}
                              >
                                {list.user.name}
                              </button>
                            </td>
                            <td style={{ fontSize: "13px" }}>
                              <button
                                onClick={() => {
                                  setProId(list.id);
                                  setShowDialog(true);
                                }}
                              >
                                {formatDate(list.createdAt)}
                              </button>
                            </td>
                            <td
                              className={styles.actions}
                              onClick={() => handleDelete(list.id)}
                            >
                              <span className={styles.danger}>
                                <MdDelete />
                              </span>
                            </td>
                          </tr>
                          {proId === list.id && showDialog && (
                            <tr>
                              <td></td>

                              <td>
                                <CldImage
                                  height={100}
                                  width={100}
                                  src={getCloudinaryUrl(list.paymentProof)}
                                  className={styles.imgs}
                                  alt="img"
                                />
                              </td>
                              <td>
                                <select
                                  name="status"
                                  onChange={(e) =>
                                    setStatusOrder(e.target.value)
                                  }
                                >
                                  <option value="NO EVIDENCE!">
                                    Select Status
                                  </option>
                                  <option value="RECEIVED">Received</option>
                                  <option value="PROCESSING">Processing</option>
                                  <option value="DECLINED">Declined</option>
                                </select>
                              </td>
                              <td>
                                {" "}
                                <button
                                  type="submit"
                                  className={styles.btUp}
                                  onClick={() => handleUpdateOrder(list.id)}
                                >
                                  Update
                                </button>
                              </td>

                              <td>
                                {" "}
                                <button
                                  className={styles.btCan}
                                  onClick={() => setShowDialog(false)}
                                >
                                  Cancel
                                </button>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                      {ordersList3.map((list, index) => (
                        <React.Fragment key={index}>
                          <tr key={index}>
                            <td>
                              <button
                                onClick={() => {
                                  setProId(list.id);
                                  setShowDialog(true);
                                }}
                              >
                                {list.productId}
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  setProId(list.id);
                                  setShowDialog(true);
                                }}
                              >
                                {list.product.title}
                              </button>
                            </td>

                            <td>
                              <button
                                onClick={() => {
                                  setProId(list.id);
                                  setShowDialog(true);
                                }}
                              >
                                {list.status === "NO EVIDENCE!" ? (
                                  <span style={{ color: "#808080" }}>
                                    No Proof
                                  </span>
                                ) : list.status === "PROCESSING" ? (
                                  <span style={{ color: "#FF8C00" }}>
                                    Processing
                                  </span>
                                ) : list.status === "RECEIVED" ? (
                                  <span style={{ color: "#28A745" }}>
                                    Received
                                  </span>
                                ) : list.status === "DECLINED" ? (
                                  <span style={{ color: "#f00" }}>
                                    Declined
                                  </span>
                                ) : (
                                  <span style={{ color: "#f00" }}>
                                    Cancelled
                                  </span>
                                )}
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  setProId(list.id);
                                  setShowDialog(true);
                                }}
                              >
                                {list.user.name}
                              </button>
                            </td>
                            <td style={{ fontSize: "13px" }}>
                              <button
                                onClick={() => {
                                  setProId(list.id);
                                  setShowDialog(true);
                                }}
                              >
                                {formatDate(list.createdAt)}
                              </button>
                            </td>
                            <td
                              className={styles.actions}
                              onClick={() => handleDelete(list.id)}
                            >
                              <span className={styles.danger}>
                                <MdDelete />
                              </span>
                            </td>
                          </tr>
                          {proId === list.id && showDialog && (
                            <tr>
                              <td></td>

                              <td>
                                <CldImage
                                  height={100}
                                  width={100}
                                  src={getCloudinaryUrl(list.paymentProof)}
                                  className={styles.imgs}
                                  alt="img"
                                />
                              </td>
                              <td>
                                <select
                                  name="status"
                                  onChange={(e) =>
                                    setStatusOrder(e.target.value)
                                  }
                                >
                                  <option value="NO EVIDENCE!">
                                    Select Status
                                  </option>
                                  <option value="RECEIVED">Received</option>
                                  <option value="PROCESSING">Processing</option>
                                  <option value="DECLINED">Declined</option>
                                </select>
                              </td>
                              <td>
                                {" "}
                                <button
                                  type="submit"
                                  className={styles.btUp}
                                  onClick={() => handleUpdateOrder(list.id)}
                                >
                                  Update
                                </button>
                              </td>

                              <td>
                                {" "}
                                <button
                                  className={styles.btCan}
                                  onClick={() => setShowDialog(false)}
                                >
                                  Cancel
                                </button>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                      {ordersList4.map((list, index) => (
                        <React.Fragment key={index}>
                          <tr key={index}>
                            <td>
                              <button
                                onClick={() => {
                                  setProId(list.id);
                                  setShowDialog(true);
                                }}
                              >
                                {list.productId}
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  setProId(list.id);
                                  setShowDialog(true);
                                }}
                              >
                                {list.product.title}
                              </button>
                            </td>

                            <td>
                              <button
                                onClick={() => {
                                  setProId(list.id);
                                  setShowDialog(true);
                                }}
                              >
                                {list.status === "NO EVIDENCE!" ? (
                                  <span style={{ color: "#808080" }}>
                                    No Proof
                                  </span>
                                ) : list.status === "PROCESSING" ? (
                                  <span style={{ color: "#FF8C00" }}>
                                    Processing
                                  </span>
                                ) : list.status === "RECEIVED" ? (
                                  <span style={{ color: "#28A745" }}>
                                    Received
                                  </span>
                                ) : list.status === "DECLINED" ? (
                                  <span style={{ color: "#f00" }}>
                                    Declined
                                  </span>
                                ) : (
                                  <span style={{ color: "#f00" }}>
                                    Cancelled
                                  </span>
                                )}
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  setProId(list.id);
                                  setShowDialog(true);
                                }}
                              >
                                {list.user.name}
                              </button>
                            </td>
                            <td style={{ fontSize: "13px" }}>
                              <button
                                onClick={() => {
                                  setProId(list.id);
                                  setShowDialog(true);
                                }}
                              >
                                {formatDate(list.createdAt)}
                              </button>
                            </td>
                            <td
                              className={styles.actions}
                              onClick={() => handleDelete(list.id)}
                            >
                              <span className={styles.danger}>
                                <MdDelete />
                              </span>
                            </td>
                          </tr>
                          {proId === list.id && showDialog && (
                            <tr>
                              <td></td>

                              <td>
                                <CldImage
                                  height={100}
                                  width={100}
                                  src={getCloudinaryUrl(list.paymentProof)}
                                  className={styles.imgs}
                                  alt="img"
                                />
                              </td>
                              <td>
                                <select
                                  name="status"
                                  onChange={(e) =>
                                    setStatusOrder(e.target.value)
                                  }
                                >
                                  <option value="NO EVIDENCE!">
                                    Select Status
                                  </option>
                                  <option value="RECEIVED">Received</option>
                                  <option value="PROCESSING">Processing</option>
                                  <option value="DECLINED">Declined</option>
                                </select>
                              </td>
                              <td>
                                {" "}
                                <button
                                  type="submit"
                                  className={styles.btUp}
                                  onClick={() => handleUpdateOrder(list.id)}
                                >
                                  Update
                                </button>
                              </td>

                              <td>
                                {" "}
                                <button
                                  className={styles.btCan}
                                  onClick={() => setShowDialog(false)}
                                >
                                  Cancel
                                </button>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                      {ordersList5.map((list, index) => (
                        <React.Fragment key={index}>
                          <tr key={index}>
                            <td>
                              <button
                                onClick={() => {
                                  setProId(list.id);
                                  setShowDialog(true);
                                }}
                              >
                                {list.productId}
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  setProId(list.id);
                                  setShowDialog(true);
                                }}
                              >
                                {list.product.title}
                              </button>
                            </td>

                            <td>
                              <button
                                onClick={() => {
                                  setProId(list.id);
                                  setShowDialog(true);
                                }}
                              >
                                {list.status === "NO EVIDENCE!" ? (
                                  <span style={{ color: "#808080" }}>
                                    No Proof
                                  </span>
                                ) : list.status === "PROCESSING" ? (
                                  <span style={{ color: "#FF8C00" }}>
                                    Processing
                                  </span>
                                ) : list.status === "RECEIVED" ? (
                                  <span style={{ color: "#28A745" }}>
                                    Received
                                  </span>
                                ) : list.status === "DECLINED" ? (
                                  <span style={{ color: "#f00" }}>
                                    Declined
                                  </span>
                                ) : (
                                  <span style={{ color: "#f00" }}>
                                    Cancelled
                                  </span>
                                )}
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  setProId(list.id);
                                  setShowDialog(true);
                                }}
                              >
                                {list.user.name}
                              </button>
                            </td>
                            <td style={{ fontSize: "13px" }}>
                              <button
                                onClick={() => {
                                  setProId(list.id);
                                  setShowDialog(true);
                                }}
                              >
                                {formatDate(list.createdAt)}
                              </button>
                            </td>
                            <td
                              className={styles.actions}
                              onClick={() => handleDelete(list.id)}
                            >
                              <span className={styles.danger}>
                                <MdDelete />
                              </span>
                            </td>
                          </tr>
                          {proId === list.id && showDialog && (
                            <tr>
                              <td></td>

                              <td>
                                <CldImage
                                  height={100}
                                  width={100}
                                  src={getCloudinaryUrl(list.paymentProof)}
                                  className={styles.imgs}
                                  alt="img"
                                />
                              </td>
                              <td>
                                <select
                                  name="status"
                                  onChange={(e) =>
                                    setStatusOrder(e.target.value)
                                  }
                                >
                                  <option value="NO EVIDENCE!">
                                    Select Status
                                  </option>
                                  <option value="RECEIVED">Received</option>
                                  <option value="PROCESSING">Processing</option>
                                  <option value="DECLINED">Declined</option>
                                </select>
                              </td>
                              <td>
                                {" "}
                                <button
                                  type="submit"
                                  className={styles.btUp}
                                  onClick={() => handleUpdateOrder(list.id)}
                                >
                                  Update
                                </button>
                              </td>

                              <td>
                                {" "}
                                <button
                                  className={styles.btCan}
                                  onClick={() => setShowDialog(false)}
                                >
                                  Cancel
                                </button>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* <Link prefetch={true} href="orders" className={styles.showAll}>
                  Show Less
                </Link> */}
              </div>
            </main>

            <RightSide showMenu={showMenu} />
          </div>
        </>
      )}
    </>
  );
}
