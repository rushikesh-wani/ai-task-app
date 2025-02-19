const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const encrptPass = async (password) => {
  const saltRound = 10;
  return await bcrypt.hash(password, saltRound);
};

module.exports = { encrptPass };
