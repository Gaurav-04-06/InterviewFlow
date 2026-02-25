import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    if (!ENV.DB_URL) {
      throw new Error("Database URL is not defined");
    }

    console.log("Trying to connect to DB...");
    await mongoose.connect(ENV.DB_URL);

    console.log("Database connected successfully");
  } catch (error) {
    console.error("FULL DB ERROR:", error);  
    process.exit(1);
  }
};
