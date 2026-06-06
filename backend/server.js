const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const facilityRoutes = require("./routes/facilityRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const connectDB = require("./config/db");
const protect = require("./middleware/authMiddleware");

dotenv.config();

// Connect DB
connectDB();

const app = express();

// MIDDLEWARE (DUHET PARA ROUTES)
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/facilities", facilityRoutes);
app.use("/api/bookings", bookingRoutes);

// HOME ROUTE
app.get("/", (req, res) => {
  res.send("API is running");
});

// PROTECTED ROUTE
app.get("/api/profile", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

// START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});