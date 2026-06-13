const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
  title: String,
  city: String,
  duration: String,
  price: Number,
  image: String,
  description: String,
});

module.exports = mongoose.model("Package", PackageSchema);