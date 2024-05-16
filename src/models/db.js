import mongoose from "mongoose";

export const connectDB = async () => {
  const db_password="10egazUPEn0Anxea"
  const MONGO_URI = process.env.MONGODB_URI || `mongodb+srv://luisfrm:${db_password}@cluster0.72iw0vj.mongodb.net/login_app?retryWrites=true&w=majority&appName=Cluster0`;
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
}