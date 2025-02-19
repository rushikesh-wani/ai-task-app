const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minLength: 3,
      maxLength: 150,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const hashPassword = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    hashPassword
  );
  return isPasswordValid;
};

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );
  return token;
};

const UserModal = new mongoose.model("user", userSchema);

module.exports = UserModal;
