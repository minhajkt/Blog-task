import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connectDB = async() => {
    try {
        await mongoose.connect("mongodb://localhost:27017/blog");
        console.log('MongoDB connected')
    } catch (error) {
        console.log('Error occured while connecting', error)
    }
}

export default connectDB;