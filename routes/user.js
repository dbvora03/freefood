const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const Post =  mongoose.model("Post")
const User = mongoose.model("User")

//Back end feature to update profile picture
router.put('/updatepic', requireLogin, (req, res) => {
    //Uses the following function to find the photo and update it
    User.findByIdAndUpdate(req.user._id, {$set:{pic:req.body.pic}}, {new:true},
        (err, result) => {
            if(err) {
                return res.status(422).json({error: "Cannot update Profile picture"})
            }
            res.json(result)
        })
})





module.exports = router