const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  brand: {
    type: String,
  },

  pricePerDay: {
    type: Number,
    required: true,
  },

  fuelType: {
    type: String,
  },

  transmission: {
    type: String,
  },

  image: {
    type: String,
  },

  description: {
    type: String,
  },

  featured: {
    type: Boolean,
    default: false,
  },
},
{
  timestamps: true,
}
);

module.exports =
mongoose.model(
  "Package",
  PackageSchema
);