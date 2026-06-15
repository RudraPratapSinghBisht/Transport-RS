const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
  title: String,
  city: String,
  country: String,
  duration: String,
  price: Number,
  image: String,
  description: String,

  includes: [String],
});

module.exports = mongoose.model("Package", PackageSchema);