import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.log("Failed connecting to DB", error.message);
  }
};
