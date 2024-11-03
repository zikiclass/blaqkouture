"use client";
import React from "react";
import { useState, useEffect } from "react";
import styles from "../dashboard/style.module.css";
import Sidebar from "../components/sidebar";
import { MdDelete } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import Link from "next/link";
import RightSide from "../components/rightside";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import Swal from "sweetalert2";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { userSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
export default function Orders() {
  const router = useRouter();

  const { data: session, status } = useSession();
  const [menu, setMenu] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userSchema) });

  const showMenu = () => {
    setMenu(true);
  };
  const closeMenu = () => {
    setMenu(false);
  };
  if (status === "unauthenticated") {
    router.push("signin");
  }
  const [selectedBank, setSelectedBank] = useState("");
  const [accountDetails, setAccountDetails] = useState({
    accountNumber: "",
    accountName: "",
  });
  const [adminList, setAdmin] = useState([]);
  const [bank, setBank] = useState([]);
  const getBank = async () => {
    const response = await axios.get(`/api/bankdetails_copy`);
    if (response.data) setBank(response.data);
  };

  const getAdmin = async () => {
    const response = await axios.get(`/api/register_`);
    if (response.data) setAdmin(response.data);
  };
  useEffect(() => {
    getAdmin();
    getBank();
  }, []);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleBankChange = (event) => {
    const selected = event.target.value;

    setSelectedBank(selected);

    // Find the bank details for the selected bank
    const bankDetails = bank.find((b) => b.id === parseInt(selected));

    if (bankDetails) {
      setAccountDetails({
        accountNumber: bankDetails.accountNumber || "",
        accountName: bankDetails.accountName || "",
      });
    } else {
      setAccountDetails({
        accountNumber: "",
        accountName: "",
      });
    }
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
              <h1 style={{ display: "flex", alignItems: "center" }}>
                <IoMdSettings /> Settings
              </h1>

              <div className={styles.recent_orders}>
                <div className={styles.table}>
                  <h4>Administrators</h4>
                  <br />
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Admin</th>
                        <th>Email</th>

                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminList.map((list, index) => (
                        <tr key={index}>
                          <td>{list.id}</td>
                          <td>{list.name}</td>

                          <td>{list.email}</td>

                          <td
                            className={styles.actions}
                            onClick={() => handleDelete(list.id)}
                          >
                            <span className={styles.danger}>
                              <MdDelete />
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <h4
                    style={{
                      color: "var(--color-primary)",
                      marginTop: "1rem",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowAdmin(!showAdmin)}
                  >
                    {showAdmin ? "- Admin" : "+ Admin"}
                  </h4>
                  {showAdmin && (
                    <form
                      className={styles.input}
                      action=""
                      onSubmit={handleSubmit(async (data) => {
                        try {
                          await axios.post("/api/register_", { ...data });

                          toast.success("Account successfully registered");
                          getAdmin();
                        } catch (error) {
                          toast.error("Email already registered.");
                        }
                      })}
                    >
                      <Toaster position="bottom-left" />
                      <input
                        type="text"
                        name="name"
                        {...register("name")}
                        placeholder="Enter name"
                      />
                      {errors.name && <p>{errors.name.message}</p>}
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        {...register("email")}
                      />
                      {errors.email && <p>{errors.email.message}</p>}
                      <input
                        type="number"
                        name="phone"
                        placeholder="Enter phone number"
                        {...register("phone")}
                      />
                      {errors.phone && <p>{errors.phone.message}</p>}
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        {...register("password")}
                      />
                      {errors.password && <p>{errors.password.message}</p>}
                      <input
                        type="password"
                        name="name"
                        placeholder="Enter password"
                        {...register("confirmPassword")}
                      />
                      {errors.confirmPassword && (
                        <p>{errors.confirmPassword.message}</p>
                      )}
                      <button type="submit">Register</button>
                    </form>
                  )}

                  <h3
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      margin: "12px 0px",
                    }}
                  >
                    Account Details
                  </h3>
                  <form
                    action=""
                    className={styles.input}
                    onSubmit={(e) => {
                      e.preventDefault();
                      try {
                        const updateAccount = async () => {
                          const response = await axios.put(
                            "/api/bankdetails_copy",
                            {
                              id: selectedBank,
                              accountNumber: accountDetails.accountNumber,
                              accountName: accountDetails.accountName,
                            }
                          );
                          if (response.data)
                            toast.success(
                              "Account details updated successfully!"
                            );
                        };
                        updateAccount();
                      } catch (error) {
                        toast.error("Error updating account details.");
                      }
                    }}
                  >
                    <select
                      name="bank"
                      onChange={handleBankChange}
                      value={selectedBank}
                    >
                      <option value="">Select a Bank</option>
                      {bank.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.bank}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      placeholder="Account Number"
                      name="accountNumber"
                      value={accountDetails.accountNumber}
                      onChange={(e) =>
                        setAccountDetails({
                          ...accountDetails,
                          accountNumber: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Account Name"
                      name="accountName"
                      value={accountDetails.accountName}
                      onChange={(e) =>
                        setAccountDetails({
                          ...accountDetails,
                          accountName: e.target.value,
                        })
                      }
                    />
                    <button type="submit">Update</button>
                  </form>
                </div>
              </div>
            </main>

            <RightSide showMenu={showMenu} />
          </div>
        </>
      )}
    </>
  );
}
