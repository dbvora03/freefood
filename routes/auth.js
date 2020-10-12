const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const User = mongoose.model("User")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require("../keys")
const requireLogin = require("../middlewares/requireLogin")




router.post('/signup', (req, res, next) => {

    const {name, email, password} = req.body
    if (!email || !password || !name) {
        res.status(422).json({error: "add all of the fields please"})
    }
    User.findOne({email:email}).then((savedUser)=> {
        if(savedUser) {
            res.status(422).json({error: "user already exists, log in here"})
        } 

        bcrypt.hash(password, 18).then(hashedpassword=> {
            const user = new User({
                email:email,
                password:hashedpassword,
                name:name
            })
            user.save().then(user=> {
                res.json({message:"saved"})
            })
            .catch((err) => {
                console.log(err)
            })
        })
    })
})

router.post("/signin", (req, res, next)=> {
    const {email, password} = req.body
    if(!email || !password) {
        res.status(422).json({error: "please fill in the required fields"})
    }
    User.findOne({email:email}).then(savedUser=> {
        if (!savedUser) {
            return res.status(422).json({error: "Invalid email or password, please sign up!"})
        }
        bcrypt.compare(password, savedUser.password).then(doMatch=> {
            if(doMatch == true) {
        
                const token = jwt.sign({_id:savedUser._id}, JWT_SECRET)
                res.json({token:token})

            }
            else {
                return res.status(422).json({error: "Invalid email or password"})
            }
        }).catch((err)=> console.log(err))
    })
})

router.get("/protected", requireLogin, (req, res)=> {
    res.send("logging you in")
})

module.exports = router

