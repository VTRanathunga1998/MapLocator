const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const pharmacistController = require("../controllers/pharmacistController");

// User registration
router.post("/signup/user", userController.signupUser);

// User login
router.post("/login/user", userController.loginUser);

// Pharmacist registration
router.post("/signup/pharmacist", pharmacistController.signupPharmacist);

// Pharmacist login
router.post("/login/pharmacist", pharmacistController.loginPharmacist);

module.exports = router;
