const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const pharmacistSchema = new mongoose.Schema({
  username: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  pharmacyName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  userRole: {
    type: String,
    enum: ["user", "pharmacist", "doctor"],
    default: "pharmacist",
  },
});

pharmacistSchema.statics.pharmacistsignup = async function (
  username,
  registrationNumber,
  pharmacyName,
  email,
  password,
  location,
  userRole
) {
  if (
    !username ||
    !registrationNumber ||
    !pharmacyName ||
    !email ||
    !password ||
    !location ||
    !userRole
  ) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const existEmail = await this.findOne({ email });

  if (existEmail) {
    throw Error("Email already in use");
  }

  const existUsername = await this.findOne({ username });

  if (existUsername) {
    throw Error("Username already in use");
  }

  const existPharmacyname = await this.findOne({ pharmacyName });

  if (existPharmacyname) {
    throw Error("Pharmacy Name already in use");
  }

  const existRegNum = await this.findOne({ registrationNumber });

  if (existRegNum) {
    throw Error("Registration Number already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const pharmacist = await this.create({
    username,
    registrationNumber,
    pharmacyName,
    email,
    password: hash,
    location,
    userRole,
  });

  return pharmacist;
};

//static login method

pharmacistSchema.statics.pharmacistlogin = async function (username, password) {
  if (!username || !password) {
    throw Error("All feilds must be filled");
  }

  const pharmacist = await this.findOne({ username });

  if (!pharmacist) {
    throw Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, pharmacist.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return pharmacist;
};

const Pharmacist = mongoose.model("Pharmacist", pharmacistSchema);

module.exports = Pharmacist;
