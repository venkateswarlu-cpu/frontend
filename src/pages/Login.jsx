import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    if (!email || !password) return alert("Enter email & password");

    const savedPassword = localStorage.getItem(`user_${email}`);
    if (savedPassword !== password) {
      return alert("Invalid credentials");
    }

    localStorage.setItem("token", "loggedin");
    localStorage.setItem("userEmail", email);

    navigate("/home");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={login}>Login</button>

        <p style={{ marginTop: "15px" }}>
          Don&apos;t have an account?{" "}
          <span
            style={{ color: "#ff9800", cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}
