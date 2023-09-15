const express = require("express");
const {
  addMedicine,
  updateMedicine,
  deleteMedicine,
  searchMedicine,
  getPharmacyLocations,
  getMedicineSuggestions,
} = require("../controllers/medicineController");

const router = express.Router();

// Add a new medicine
router.post("/add", addMedicine);

// Medicine suggestions
router.get("/medicine-suggestions", getMedicineSuggestions);

// Update a medicine
router.patch("/update/:medicineId", updateMedicine);

// Delete a medicine
router.delete("/delete/:medicineId", deleteMedicine);

// Search for medicines
router.get("/search/:medicineName", searchMedicine);

// Get pharmacy locations for a specific medicine
router.get("/pharmacy-locations/:medicineId", getPharmacyLocations);

module.exports = router;
