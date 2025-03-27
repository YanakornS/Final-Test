import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import FlightService from "../services/flight.service";

const FlightCard = ({ flightId }) => {
  const [flight, setFlight] = useState(null); // เก็บข้อมูลเที่ยวบิน
  const [loading, setLoading] = useState(true); // สถานะการโหลด
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching Flight ID:", flightId);
    if (!flightId) {
      console.error("Flight ID is missing");
      setLoading(false);
      return;
    }

    const fetchFlightData = async () => {
      try {
        const data = await FlightService.getFlightById(flightId);
        console.log("Flight Data:", data); // เช็คว่าข้อมูลมาไหม
        setFlight(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flight:", error);
        setLoading(false);
      }
    };

    fetchFlightData();
  }, [flightId]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await FlightService.deleteFlight(id); // ใช้ Service ในการลบเที่ยวบิน
          Swal.fire("Deleted!", "The flight has been deleted.", "success");
          // ทำการรีเฟรชหรือย้ายไปหน้าที่ต้องการ
          navigate("/flights");
        } catch (error) {
          Swal.fire(
            "Error!",
            "There was an error deleting the flight.",
            "error"
          );
        }
      }
    });
  };

  if (loading) return <div>Loading...</div>; // แสดงข้อความโหลดระหว่างที่กำลังดึงข้อมูล

  return (
    <div className="card">
      <figure>
        <img
          src={flight?.image || "https://via.placeholder.com/150"}
          alt="Flight"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{flight?.flightName}</h2>
        <p>From: {flight?.departureAirport}</p>
        <p>To: {flight?.destinationAirport}</p>
        <p>Departure: {flight?.departureTime}</p>
        <p>Arrival: {flight?.arrivalTime}</p>
        <p>Seats Available: {flight?.availableSeats}</p>
        <p>Price: {flight?.price}</p>
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(flight?._id)}
        >
          Delete Flight
        </button>
      </div>
    </div>
  );
};

export default FlightCard;
