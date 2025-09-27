"use client";
import { useRouter } from "next/navigation";
import style from "./page.module.scss";
import logo from "../assets/imgs/million-logo.svg";
import Image from "next/image";
import React from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Please enter both email and password.", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (email === "demo1@example.com" && password === "demo123") {
      router.push("/dashboard");
      console.log(`Email: ${email}`);
    } else {
      alert("Invalid email or password.");
    }
    console.log(`Password: ${password}`);
  };

  return (
    <div className={style.loginPage}>
      <div className={style.loginContainer}>
        <div className={style.logoSection}>
          <div className={style.logoPlaceholder}>
            <Image src={logo} alt="Million Properties Logo" />
          </div>
        </div>

        <h1 className={style.brandTitle}>Million Properties</h1>
        <h3 className={style.subtitle}>Sign in to your account</h3>

        <label className={style.label}>Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          name="email"
          className={style.input}
          required
        />

        <label className={style.label}>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          name="password"
          className={style.input}
          required
        />

        <button
          onClick={handleLogin}
          type="submit"
          className={style.submitButton}
        >
          Sign In
        </button>

        <h3 className={style.demoTitle}>Demo Account</h3>
        <div className={style.demoAccount}>
          <span>Email: demo1@example.com</span>
          <span>Password: demo123</span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
