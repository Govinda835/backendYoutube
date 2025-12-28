import mongoose, { Schema } from "mongoose"

import jwt from "jsonwebtoken"

import bcrypt from "bcryptjs"

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
     fullName:{
        type: String,
        required: true,
        trim: true,
        index: true 
    },
    avatar: {
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


userSchema.pre("save", async function () {
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10)
})

// userSchema.pre("save",  function() {
//     if(!this.isModified("password")) return ;

//     this.password =  bcrypt.hash(this.password, 10)   //encrypting password 
// })

userSchema.methods.isPasswordCorrect = async function (password){  // password checking 
   return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    jwt.sign(
        {
            _id : this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const User = mongoose.model("User",userSchema)

export {User}

