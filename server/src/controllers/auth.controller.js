const { encrptPass } = require("../utils");
const User = require("../models/user.model");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        err: "All fields are mandatory!",
      });
    }
    const isUserExtists = await User.findOne({ email });
    if (isUserExtists) {
      return res.status(400).json({
        err: "User already exists!",
      });
    }
    const hashed = await encrptPass(password);

    const user = new User({ name, email, password: hashed });
    const userDetails = await user.save();
    return res.status(201).json({
      statusCode: 201,
      success: true,
      message: "User registered successfully!",
      data: userDetails,
    });
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      message: "INTERNAL_SERVER_ERROR",
      err: err.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      err: "Required fields are missing!",
    });
  }
  const isUserValid = await User.findOne({ email });
  if (!isUserValid) {
    return res.status(400).json({
      err: "Register first! User not found.",
    });
  }
  const isPasswordValid = await isUserValid.validatePassword(password);
  if (!isPasswordValid) {
    return res.status(400).json({
      err: "password does not matched!",
    });
  }
  const token = await isUserValid.getJWT();
  return res.status(200).json({
    statusCode: 200,
    success: true,
    messsge: "Login successfull!",
    token: token,
    data: isUserValid,
  });
};

module.exports = { signUp, login };
