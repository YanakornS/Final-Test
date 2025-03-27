import React from "react";
import { useNavigate } from "react-router";
import { FaPlaneDeparture } from "react-icons/fa"; // ใช้ React Icons
import Tokenservice from "../services/Token.service"; // Import the token service

const Navbar = () => {
  const navigate = useNavigate();
  const user = Tokenservice.getUser(); // Get the user from the token service

  const handleLogin = () => {
    navigate("/login"); // Navigate to the login page
  };

  const handleLogout = () => {
    Tokenservice.removeUser(); // Remove user data from localStorage
    navigate("/login"); // Redirect to the login page after logout
  };

  return (
    <div className="navbar bg-blue-600 shadow-lg rounded-xl p-4">
      <div className="flex-1 flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <FaPlaneDeparture className="text-white text-3xl" />{" "}
          {/* ไอคอนเครื่องบิน */}
          <span className="text-white text-xl font-bold">
            Nakhon Pathom Airline
          </span>
        </div>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            {user ? (
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={
                    user.avatar ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="btn btn-primary rounded-lg px-4 py-2"
              >
                Login
              </button>
            )}
          </div>
          {user && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-md"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
