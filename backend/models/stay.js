const mongoose = require("mongoose");

const StaySchema = new mongoose.Schema({
  title: String,

  category: String,

  location: String,

  price: Number,

  image: String,

  description: String,
});

module.exports = mongoose.model(
  "Stay",
  StaySchema
);