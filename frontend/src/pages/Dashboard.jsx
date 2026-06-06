import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [facilities, setFacilities] = useState([]);
  const [name, setName] = useState("");
  const [sport, setSport] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const { data } = await API.get("/facilities");
        setFacilities(data);
      } catch (error) {
        console.log(error);

        alert(
          error.response?.data?.message ||
            error.message
        );
      }
    };

    fetchFacilities();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const addFacility = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post(
        "/facilities",
        {
          name,
          sport,
          location,
          price,
        }
      );

      setFacilities([
        ...facilities,
        data,
      ]);

      setName("");
      setSport("");
      setLocation("");
      setPrice("");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          error.message
      );
    }
  };

  const deleteFacility = async (id) => {
    try {
      await API.delete(
        `/facilities/${id}`
      );

      setFacilities(
        facilities.filter(
          (facility) =>
            facility._id !== id
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateFacility = async (
    facility
  ) => {
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
          f._id === facility._id
            ? data
            : f
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Sport Facilities</h1>

      <button onClick={logoutHandler}>
        Logout
      </button>

      <form onSubmit={addFacility}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Sport"
          value={sport}
          onChange={(e) =>
            setSport(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <button type="submit">
          Add Facility
        </button>
      </form>

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

          <p>
            Sport: {facility.sport}
          </p>

          <p>
            Location: {facility.location}
          </p>

          <p>
            Price: €{facility.price}
          </p>

          <button
            onClick={() =>
              updateFacility(
                facility
              )
            }
          >
            Edit
          </button>

          <button
            onClick={() =>
              deleteFacility(
                facility._id
              )
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;