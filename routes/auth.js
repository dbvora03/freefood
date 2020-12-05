const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const User = mongoose.model("User")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require("../keys")
const requireLogin = require("../middlewares/requireLogin")

// This file is for handeling sign ups and sign ins

router.post('/signup', (req, res, next) => {

    //On this url, whatever is responded to it, the cont will split the body into its constituent parts
    // WE NEED TO HAVE JSON RESPONDED IN THIS FORMAT LATER

    const {name, email, password} = req.body

    while (!email || !password || !name) {
        
        //Check if one of the fields dont exist
        res.status(422).json({error: "add all of the fields please"})

    }
   
    //Use mongoDB to search through database to see if the emails are matching
    User.findOne({email:email}).then((savedUser)=> {

        if(savedUser) {
            res.status(422).json({error: "user already exists, log in here"})
        } 

        //Crypt the password
        bcrypt.hash(password, 18).then(hashedpassword=> {
            //Create a new instance of User, dont worry about hashed password, bcrypt should handle it.
            const user = new User({
                email:email,
                password:hashedpassword,
                name:name,
            })

            //Adds this user to the MongoDB database
            user.save().then(user=> {
                res.json({message:"saved"}).pretty(); //Check if pretty() works on MongoDB
            })
            .catch((err) => {
                console.log(err)
            })
        })
    })
})

router.post("/signin", (req, res, next)=> {

    const {email, password} = req.body
    while (!email || !password){
        //Check if one of the fields dont exist
        res.status(422).json({error: "add all of the fields please"})
    }
    
    User.findOne({email:email}).then(savedUser=> {
        if (!savedUser) {
            return res.status(422).json({error: "Invalid email or password, please sign up!"})
        }
        bcrypt.compare(password, savedUser.password).then(doMatch=> {
            if(doMatch == true) {
        
                const token = jwt.sign({_id:savedUser._id}, JWT_SECRET)
                const {_id, name, email} = savedUser
                res.json({token:token, user:{_id, name, email}})
                console.log(user)
            }
            

            else {
                return res.status(422).json({error: "Invalid email or password"})
            }
        }).catch((err)=> console.log(err))

    }).catch((err) => console.log("Its either that email dont exist, or the following error", err))
})

router.get("/protected", requireLogin, (req, res)=> {
    res.send("logging you in")
})

module.exports = router

