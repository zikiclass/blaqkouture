"use client";
import styles from "./style.module.css";
import Loader from "@/components/Loader";
import Image from "next/image";
import { useState, useEffect } from "react";
import logo from "@/image/logo.png";
import Link from "next/link";
import { AiTwotoneMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
export default function SignIn() {
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
                <h5>Sign In</h5>
              </div>
              <form>
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
                <span>
                  Don&apos;t have an account?{" "}
                  <Link href="signup" className={styles.signup}>
                    Sign Up
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
