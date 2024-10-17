"use client";
import styles from "../signin/style.module.css";
import Loader from "@/components/Loader";
import Image from "next/image";
import { useState, useEffect } from "react";
import logo from "@/image/logo.png";
import Link from "next/link";
import { FaPhone } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { AiTwotoneMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";

import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { userSchema } from "../validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Signup() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const router = useRouter();
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userSchema) });
  // if (status === "unauthenticated") {
  //   router.push("signin");
  // }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.wrapper}>
            <div className={styles.signin}>
              <div className={styles.header}>
                <Link href="/">
                  <Image src={logo} alt="logo" className={styles.logo} />
                </Link>
                <h5>Sign Up</h5>
              </div>
              <form
                action=""
                onSubmit={handleSubmit(async (data) => {
                  setLoading(true);
                  try {
                    await axios.post("/api/register", { ...data });
                    setLoading(false);
                    toast.success("Account successfully registered");
                    router.push("/signin");
                  } catch (error) {
                    toast.error(error.message || "Something went wrong");
                  }
                })}
              >
                <Toaster position="bottom-left" />
                <div className={styles.input}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    {...register("name")}
                  />
                  <FaUser className={styles.icon} />
                </div>
                {errors.name && <p>{errors.name.message}</p>}
                <div className={styles.input}>
                  <input
                    type="email"
                    name="email"
                    {...register("email")}
                    placeholder="Email Address"
                  />
                  <AiTwotoneMail className={styles.icon} />
                </div>
                {errors.email && <p>{errors.email.message}</p>}
                <div className={styles.input}>
                  <input
                    type="number"
                    name="phone"
                    placeholder="Phone Number"
                    {...register("phone")}
                    maxLength={11}
                  />
                  <FaPhone className={styles.icon} />
                </div>
                {errors.phone && <p>{errors.phone.message}</p>}
                <div className={styles.input}>
                  <input
                    type="password"
                    name="password"
                    {...register("password")}
                    placeholder="Password"
                  />
                  <RiLockPasswordFill className={styles.icon} />
                </div>
                {errors.password && <p>{errors.password.message}</p>}
                <div className={styles.input}>
                  <input
                    type="password"
                    name="confirm_password"
                    {...register("confirmPassword")}
                    placeholder="Confirm Password"
                  />
                  <RiLockPasswordFill className={styles.icon} />
                </div>
                {errors.confirmPassword && (
                  <p>{errors.confirmPassword.message}</p>
                )}
                <button type="submit">Sign Up</button>
                <span>
                  Already have an account?{" "}
                  <Link href="signin" className={styles.signup}>
                    Sign In
                  </Link>
                </span>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
