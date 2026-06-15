const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const packageroute = require("./routes/packageroute");
const bookingRoutes = require("./routes/bookingroute");
const dashboardRoutes =
  require("./routes/dashboardroute");
  const stayRoutes = require(
  "./routes/stayroute"
);

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/packages", packageroute);
app.use("/api/bookings", bookingRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/stays", stayRoutes);
// Test Route
app.get("/", (req, res) => {
  res.send("Horizon Compass Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});