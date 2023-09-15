const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  pharmacyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pharmacist",
    required: true,
  },
  batchNumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
