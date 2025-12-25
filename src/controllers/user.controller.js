import asynchandler from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {User} from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"

import { uploadOnCloudinary } from "../utils/cloudinary.js"

const registerUser = asynchandler( async(req, res)=>{
    // get user details from frontend
    //validation - not empty
    // check if user already exists : username, email
    // check for image, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token fiel from response
    // check for user creation
    // return res 

    const {fullName, email, username, password } = req.body
    console.log("email: ", email)

    if(fullName === "")
     {
        throw new ApiError(400, " fullname is required...")
     }
    

     if(email === "")
     {
        throw new ApiError(400, "email is required...")
     }

     if(username === "")
     {
        throw new ApiError(400, "username is required...")
     }

     if(password === "")
     {
        throw new ApiError(400, "password is required...")
     }

    // if(
    // [fullName, email, username, password].some((field)=> 
    //     field?.trim() === ""))
    // {
    //     throw new ApiError(400, " All fields are required....")
    // }
     
    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })
     
    if(existedUser){
        throw new ApiError(4009, "User with email or username already exist...")
    }
 
   const avatarLocalPath = req.files?.avatar[0]?.path;
   const coverImageLocalPath = req.files?.coverImage[0]?.path;

   if(!avatarLocalPath)
   {
    throw new ApiError(400, "Avatar file is required...")
   }
    
   const avatar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImage)

   if(!avatar)
   {
    throw new ApiError(400, "Avatar file is required...")
   }
    
   const user = await User.create({
    fullName,
    avatar : avatar.url,
    coverImage : coverImage?.url || "",
    email,
    password,
    username : username.toLowerCase()

   })

   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )

   if(!createdUser)
   {
    throw new ApiError(500, "something went wrong while registering the user")
   }


    return  res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully.... ")
    )

})



export default registerUser
