// services/booking.service.js

import api from "./api";

const API_URL = "/booking";

const getBookings = async () => {
  try {
    const response = await axios.get(`${API_URL}/bookings`, {
      headers: { "x-access-token": localStorage.getItem("token") },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.message : error.message;
  }
};

const bookFlight = async (flightId, seatNumber) => {
  try {
    const response = await axios.post(
      `${API_URL}/book`,
      { flightId, seatNumber },
      {
        headers: { "x-access-token": localStorage.getItem("token") },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.message : error.message;
  }
};

const deleteBooking = async (bookingId) => {
  try {
    const response = await axios.delete(`${API_URL}/booking/${bookingId}`, {
      headers: { "x-access-token": localStorage.getItem("token") },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.message : error.message;
  }
};

export const bookingService = {
  getBookings,
  bookFlight,
  deleteBooking,
};
