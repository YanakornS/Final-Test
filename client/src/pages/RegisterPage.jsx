import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaUserAlt, FaEnvelope, FaLock, FaPhoneAlt } from "react-icons/fa"; // ใช้ React Icons
import AuthService from "../services/auth.service";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await AuthService.register(fullName, email, password, phoneNumber);
      navigate("/login"); // ไปที่หน้า login หลังจากลงทะเบียนสำเร็จ
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">
        Create Your Account
      </h2>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      <form onSubmit={handleRegister} className="space-y-6">
        {/* Full Name */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <FaUserAlt className="text-gray-500 ml-3" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Email</label>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <FaEnvelope className="text-gray-500 ml-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <FaLock className="text-gray-500 ml-3" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <FaPhoneAlt className="text-gray-500 ml-3" />
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg mt-6 hover:bg-blue-600 transition-colors"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 font-semibold">
          Login
        </a>
      </p>
    </div>
  );
};

export default RegisterPage;
