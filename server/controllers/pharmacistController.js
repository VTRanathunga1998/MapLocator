const Pharmacist = require("../models/pharmacistModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//LOGIN pharmacist
const loginPharmacist = async (req, res) => {
  const { username, password } = req.body;

  try {
    const pharmacist = await Pharmacist.pharmacistlogin(username, password);

    //create token
    const token = createToken(pharmacist._id);

    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//SIGNUP pharmacist
const signupPharmacist = async (req, res) => {
  const {
    username,
    registrationNumber,
    pharmacyName,
    email,
    password,
    location,
    userRole,
  } = req.body;


  try {
    const pharmacist = await Pharmacist.pharmacistsignup(
      username,
      registrationNumber,
      pharmacyName,
      email,
      password,
      location,
      userRole
    );

    //create token
    const token = createToken(pharmacist._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

module.exports = { signupPharmacist, loginPharmacist };
