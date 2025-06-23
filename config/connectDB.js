import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if(!process.env.MONGODB_URI){
    throw new Error(
        "Enter your mongodb uri."
    )
    
}

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDb Connected.")
    } catch (error) {
        console.log("Mongodb connection error", error)
        process.exit(1);
    }
}
export default connectDB;