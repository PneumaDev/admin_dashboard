import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import background from "../images/background.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      setErrorMessage("Both fields are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Clear errors and handle successful submission
    setErrorMessage("");
    console.log(
      "Login successful with email:",
      email,
      "and password:",
      password
    );

    // Add further login logic here (e.g., API call)
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center animate-fadeInSlow"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-70 animate-overlayFadeIn"></div>

      {/* Login Form Container */}
      <div className="relative z-10 bg-white bg-opacity-95 p-8 m-8 rounded-lg shadow-lg w-full max-w-md animate-slideUp">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center font-muktaVaani">
          Welcome Back
        </h2>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 text-red-600 bg-red-100 p-3 rounded-md text-sm animate-fadeIn">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleFormSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Email Address
            </label>
            <div className="flex items-center bg-gray-100 rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500 animate-fadeIn">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-transparent focus:outline-none ml-2 flex-1 text-sm text-gray-800"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Password
            </label>
            <div className="flex items-center bg-gray-100 rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500 animate-fadeIn delay-100">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="bg-transparent focus:outline-none ml-2 flex-1 text-sm text-gray-800"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200 animate-fadeIn delay-200"
          >
            Login
          </button>
        </form>

        {/* Footer Text */}
        <div className="mt-6 text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:underline focus:outline-none"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
