const express = require("express");
const router = express.Router();
const BookingController = require("../Controllers/booking.controllers");
const authJwt = require("../middlewares/authJwt.middlewares");

router.post("/booking", authJwt.verifyToken, BookingController.bookFlight);

// Route สำหรับดึงข้อมูลการจองทั้งหมด
router.get("/booking", BookingController.getBookings);

// Route สำหรับลบการจอง
router.delete(
  "/booking/:bookingId",
  authJwt.verifyToken,
  BookingController.deleteBooking
);

module.exports = router;
