import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const { data } = await API.get("/facilities");

        setFacilities(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFacilities();
  }, []);

  return (
    <div>
      <h1>Sport Facilities</h1>

      {facilities.map((facility) => (
        <div
          key={facility._id}
          style={{
            border: "1px solid black",
            padding: "10px",
            margin: "10px",
          }}
        >
          <h3>{facility.name}</h3>

          <p>Sport: {facility.sport}</p>

          <p>Location: {facility.location}</p>

          <p>Price: €{facility.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;