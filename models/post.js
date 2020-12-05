const mongoose = require("mongoose")
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
    author: {
        type:ObjectId,
        ref:"User"
    }
    
}, {timestamps: true})

const Post = mongoose.model("Post", postSchema)

module.exports = Post;