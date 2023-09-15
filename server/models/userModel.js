const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    enum: ["user", "pharmacist"],
    required: true,
  },
  // Add more fields as needed for user profile
});

//static signup method
userSchema.statics.signup = async function (
  username,
  email,
  password,
  userRole
) {
  //validator
  if (!email || !password || !username || !userRole) {
    throw Error("All feilds must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, username, password: hash, userRole });

  return user;
};

//static login method

userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("All feilds must be filled");
  }

  const user = await this.findOne({ username });

  if (!user) {
    throw Error("Incorrect Username");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
