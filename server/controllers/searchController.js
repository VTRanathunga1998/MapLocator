const Medicine = require("../models/medicineModel");
const Pharmacist = require("../models/pharmacistModel");

const getPharmacyLocations = async (req, res) => {
  try {
    const { medicineName } = req.params;

    // Retrieve pharmacy locations related to the specific medicine
    const medicines = await Medicine.find({ name: medicineName });

    const pharmacyIds = new Set(); // Set to track unique pharmacy IDs
    const pharmacyLocations = [];

    for (const medicine of medicines) {
      const pharmacy = await Pharmacist.findById(medicine.pharmacyId);

      if (pharmacy && !pharmacyIds.has(pharmacy._id.toString())) {
        pharmacyIds.add(pharmacy._id.toString()); // Add pharmacy ID to Set
        pharmacyLocations.push({
          pharmacyName: pharmacy.pharmacyName,
          location: pharmacy.location,
        });
      }
    }

    res.status(200).json(pharmacyLocations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  getPharmacyLocations,
};
