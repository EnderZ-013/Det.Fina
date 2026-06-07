import { useEffect, useState } from "react";
import API from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const [facilities, setFacilities] = useState([]);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [sport, setSport] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const totalUsers = 1;
  const totalBookings = 7;

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const { data } = await API.get("/facilities");
        setFacilities(data);
      } catch (error) {
        console.log(error);
        alert(error.response?.data?.message || error.message);
      }
    };

    fetchFacilities();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const addFacility = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/facilities", {
        name,
        sport,
        location,
        price,
      });

      setFacilities([...facilities, data]);

      setName("");
      setSport("");
      setLocation("");
      setPrice("");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || error.message);
    }
  };

  const bookFacility = async (facility) => {
    try {
      const { data } = await API.put(`/facilities/${facility._id}`, {
        ...facility,
        status: "Booked",
      });

      setFacilities(
        facilities.map((f) =>
          f._id === facility._id ? data : f
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateFacility = async (facility) => {
    const newName = prompt(
      "New facility name:",
      facility.name
    );

    if (!newName) return;

    try {
      const { data } = await API.put(
        `/facilities/${facility._id}`,
        {
          ...facility,
          name: newName,
        }
      );

      setFacilities(
        facilities.map((f) =>
          f._id === facility._id ? data : f
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFacility = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this facility?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/facilities/${id}`);

      setFacilities(
        facilities.filter((f) => f._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filteredFacilities = facilities.filter((facility) =>
    facility.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">

      <div className="navbar">
        <h2>Admin Panel</h2>

        <div>
          <button onClick={() => (window.location.href = "/dashboard")}>
            Dashboard
          </button>

          <button onClick={() => (window.location.href = "/bookings")}>
            Bookings
          </button>

          <button onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </div>

      <h1>Sport Facilities</h1>

      <h2>Welcome {user?.name || "User"}</h2>
      <h3>Administrator Dashboard</h3>

      <div className="stats-container">
        <div className="stat-card">
          <h3>{facilities.length}</h3>
          <p>Facilities</p>
        </div>

        <div className="stat-card">
          <h3>{totalUsers}</h3>
          <p>Users</p>
        </div>

        <div className="stat-card">
          <h3>{totalBookings}</h3>
          <p>Bookings</p>
        </div>
      </div>

      <p>Manage your sport facilities below</p>

      <p>Total Facilities: {facilities.length}</p>

      <button className="logout-btn" onClick={logoutHandler}>
        Logout
      </button>

      <button onClick={() => (window.location.href = "/bookings")}>
        View Bookings
      </button>

      <form onSubmit={addFacility} className="form-container">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Sport"
          value={sport}
          onChange={(e) => setSport(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">Add Facility</button>
      </form>

      <input
        type="text"
        placeholder="Search facility..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          marginBottom: "20px",
        }}
      />

      {filteredFacilities.length === 0 && (
        <h3>No facilities found</h3>
      )}

      {filteredFacilities.map((facility) => (
        <div key={facility._id} className="facility-card">
          <h3>{facility.name}</h3>
          <p>Sport: {facility.sport}</p>
          <p>Location: {facility.location}</p>
          <p>Price: €{facility.price}</p>

          <p className="status">
            Status:{" "}
            <span
              className={
                !facility.status || facility.status === "Available"
                  ? "available"
                  : "booked"
              }
            >
              {!facility.status || facility.status === "Available"
                ? " 🟢 Available"
                : " 🔴 Booked"}
            </span>
          </p>

          <button onClick={() => updateFacility(facility)}>
            Edit
          </button>

          <button onClick={() => deleteFacility(facility._id)}>
            Delete
          </button>

          <button onClick={() => bookFacility(facility)}>
            Book
          </button>
        </div>
      ))}

      <footer className="footer">
        Sports Facility Management System © 2026
      </footer>

    </div>
  );
}

export default Dashboard;