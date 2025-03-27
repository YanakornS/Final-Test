const FlightModel = require("../Models/Flight.model");

// ฟังก์ชันสร้างเที่ยวบินใหม่
exports.createFlight = async (req, res) => {
  console.log("User Role:", req.role); // ตรวจสอบว่า req.role มีค่าอะไร

  const {
    flightName,
    departureAirport,
    destinationAirport,
    departureTime,
    arrivalTime,
    availableSeats,
    price,
  } = req.body;

  if (
    !flightName ||
    !departureAirport ||
    !destinationAirport ||
    !departureTime ||
    !arrivalTime ||
    !price ||
    availableSeats == null
  ) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    const newFlight = new FlightModel({
      flightName,
      departureAirport,
      destinationAirport,
      departureTime,
      arrivalTime,
      price,
      availableSeats,
    });

    await newFlight.save();
    return res.status(201).json({
      message: "Flight created successfully",
      flight: newFlight,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "An error occurred while creating the flight",
    });
  }
};

// ฟังก์ชันดึงข้อมูลเที่ยวบินทั้งหมด
exports.getFlights = async (req, res) => {
  try {
    // ดึงข้อมูลเที่ยวบินทั้งหมดจากฐานข้อมูล
    const flights = await FlightModel.find();

    // ส่งผลลัพธ์การดึงข้อมูลที่สำเร็จ
    return res.status(200).json(flights);
  } catch (error) {
    // จับข้อผิดพลาดที่เกิดขึ้นในระหว่างการดึงข้อมูล
    return res.status(500).json({
      message: error.message || "An error occurred while retrieving flights",
    });
  }
};

// ฟังก์ชันดึงข้อมูลเที่ยวบินตาม ID
exports.getFlightById = async (req, res) => {
  const { flightId } = req.params;

  try {
    const flight = await FlightModel.findById(flightId);

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    return res.status(200).json(flight);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "An error occurred while retrieving the flight",
    });
  }
};

// ฟังก์ชันอัปเดตข้อมูลเที่ยวบิน
exports.updateFlight = async (req, res) => {
  const { flightId } = req.params;
  const {
    flightName,
    departureAirport,
    destinationAirport,
    departureTime,
    arrivalTime,
    availableSeats,
    price,
  } = req.body;

  try {
    // ค้นหาเที่ยวบินที่ต้องการอัปเดต
    const flight = await FlightModel.findById(flightId);

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    // อัปเดตข้อมูลเที่ยวบิน
    flight.flightName = flightName || flight.flightName;
    flight.departureAirport = departureAirport || flight.departureAirport;
    flight.destinationAirport = destinationAirport || flight.destinationAirport;
    flight.departureTime = departureTime || flight.departureTime;
    flight.arrivalTime = arrivalTime || flight.arrivalTime;
    flight.availableSeats = availableSeats || flight.availableSeats;
    flight.price = price || flight.price;

    // บันทึกการอัปเดต
    await flight.save();

    return res.status(200).json({
      message: "Flight updated successfully",
      flight: flight,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "An error occurred while updating the flight",
    });
  }
};

// ฟังก์ชันลบเที่ยวบิน
exports.deleteFlight = async (req, res) => {
  const { flightId } = req.params;

  try {
    // ค้นหาเที่ยวบินที่ต้องการลบ
    const flight = await FlightModel.findById(flightId); // ค้นหาเที่ยวบินโดยใช้ _id

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    // ลบเที่ยวบิน
    await FlightModel.deleteOne({ _id: flightId });

    return res.status(200).json({
      message: "Flight deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "An error occurred while deleting the flight",
    });
  }
};
