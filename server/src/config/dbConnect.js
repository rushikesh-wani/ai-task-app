const mongoose = require("mongoose");

const connectDB = async () => {
  const options = {
    dbName: "task",
  };
  await mongoose.connect(process.env.MONGO_URI, options);
};

module.exports = { connectDB };
