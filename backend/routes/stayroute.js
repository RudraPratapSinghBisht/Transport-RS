const express = require("express");
const router = express.Router();

const Stay = require("../models/stay");

// GET ALL STAYS
router.get("/", async (req, res) => {
  try {
    const stays = await Stay.find();
    res.json(stays);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// CREATE STAY
router.post("/", async (req, res) => {
  try {
    const stay = await Stay.create(req.body);

    res.status(201).json(stay);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const stay =
      await Stay.findById(
        req.params.id
      );

    res.json(stay);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// DELETE STAY
router.delete("/:id", async (req, res) => {
  try {
    await Stay.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Stay deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;