const express = require("express");
const router = express.Router();

const Package = require("../models/package");

// GET all vehicles + filters
router.get("/", async (req, res) => {
  try {

    const {
      city,
      type,
      category,
      budget,
    } = req.query;

    let filter = {};

    if (city) {
      filter.city = city;
    }

    if (type) {
      filter.type = type;
    }

    if (category) {
      filter.category = category;
    }

    if (budget) {
      filter.pricePerDay = {
        $lte: Number(budget),
      };
    }

    const vehicles =
      await Package.find(filter);

    res.json(vehicles);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

// FEATURED BIKES
router.get(
  "/featured-bikes",
  async (req, res) => {
    try {

      const bikes =
        await Package.find({
          type: "Bike",
          featured: true,
        });

      res.json(bikes);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

// FEATURED CARS
router.get(
  "/featured-cars",
  async (req, res) => {
    try {

      const cars =
        await Package.find({
          type: "Car",
          featured: true,
        });

      res.json(cars);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

// GET SINGLE VEHICLE
router.get("/:id", async (req, res) => {
  try {

    const vehicle =
      await Package.findById(
        req.params.id
      );

    res.json(vehicle);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

// CREATE VEHICLE
router.post("/", async (req, res) => {
  try {

    const vehicle =
      await Package.create(
        req.body
      );

    res.status(201).json(
      vehicle
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

// UPDATE VEHICLE
router.put("/:id", async (req, res) => {
  try {

    const updatedVehicle =
      await Package.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(
      updatedVehicle
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

// DELETE VEHICLE
router.delete("/:id", async (req, res) => {
  try {

    await Package.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Vehicle deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

module.exports = router;