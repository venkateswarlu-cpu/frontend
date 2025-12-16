import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signup = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // Check if user already exists
    if (localStorage.getItem(`user_${email}`)) {
      alert("User already exists");
      return;
    }

    // Save user credentials
    localStorage.setItem(`user_${email}`, password);

    // Initialize user's expenses
    localStorage.setItem(`expenses_${email}`, JSON.stringify([]));

    alert("Signup successful!");
    navigate("/login");
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>Create Account</h2>

        <input
          type="email"
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

        <button onClick={signup}>Signup</button>

        <p style={{ marginTop: "15px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#ff9800", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
