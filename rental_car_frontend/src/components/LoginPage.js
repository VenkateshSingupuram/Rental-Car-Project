import React, { useState } from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleLogin = (e) => {
    
    e.preventDefault();

    // Dummy credentials check (replace with actual API call later)
    if (email === "test@example.com" && password === "password") {
      
      navigate("/home");
    } else if(email === "venkysvt2000@gmail.com" && password === "password"){
      navigate("/HomepageAdmin");
      console.log("Console Printing");
    }
  };

  return (
    <div className="login-page">
      <div className="content-section">
        <h1>Fast Car Rental</h1>
        <p>
          Welcome to Fast Car Rental! Book your favorite cars instantly, with
          flexible timings and hassle-free delivery. Experience the speed,
          comfort, and convenience of modern mobility.
        </p>
      </div>

      <div className="login-box">
        <div className="login">
          <h2>Login</h2>

          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>

            <p className="register-link">
              Don’t have an account?{" "}
              <Link to="/register" className="btn">
                Register
              </Link>
            </p>
            <p className="register-link">
              Forgot your password?{" "}
              <Link to="/forgot-password">Click here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
