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
export default function Signup() {
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
          <div className={styles.wrapper}>
            <div className={styles.signin}>
              <div className={styles.header}>
                <Link href="/">
                  <Image src={logo} alt="logo" className={styles.logo} />
                </Link>
                <h5>Sign Up</h5>
              </div>
              <form>
                <div className={styles.input}>
                  <input type="text" name="name" placeholder="Full name" />
                  <FaUser className={styles.icon} />
                </div>
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
                    type="number"
                    name="phone"
                    placeholder="Phone Number"
                    maxLength={11}
                  />
                  <FaPhone className={styles.icon} />
                </div>
                <div className={styles.input}>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <RiLockPasswordFill className={styles.icon} />
                </div>
                <div className={styles.input}>
                  <input
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                  />
                  <RiLockPasswordFill className={styles.icon} />
                </div>
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
