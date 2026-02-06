import React from "react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetPasswordPage() {
  const [otpSend, setOtpSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function resetPassword() {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/verify-otp", {
        email: email,
        otp: otp,
        newPassword: newPassword,
      });
      toast.success("Password reset successfully");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Failed to reset password");
      setLoading(false);
    }
  }

  async function sendOtp() {
    setLoading(true);
    try {
      await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/users/send-otp/" + email,
      );
      toast.success("OTP sent successfully to your email");
      setLoading(false);
      setOtpSend(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send OTP");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-primary">
      <div className="max-w-md w-full">
        <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-100">
          {/* Accent stripe */}
          <div className="absolute -top-4 left-6 w-24 h-1.5 rounded-full bg-golden" />

          <header className="mb-6">
            <h2 className="text-2xl font-semibold text-secondary">
              {otpSend ? "Enter OTP & Reset" : "Reset your password"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {otpSend
                ? "We sent a one-time code to your email. Enter it below and choose a new password."
                : "Enter the email address associated with your account and we’ll send an OTP to reset your password."}
            </p>
          </header>

          <main className="space-y-4">
            {!otpSend ? (
              <div className="space-y-4">
                <label className="block text-xs font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-golden"
                />

                <button
                  onClick={sendOtp}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium shadow-sm transition-transform active:scale-95 bg-accent text-primary"
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <label className="block text-xs font-medium text-gray-600">
                  OTP
                </label>
                <input
                  type="text"
                  placeholder="6-digit code"
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-golden"
                />

                <label className="block text-xs font-medium text-gray-600">
                  New password
                </label>
                <input
                  type="password"
                  placeholder="New password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-golden"
                />

                <label className="block text-xs font-medium text-gray-600">
                  Confirm password
                </label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-golden"
                />

                <button
                  onClick={resetPassword}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium shadow-sm transition-transform active:scale-95 bg-golden text-secondary"
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                  ) : (
                    "Reset Password"
                  )}
                </button>

                <div className="text-center text-sm text-gray-500">
                  <button
                    onClick={() => setOtpSend(false)}
                    className="underline"
                  >
                    Resend email
                  </button>
                </div>
              </div>
            )}
          </main>

          <footer className="mt-6 text-center text-xs text-gray-400">
            <button className="underline" onClick={() => navigate("/login")}>
              Back to login
            </button>
          </footer>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          By continuing you agree to our{" "}
          <span className="underline">Terms</span> and{" "}
          <span className="underline">Privacy</span>.
        </p>
      </div>
    </div>
  );
}

/*
    //code without ui
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetPasswordPage() {
  const [otpSend, setOtpSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function resetPassword() {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    // API call to reset password
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/verify-otp", {
        email: email,
        otp: otp,
        newPassword: newPassword,
      });
      toast.success("Password reset successfully");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Failed to reset password");
      setLoading(false);
    }
  }

  async function sendOtp() {
    setLoading(true);
    // API call to send OTP
    try {
      await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/users/send-otp/" + email,
      );
      toast.success("OTP sent successfully to your email");
      setLoading(false);
      setOtpSend(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send OTP");
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {loading && <div>Loading...</div>}
      */

{
  /* if otpSend is send, show enter otp form, else show forget password form
      {otpSend ? (
        <div>
          <h1>Enter OTP</h1>
          <input
            type="text"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter new password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={resetPassword}>Reset Password</button>
        </div>
      ) : (
        <div>
          <h1>Reset your Password</h1>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </div>
      )} 
    </div>
  );
}*/
}
