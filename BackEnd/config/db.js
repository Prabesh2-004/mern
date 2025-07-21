import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connect successfully")
    }
    catch (e) {
        console.error("Error from Database",e)
        process.exit(1); //1 mean exit with failure, 0 mean success
    }
}