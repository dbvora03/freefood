const mongoose = require("mongoose");
const nodemon = require("nodemon");
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type:String,
        required:true
    },
    photo: {
        type:String,
        required:true
    },
    lat:{
        type:Number,
        required:true
    },
    lng:{
        type:Number,
        required:true
    },
    dietaryRestrict: {
        type: String,
        default: "None"
    },
    author: {
        type:ObjectId,
        ref:"User"
    }
    
}, {timestamps: true})

const Post = mongoose.model("Post", postSchema)

module.exports = Post;