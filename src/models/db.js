import mongoose from "mongoose";

export const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not set");
    }

    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
}