import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async function(){
    try {
      const connectionInstace =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) 
      console.log(`\n MongoDB connected !! DB HOST ${connectionInstace.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection error",error);
        process.exit(1)
    }
}

export default connectDB