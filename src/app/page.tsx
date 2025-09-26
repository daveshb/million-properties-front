"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Elite Properties</h1>
        <h3>Sign in to your account</h3>

        <label >Email</label>
        <input type="email" id="email" name="email" required />

        <label >Password</label>
        <input type="password" id="password" name="password" required />

        <button onClick={handleLogin} type="submit">
          Sign In
        </button>

        <h3 className="mt-2">Demo Accounts</h3>
        <div className="demo-account">
          <span>Email: demo1@example.com</span>
          <span>Password: demo123</span>
        </div>
        <div className="demo-account">
          <span>Email: demo2@example.com</span>
          <span>Password: demo123</span>
        </div>
      </div>
    </div>
  );
}
