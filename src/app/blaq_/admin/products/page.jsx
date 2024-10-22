"use client";
import { useState, useEffect } from "react";
import styles from "../dashboard/style.module.css";
import Sidebar from "../components/sidebar";

import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import RightSide from "../components/rightside";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import Swal from "sweetalert2";
export default function Products() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [menu, setMenu] = useState(false);
  const [productsList, setProductList] = useState([]);
  const getProduct = async () => {
    const response = await axios.get(`/api/product`);
    if (response.data) setProductList(response.data);
  };
  useEffect(() => {
    getProduct();
  }, []);
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

  const handleDelete = (productId) => {
    Swal.fire({
      title: "Do you want to delete this product?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const deleteProduct = async () => {
          const response = await axios.delete("/api/product", {
            params: { productId },
          });
          if (response.status === 200) {
            getProduct();
            Swal.fire("Deleted!", "", "success");
          }
        };
        deleteProduct();
      } else if (result.isDenied) {
        Swal.fire("Actions denied.", "", "info");
      }
    });
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
              <h1>Products</h1>
              <Link
                prefetch={true}
                href="add_new_product"
                className={styles.button}
              >
                <IoMdAdd />
                Add Product
              </Link>
              <div className={styles.recent_orders}>
                <div className={styles.table}>
                  <table>
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Product ID</th>
                        <th>Amount</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {productsList.map((list, index) => (
                        <tr key={index}>
                          <td>
                            <Link
                              prefetch={true}
                              href={`edit_product?id=${list.productId}`}
                            >
                              {list.title}
                            </Link>
                          </td>
                          <td>
                            <Link
                              prefetch={true}
                              href={`edit_product?id=${list.productId}`}
                            >
                              {list.productId}
                            </Link>
                          </td>
                          <td>
                            <Link
                              prefetch={true}
                              href={`edit_product?id=${list.productId}`}
                            >
                              {list.price}
                            </Link>
                          </td>
                          <td>
                            <Link
                              prefetch={true}
                              href={`edit_product?id=${list.productId}`}
                            >
                              {" "}
                              <CldImage
                                src={list.img1}
                                width={100}
                                height={100}
                                alt="Blaq Kouture"
                              />{" "}
                            </Link>
                          </td>
                          <td
                            className={styles.actions}
                            onClick={() => handleDelete(list.productId)}
                          >
                            <span className={styles.danger}>
                              <MdDelete />
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* <Link prefetch={true}href="#" className={styles.showAll}>
                  Show All
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
