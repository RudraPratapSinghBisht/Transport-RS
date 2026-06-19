const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    packageId: {
      type: String,
      required: true,
    },

    packageTitle: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    bookingId: {
      type: String,
      default: "",
    },

    paymentMethod: {
      type: String,
      default: "",
    },

    paymentId: {
      type: String,
      default: "",
    },

    paymentStatus: {
      type: String,
      default: "Pending",
    },

    phone: {
      type: String,
      default: "",
    },

    age: {
      type: Number,
      default: null,
    },

    gender: {
      type: String,
      default: "",
    },

    nationality: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "Pending",
      enum: [
        "Pending",
        "Approved",
        "Rejected",
      ],
    },

    bookingDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Booking",
  BookingSchema
);