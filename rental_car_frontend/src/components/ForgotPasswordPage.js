import React, { useState } from "react";
import "./ForgotPasswordPage.css";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/auth";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setOtpSent(true);

    // TODO: Call backend API to send OTP to email
    console.log("Send OTP to email:", email);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    // TODO: Call backend API to verify OTP and reset password
    console.log("Verifying OTP:", otp);
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

          <button type="submit">
            {otpSent ? "Verify & Reset Password" : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;

export const sendOtp = (email) => {
  return axios.post(`${BASE_URL}/send-otp`, { email });
};

export const resetPasswordWithOtp = (email, newPassword, otp) => {
  return axios.post(`${BASE_URL}/reset-password`, {
    email,
    newPassword,
    otp,
  });
};
