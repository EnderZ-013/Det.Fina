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

  // 👇 USER FROM LOCALSTORAGE
  const user = JSON.parse(localStorage.getItem("user"));

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

  const deleteFacility = async (id) => {
    try {
      await API.delete(`/facilities/${id}`);

      setFacilities(
        facilities.filter((facility) => facility._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateFacility = async (facility) => {
    const newName = prompt("New facility name:", facility.name);

    if (!newName) return;

    try {
      const { data } = await API.put(`/facilities/${facility._id}`, {
        ...facility,
        name: newName,
      });

      setFacilities(
        facilities.map((f) => (f._id === facility._id ? data : f))
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
      <h1>Sport Facilities</h1>

      {/* 👇 NEW WELCOME SECTION */}
      <h2>Welcome {user?.name || "User"} 👋</h2>

      <p>Manage your sport facilities below</p>

      {/* TOTAL */}
      <p>Total Facilities: {facilities.length}</p>

      {/* LOGOUT */}
      <button className="logout-btn" onClick={logoutHandler}>
        Logout
      </button>

      {/* ADD FACILITY */}
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

      {/* SEARCH */}
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

      {/* LIST */}
      {filteredFacilities.map((facility) => (
        <div key={facility._id} className="facility-card">
          <h3>{facility.name}</h3>
          <p>Sport: {facility.sport}</p>
          <p>Location: {facility.location}</p>
          <p>Price: €{facility.price}</p>

          <button onClick={() => updateFacility(facility)}>Edit</button>

          <button onClick={() => deleteFacility(facility._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;