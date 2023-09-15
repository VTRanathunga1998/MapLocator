const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id, userRole) => {
  return jwt.sign(
    {
      UserInfo: {
        username: _id,
        role: userRole,
      },
    },
    process.env.SECRET,
    { expiresIn: "3d" }
  );
};

//LOGIN user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ username: user.username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//SIGNUP user
const signupUser = async (req, res) => {
  const { username, email, password, userRole } = req.body;
  console.log("hit");
  try {
    const user = await User.signup(username, email, password, userRole);

    //create token
    const token = createToken(user._id, user.userRole);

    res.status(200).json({ email, username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

module.exports = { signupUser, loginUser };
