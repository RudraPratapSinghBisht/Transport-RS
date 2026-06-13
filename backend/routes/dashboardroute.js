const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Package = require("../models/package");
const Booking = require("../models/Booking");

router.get("/", async (req, res) => {
  try {
    const totalUsers =
      await User.countDocuments();

    const totalPackages =
      await Package.countDocuments();

    const totalBookings =
      await Booking.countDocuments();

    const approvedBookings =
      await Booking.find({
        status: "Approved",
      });

    let revenue = 0;

approvedBookings.forEach((booking) => {
  revenue += booking.price || 0;
});

    res.json({
      totalUsers,
      totalPackages,
      totalBookings,
      revenue,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;