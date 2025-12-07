// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// const Login = () => {
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const encodedUserName = encodeURIComponent(userName);
//       const encodedPassword = encodeURIComponent(password);

//       const response = await fetch(
//         `api/v1/User/login?userName=${encodedUserName}&password=${encodedPassword}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//         }
//       );

//       if (!response.ok) throw new Error("Invalid credentials");

//       const loginData = await response.json();
//       localStorage.setItem("authToken", loginData.data.data);
//       const payload = jwtDecode(loginData.data.data);

//       localStorage.setItem("userId", payload.UserId);
//       localStorage.setItem("userRole", payload.role);

//       navigate(payload.role === "1" ? "/dashboard" : "/user");
//     } catch (err) {
//       setError(err.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
//         <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
//           Login
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Username / Email
//             </label>
//             <input
//               type="email"
//               value={userName}
//               onChange={(e) => setUserName(e.target.value)}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               placeholder="Enter your email"
//               disabled={loading}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               placeholder="Enter your password"
//               disabled={loading}
//             />
//           </div>

//           <div className="flex justify-end">
//             <Link
//               to="/forgot-password"
//               className="text-sm text-green-600 hover:text-green-800 font-medium"
//             >
//               Forgot Password?
//             </Link>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white py-2 px-4 rounded-lg font-medium transition-colors"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         {error && (
//           <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
//             {error}
//           </div>
//         )}

//         {success && (
//           <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm text-center">
//             {success}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/officers/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Invalid email or password");
      }

      const data = await response.json();
      setSuccess("Login successful!");
      console.log("✅ Logged in:", data, data.officer.id);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.officer.username);

      if (data.officer.email === "isholah@gmail.com") {
        navigate("/dashboard");
      } else {
        navigate(`/officers/${data.officer.id}`);
      }

      // if(!data.adminId){
      //   navigate("/dashboard");
      // } else {
      //   navigate(`/officer/${data.officer.id}`);
      // }
    } catch (err) {
      if (err.name === "TypeError") {
        setError("Network error — please check your connection.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br ">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Please login to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm text-center">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 text-white py-2 rounded-md font-semibold transition duration-200 ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:bg-green-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-6">
          <a href="#" className="text-green-700 hover:underline text-sm">
            Forgot your password?
          </a>
          {/* <p className="text-gray-600 text-sm mt-3">
            Don’t have an account?{" "}
            <Link to='/officer/register' className="text-green-700 hover:underline">
              Register
            </Link>
          </p> */}
        </div>
      </div>

      <p className="text-white mt-8 text-sm opacity-80">
        © {new Date().getFullYear()} AgroBase — All rights reserved.
      </p>
    </div>
  );
};

export default Login;
