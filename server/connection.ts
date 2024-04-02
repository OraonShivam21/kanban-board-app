import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUri = process.env.MONGO_URI!;

const connection = mongoose.connect(mongoUri);

export default connection;
