import React, { useEffect, useState } from "react";
import FlightService from "../services/flight.service";
import FlightCard from "./FlightCard"; // ใช้คอมโพเนนต์การ์ดที่สร้างไว้

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const data = await FlightService.getFlights(); // ดึงข้อมูลเที่ยวบินทั้งหมด
        setFlights(data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  if (loading) return <div>Loading flights...</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {flights.length > 0 ? (
        flights.map((flight) => (
          <FlightCard key={flight._id} flightId={flight._id} />
        ))
      ) : (
        <p>No flights available</p>
      )}
    </div>
  );
};

export default FlightList;
