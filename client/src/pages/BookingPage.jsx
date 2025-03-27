// BookingPage.js

import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const BookingPage = () => {
  const [flightId, setFlightId] = useState("");
  const [seatNumber, setSeatNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/book",
        { flightId, seatNumber },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      setMessage(response.data.message);
      Swal.fire("Success", response.data.message, "success");
    } catch (error) {
      Swal.fire("Error", error.response.data.message, "error");
    }
  };

  return (
    <div className="booking-page">
      <h2>Book a Flight</h2>
      <form onSubmit={handleBooking}>
        <div>
          <label>Flight ID</label>
          <input
            type="text"
            value={flightId}
            onChange={(e) => setFlightId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Seat Number</label>
          <input
            type="text"
            value={seatNumber}
            onChange={(e) => setSeatNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Book Flight</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookingPage;
