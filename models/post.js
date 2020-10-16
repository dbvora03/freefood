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
        default:"no photo"
    },
    author: {
        type:ObjectId,
        ref:"User"
    },
    dietaryinfo: {
        type:String,
        required:false
    },
    pickupBy: {
        type:Date,
        required:true
    }
    
})

mongoose.model("Post", postSchema)