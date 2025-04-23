const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database connected");
  } catch (e) {
    console.log("Database not connected: ", e);
  }
};

module.exports = connectDB;
