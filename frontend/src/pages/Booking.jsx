function Bookings() {
  return (
    <div style={{ padding: "20px" }}>

      <button
        onClick={() =>
          window.location.href =
            "/dashboard"
        }
      >
        ← Back to Dashboard
      </button>

      <h1>Bookings</h1>

      <div
        style={{
          background: "white",
          padding: "20px",
          marginTop: "20px",
          borderRadius: "10px",
        }}
      >
        <h3>Booking #1</h3>
        <p>Facility: Elbasan Arena Football</p>
        <p>User: Ender Z</p>
        <p>Date: 08/06/2026</p>
      </div>

      <div
        style={{
          background: "white",
          padding: "20px",
          marginTop: "20px",
          borderRadius: "10px",
        }}
      >
        <h3>Booking #2</h3>
        <p>Facility: Ping Pong Arena</p>
        <p>User: Ender Z</p>
        <p>Date: 10/06/2026</p>
      </div>
    </div>
  );
}

export default Bookings;