import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/flights"; // เปลี่ยนให้ตรงกับ URL ที่คุณตั้งใน backend

// ฟังก์ชันดึงข้อมูลเที่ยวบินทั้งหมด
export const getFlights = async () => {
  try {
    const response = await axios.get(API_URL); // Use axios instead of api
    return response.data;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
};

// ฟังก์ชันดึงข้อมูลเที่ยวบินตาม ID
export const getFlightById = async (flightId) => {
  try {
    const response = await axios.get(`${API_URL}/${flightId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching flight by ID:", error);
    throw error;
  }
};

// ฟังก์ชันสร้างเที่ยวบินใหม่
export const createFlight = async (flightData) => {
  try {
    const response = await axios.post(API_URL, flightData);
    return response.data;
  } catch (error) {
    console.error("Error creating flight:", error);
    throw error;
  }
};

// ฟังก์ชันอัปเดตเที่ยวบิน
export const updateFlight = async (flightId, flightData) => {
  try {
    const response = await axios.put(`${API_URL}/${flightId}`, flightData);
    return response.data;
  } catch (error) {
    console.error("Error updating flight:", error);
    throw error;
  }
};

// ฟังก์ชันลบเที่ยวบิน
export const deleteFlight = async (flightId) => {
  try {
    const response = await axios.delete(`${API_URL}/${flightId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting flight:", error);
    throw error;
  }
};

// เปลี่ยนจาก named export เป็น default export
const FlightService = {
  getFlights,
  getFlightById,
  createFlight,
  updateFlight,
  deleteFlight,
};

export default FlightService;
