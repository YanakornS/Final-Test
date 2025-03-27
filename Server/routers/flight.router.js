const express = require("express");
const router = express.Router();
const flightController = require("../Controllers/flight.controllers");
const authJwt = require("../middlewares/authJwt.middlewares");

// เส้นทางสำหรับการสร้างเที่ยวบินใหม่
router.post(
  "/flights",
  authJwt.verifyToken,
  authJwt.isAdmin,
  flightController.createFlight
);

// เส้นทางสำหรับการดึงข้อมูลเที่ยวบินทั้งหมด
router.get("/flights", flightController.getFlights);

// ดึงข้อมูลเที่ยวบินตาม ID
router.get("/flights/:flightId", flightController.getFlightById);

// อัปเดตข้อมูลเที่ยวบิน
router.put("/flights/:flightId", flightController.updateFlight);

// ลบเที่ยวบิน
router.delete("/flights/:flightId", flightController.deleteFlight);

module.exports = router;
