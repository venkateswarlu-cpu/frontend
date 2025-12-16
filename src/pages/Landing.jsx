import { useNavigate } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="intro-container">
      {/* Animated background circles */}
      <div className="bg-circle one"></div>
      <div className="bg-circle two"></div>
      <div className="bg-circle three"></div>

      {/* Content */}
      <div className="intro-content">
        <h1 className="intro-title">
          Smart Expense Splitter 💸
        </h1>

        <p className="intro-subtitle">
          Track • Split • Save smarter
        </p>

        <div className="intro-buttons">
          <button onClick={() => navigate("/signup")}>
            Get Started
          </button>
          <button onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
