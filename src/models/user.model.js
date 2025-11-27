import mongoose, { Schema } from "mongoose"

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true // better for searching 
    },
       email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, 
    },
     fullname:{
        type: String,
        required: true,
        trim: true,
        index: true 
    },
    avater: {
        type: String, // cloudinary url
        required: true,
    },
    coverImage:{
        type : String, // cloudinary url
    },
    watchHistory: [
        {
            type : Schema.Types.ObjectId,
            ref: "Video"
               
        }
    ],
    password:{
        type: String,
        required: [true,"password is required...."],
    },
    refreshToken:{
        type: String,

    }

},{timestamps: true})

const User = mongoose.model("User",userSchema)

export {User}
