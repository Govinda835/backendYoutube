//require ("dotenv").config({path: "./env"})
import dotenv from "dotenv"

import mongoose from "mongoose"
import { DB_NAME } from "./constant.js"
import connectDB from "./db/index.js"
import app from "./app.js"

dotenv.config({
    path: './env'
})

// app()

connectDB() //async promise to return something so(.then() and .cath())
.then(()=>{  // for success
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`The server is running on the port number ${process.env.PORT}`)
    })
})
.catch((err)=>{    // database connection fail...
    console.log("MONGODB connection failed!!!!",err)
})

