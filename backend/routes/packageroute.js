const express = require("express");
const router = express.Router();

const Package = require("../models/package");

// GET all packages
router.get("/", async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE package
router.post("/", async (req, res) => {
  try {
    const packageData = await Package.create(req.body);
    res.status(201).json(packageData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE package
router.delete("/:id", async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);

    res.json({
      message: "Package deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const updatedPackage =
      await Package.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(updatedPackage);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const packageData =
      await Package.findById(
        req.params.id
      );

    res.json(packageData);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;