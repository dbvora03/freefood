const express = require("express")
const router = exppress.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const Post =  mongoose.model("Post")
const User = mongoose.model("User")


router.put('/updatepic', requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.user._id, {$set:{pic:req.body.pic}}, {new:true},
        (err, result) => {
            if(err) {
                return res.status(422).json({error: "Cannot update Profile picture"})
            }
            res.json(result)
        })
})





module.exports = router