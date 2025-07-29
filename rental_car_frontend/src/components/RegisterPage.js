  import React, { useState, useRef, useEffect } from "react";
  import "./RegisterPage.css";
  import { Link, useNavigate } from "react-router-dom";
  import axios from "axios";

  
  function RegisterPage() {
    const [userdata, setUserdata] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const navigation = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const passwordWrapperRef = useRef(null);

    const handleChange = (e) => {
      setUserdata({ ...userdata, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const { name, email, password, confirmPassword } = userdata;

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      try {
        const response = await axios.post("http://localhost:8080/api/auth/register", {
          name,
          email,
          password,

        });

      // ✅ inside handleSubmit after successful registration
      if (response.data === "User registered successfully") {
    navigation("/");
     alert("Registation Successfull...");
  }

      // console.log("Registration successful:", response.data);
        // setError("");
        setUserdata({ name: "", email: "", password: "", confirmPassword: "" });
      } catch (error) {
        console.error("Registration failed:", error);
        setError("Registration failed. Please try again.");
      }
    };

    // 👇 Hide password when user clicks outside Create Password field
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          passwordWrapperRef.current &&
          !passwordWrapperRef.current.contains(event.target)
        ) {
          setShowPassword(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div className="register-page">
        <div className="register-box">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={userdata.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={userdata.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

            <label>Create Password</label>
            <div className="password-input-wrapper" ref={passwordWrapperRef}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={userdata.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? "👁️" : "🙈"}
              </span>
            </div>

            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={userdata.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />

            {error && <p className="error-message">{error}</p>}


            <button type="submit" className="register-btn">Register</button>
            <p className="login-link">
              Already have an account? <Link to="/">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }

  export default RegisterPage;
