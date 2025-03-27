require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL;
const DB_URL = process.env.DB_URL;
const path = require("path");
const userRouter = require("./routers/user.router");
const bookingRouter = require("./routers/booking.router");
const flightRouter = require("./routers/flight.router");

try {
  mongoose.connect(DB_URL);
  console.log("Connect to MongoDB Successfully");
} catch (error) {
  console.log("DB Connect Faile");
}

const app = express();

app.use(cors({ origin: BASE_URL, credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome  To Nakhon Pathom Airline </h1>");
});

//Use Router
app.use("/api/v1", userRouter);
app.use("/api/v1", flightRouter);
app.use("/api/v1", bookingRouter);

app.listen(PORT, () => {
  console.log("Server in Running http://localhost:" + PORT);
});
