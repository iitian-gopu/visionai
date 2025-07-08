import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    firebaseUid:{
        type:String,
        unique:true
    },
    name:String,
    email:String,
    avatar:String,
    plan:{
        type:String,
        default:"free"
    },
    credits:{
