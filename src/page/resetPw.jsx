import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        "api/v1/User/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) throw new Error("Failed to send reset email");

      const data = await response.json();
     
      console.log(data);
      setMessage(data.message || "Reset email sent successfully!");
     if(data.data.token){
        navigate(`/reset-password/${data.data.token}`);
      }
    } catch (err) {
      setError(err.message || "Error sending password reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Forgot Password
        </h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          Enter your registered email address, and we’ll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm text-center">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <p className="text-center mt-6 text-sm">
          Remembered your password?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-green-600 hover:text-green-800 font-medium"
          >
            Go back to Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
