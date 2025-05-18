const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/idatabook";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

module.exports = connectToMongo;
