import React, { useState } from "react";
import "./ForgotPasswordPage.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080/api/auth";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
 const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

 const handleSendOtp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
    }

    if (password.length < 6) { // Example password criteria
        setError("Password  be at least 6 characters long");
        return;
    }

    try {
        const response = await axios.post(
            `${BASE_URL}/send-otp`,
            { email },
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
        );

        setOtpSent(true);
        setError("");
        setSuccess(response.data); // Use the response message
    } catch (err) {
        setError("Failed to send OTP. Check if the email is registered.");
        console.error(err);
    }
};

const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${BASE_URL}/reset-password`, {
            email,
            newPassword: password,
            otp,
        });
        setSuccess(response.data); // Use the response message
        setError("");
        setTimeout(() => navigate("/"), 2000); // Redirect to login
    } catch (err) {
        setError("Invalid OTP or error resetting password.");
        console.error(err);
    }
};

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-box">
        <h2>Forgot Password</h2>

        <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Create Password</label>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {otpSent && (
            <>
              <label>Enter OTP</label>
              <input
                type="text"
                placeholder="Enter OTP from email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </>
          )}

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <button type="submit">
            {otpSent ? "Verify & Reset Password" : "Send OTP"}
          </button> 
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
