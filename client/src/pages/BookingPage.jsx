import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { bookingService } from "../services/bookingService"; // นำเข้าบริการจาก booking.service.js

const BookingPage = () => {
  const [flights, setFlights] = useState([]); // เก็บรายการเที่ยวบิน
  const [flightId, setFlightId] = useState("");
  const [seatNumber, setSeatNumber] = useState("");
  const [loading, setLoading] = useState(true);

  // ดึงรายการเที่ยวบิน
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await bookingService.getBookings();
        setFlights(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flights:", error);
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  // ฟังก์ชั่นการจองเที่ยวบิน
  const handleBooking = async (e) => {
    e.preventDefault();

    if (!flightId) {
      Swal.fire("Error", "Please select a flight!", "error");
      return;
    }

    try {
      const response = await bookingService.bookFlight(flightId, seatNumber);
      Swal.fire("Success", response.message, "success");
      setFlightId("");
      setSeatNumber("");
    } catch (error) {
      Swal.fire("Error", error, "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Book a Flight ✈️
        </h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading flights...</p>
        ) : (
          <form onSubmit={handleBooking} className="space-y-4">
            {/* Flight Selection */}
            <div>
              <label className="block text-gray-600 font-semibold mb-1">
                Select Flight
              </label>
              <select
                value={flightId}
                onChange={(e) => setFlightId(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                required
              >
                <option value="">-- Choose a Flight --</option>
                {flights.map((flight) => (
                  <option key={flight._id} value={flight._id}>
                    {flight.flightName} ({flight.departureAirport} →{" "}
                    {flight.destinationAirport})
                  </option>
                ))}
              </select>
            </div>

            {/* Seat Number */}
            <div>
              <label className="block text-gray-600 font-semibold mb-1">
                Seat Number
              </label>
              <input
                type="text"
                value={seatNumber}
                onChange={(e) => setSeatNumber(e.target.value)}
                placeholder="Enter seat number"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="btn btn-primary mt-4 w-full py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Book Flight
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
