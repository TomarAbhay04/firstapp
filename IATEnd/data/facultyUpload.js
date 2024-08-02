import mongoose from "mongoose";
import fs from "fs";
import { Faculty } from "../models/User.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "../.env" });

// MongoDB connection URI
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  throw new Error("MONGODB_URI is not defined in the environment variables.");
}

// Connect to MongoDB and upload data
async function main() {
  try {
    await mongoose.connect(mongoURI);
    console.log("Database connected");

    const data = await fs.promises.readFile('./facultyData.json', 'utf8');
    console.log("File read successfully. Parsing data...");
    const facultyData = JSON.parse(data);

    console.log("Faculty data to insert:", facultyData); // Log the data for debugging

    console.log("Data parsed. Inserting into database...");
    await Faculty.insertMany(facultyData);
    console.log("Faculty data uploaded successfully");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

main();
