const express = require("express");

const router = express.Router();

const {
  getFacilities,
  createFacility,
  updateFacility,
  deleteFacility,
} = require("../controllers/facilityController");

router.get("/", getFacilities);

router.post("/", createFacility);
router.put("/:id", updateFacility);

router.delete("/:id", deleteFacility);

module.exports = router;