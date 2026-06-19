const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const router = express.Router();

/* ==========================
   REGISTER
========================== */

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      age,
      gender,
      city,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message:
          "Name, Email and Password are required",
      });
    }

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      age,
      gender,
      city,
      role: "user",
    });

    await user.save();

    res.status(201).json({
      message:
        "User Registered Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

/* ==========================
   LOGIN
========================== */

router.post("/login", async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        city: user.city,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

/* ==========================
   GET ALL USERS
========================== */

router.get("/users", async (req, res) => {
  try {
    const users =
      await User.find()
        .select("-password")
        .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

/* ==========================
   MAKE ADMIN
========================== */

router.put(
  "/make-admin/:id",
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {
        return res.status(404).json({
          message:
            "User not found",
        });
      }

      if (
        user.role === "admin"
      ) {
        return res.status(400).json({
          message:
            "User is already admin",
        });
      }

      user.role = "admin";

      await user.save();

      res.json({
        message:
          "User promoted to admin successfully",
        user,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;