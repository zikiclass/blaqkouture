"use client";
import styles from "./style.module.css";
import Loader from "@/components/Loader";
import Image from "next/image";
import { useState, useEffect } from "react";
import logo from "@/image/logo.png";
import Link from "next/link";
import { AiTwotoneMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";

import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
export default function SignIn() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const router = useRouter();
  const handleSignIn = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { email, password } = event.target.elements;

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: email.value,
        password: password.value,
        isAdmin: true,
      });

      setLoading(false);
      if (result.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid login credentials!",
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Access Granted",
          text: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });

        router.push("/blaq_/admin/dashboard");
      }
    } catch (error) {
      toast.error("Sign in failed. Please try again " + error);
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.wrapper}>
            <div className={styles.signin}>
              <div className={styles.header}>
                <Link prefetch={true} href="/">
                  <Image src={logo} alt="logo" className={styles.logo} />
                </Link>
                <h5>Admin</h5>
              </div>
              <form onSubmit={handleSignIn}>
                <div className={styles.input}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                  />
                  <AiTwotoneMail className={styles.icon} />
                </div>
                <div className={styles.input}>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <RiLockPasswordFill className={styles.icon} />
                </div>
                <button type="submit">Sign In</button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
