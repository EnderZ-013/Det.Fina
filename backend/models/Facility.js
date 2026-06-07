const mongoose = require("mongoose");

const facilitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    sport: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
    status: {
  type: String,
  default: "Available",
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Facility", facilitySchema);