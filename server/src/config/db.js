const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const baseUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!baseUri) {
      throw new Error("Missing MONGO_URI (or MONGODB_URI) in environment");
    }

    const parsedUri = new URL(baseUri);
    if (!parsedUri.pathname || parsedUri.pathname === "/") {
      parsedUri.pathname = "/lumined";
    }

    const connectionUri = parsedUri.toString();
    await mongoose.connect(connectionUri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
