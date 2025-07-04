import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected')
    } catch (error) {
        console.log('Error occured while connecting', error)
    }
}

export default connectDB; 