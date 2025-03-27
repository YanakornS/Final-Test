const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
  {
    flightName: {
      type: String,
      required: true,
    },
    departureAirport: {
      type: String,
      required: true,
    },
    destinationAirport: {
      type: String,
      required: true,
    },
    price: { type: Number, required: true },
    departureTime: {
      type: Date,
      required: true,
    },
    arrivalTime: {
      type: Date,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
      min: 0, // จำนวนที่นั่งต้องไม่ต่ำกว่า 0
    },
  },
  {
    timestamps: true, // บันทึกเวลาเมื่อมีการเพิ่มหรือแก้ไขข้อมูล
  }
);

const FlightModel = mongoose.model("Flight", flightSchema);

module.exports = FlightModel;
