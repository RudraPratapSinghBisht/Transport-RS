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
    phone: String,

age: Number,

gender: String,

nationality: String,

state: String,

    status: {
      type: String,
      default: "Pending",
    },

    bookingDate: {
      type: Date,
      default: Date.now,
    },
  },{
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", BookingSchema);
