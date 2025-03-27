const Booking = require("../Models/Booking.model");
const FlightModel = require("../Models/Flight.model");

exports.bookFlight = async (req, res) => {
  const { flightId, seatNumber } = req.body;

  if (!flightId || !seatNumber) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    const flight = await FlightModel.findById(flightId);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    // ตรวจสอบจำนวนที่นั่งที่ว่าง
    if (flight.availableSeats <= 0) {
      return res.status(400).json({ message: "No available seats" });
    }

    // สร้างหมายเลขตั๋ว
    const ticketNumber = "TICKET-" + new Date().getTime();

    // ตรวจสอบว่า req.userId ถูกต้อง
    if (!req.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // สร้างการจองใหม่
    const newBooking = new Booking({
      userId: req.userId, // เอาจาก user ที่เข้าสู่ระบบ
      flightId: flight._id,
      seatNumber,
      ticketPrice: flight.price, // ใช้ flight.price แทน ticketPrice
      ticketNumber,
    });

    // ลดจำนวนที่นั่งที่ว่าง
    flight.availableSeats -= 1;
    await flight.save();

    // บันทึกการจอง
    await newBooking.save();

    return res.status(201).json({
      message: "Flight booked successfully",
      booking: newBooking,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Booking failed" });
  }
};

// ฟังก์ชันดึงข้อมูลการจองทั้งหมด
exports.getBookings = async (req, res) => {
  try {
    // ค้นหาการจองทั้งหมดที่เกี่ยวข้องกับผู้ใช้
    const bookings = await Booking.find({ userId: req.userId }).populate(
      "flightId"
    );

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found" });
    }

    return res.status(200).json({ bookings });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Error retrieving bookings" });
  }
};

// ฟังก์ชันอัปเดตการจอง
exports.updateBooking = async (req, res) => {
  const { bookingId } = req.params;
  const { seatNumber } = req.body;

  if (!seatNumber) {
    return res.status(400).json({ message: "Please provide a seat number" });
  }

  try {
    // ค้นหาการจองที่ต้องการอัปเดต
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // อัปเดตที่นั่ง
    booking.seatNumber = seatNumber;

    // บันทึกการอัปเดต
    await booking.save();

    return res.status(200).json({
      message: "Booking updated successfully",
      booking,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Error updating booking" });
  }
};

exports.deleteBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // ลบการจอง
    await booking.remove();

    return res.status(200).json({
      message: "Booking deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Error deleting booking" });
  }
};
