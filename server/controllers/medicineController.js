const Medicine = require("../models/medicineModel");
const mongoose = require("mongoose");

const addMedicine = async (req, res) => {
  try {
    const {
      pharmacyId,
      batchNumber,
      name,
      company,
      quantity,
      expiryDate,
      type,
    } = req.body;

    // Check if the medicine with the same batch number and name exists in the same pharmacy
    const existingMedicine = await Medicine.findOne({
      pharmacyId,
      batchNumber,
      name,
      company,
    });

    if (existingMedicine) {
      return res.status(400).json({ error: "Duplicate medicine entry" });
    }

    const medicine = {
      pharmacyId,
      batchNumber,
      name,
      company,
      quantity,
      expiryDate,
      type,
    };

    const json = await Medicine.create(medicine);

    res.status(201).json(json);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
const getMedicineSuggestions = async (req, res) => {
  try {
    const { searchValue } = req.query; // Get the search value from query parameters
    const regex = new RegExp(searchValue, 'i'); // Case-insensitive regex pattern

    // Use the aggregation framework to group and return unique medicine names
    const suggestions = await Medicine.aggregate([
      {
        $match: { name: regex }, // Filter by search value
      },
      {
        $group: {
          _id: '$name', // Group by medicine name
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id field
          name: '$_id', // Rename _id as name
        },
      },
    ]).limit(10);

    res.json(suggestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a medicine
const updateMedicine = async (req, res) => {
  try {
    const { batchNumber } = req.params;
    const updateData = req.body;
    const updatedMedicine = await Medicine.findOneAndUpdate(
      { batchNumber },
      updateData,
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Medicine updated successfully", updatedMedicine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// Delete a medicine
const deleteMedicine = async (req, res) => {
  try {
    const { batchNumber } = req.params;
    await Medicine.findOneAndDelete({ batchNumber });
    res.status(200).json({ message: "Medicine deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// Search for medicines
const searchMedicine = async (req, res) => {
  try {
    const { medicineName } = req.params;
    const medicines = await Medicine.find({
      name: { $regex: medicineName, $options: "i" },
    });
    res.status(200).json(medicines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// Get pharmacy locations for a specific medicine
const getPharmacyLocations = async (req, res) => {
  try {
    const { medicineId } = req.params;
    // Logic to retrieve pharmacy locations related to the specific medicine
    // You'll need to implement this based on your project's requirements
    const pharmacyLocations = [];
    res.status(200).json(pharmacyLocations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  addMedicine,
  updateMedicine,
  deleteMedicine,
  searchMedicine,
  getPharmacyLocations,
  getMedicineSuggestions
};
