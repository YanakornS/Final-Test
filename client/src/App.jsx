import { useState } from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FlightCard from "./pages/FlightCard";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} Route />
        <Route path="/Booking" element={<BookingPage />} Route />
        <Route path="/login" element={<LoginPage />} Route />
        <Route path="/register" element={<RegisterPage />} Route />
        <Route path="/flightCard" element={<FlightCard />} Route />
      </Routes>
    </div>
  );
}

export default App;
