const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    }, 
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    pic: {
        type:String,
        default: "https://res.cloudinary.com/dcjuakpsl/image/upload/v1607471207/NoProfile-Chef_zzyzzf.png"
    }
})

mongoose.model("User", userSchema)

101279464284