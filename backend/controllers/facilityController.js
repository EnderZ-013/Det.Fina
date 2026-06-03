const Facility = require("../models/Facility");

// GET ALL
const getFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find();

    res.json(facilities);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE
const createFacility = async (req, res) => {
  try {
    const facility = await Facility.create(req.body);

    res.status(201).json(facility);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE
const updateFacility = async (req, res) => {
  try {
    const facility = await Facility.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(facility);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE
const deleteFacility = async (req, res) => {
  try {
    await Facility.findByIdAndDelete(req.params.id);

    res.json({
      message: "Facility deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getFacilities,
  createFacility,
  updateFacility,
  deleteFacility,
};