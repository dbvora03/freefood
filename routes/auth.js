const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const User = mongoose.model("User")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require("../config/keys")
const requireLogin = require("../middlewares/requireLogin")

// This file is for handeling sign ups and sign ins

router.post('/signup', (req, res, next) => {

    //On this url, whatever is responded to it, the cont will split the body into its constituent parts
    // WE NEED TO HAVE JSON RESPONDED IN THIS FORMAT LATER

    const {name, email, password, pic} = req.body

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
        bcrypt.hash(password, 18).then(async hashedpassword=> {
            //Create a new instance of User, dont worry about hashed password, bcrypt should handle it.
            const user = new User({
                email:email,
                password:hashedpassword,
                name:name,
                pic
            })

            //Adds this user to the MongoDB database
            const daUser = await user.save()
            res.json({message:"saved"})
        })
    })
})

router.post("/signin", (req, res, next)=> {

    const {email, password} = req.body
    while (!email || !password){
        //Check if one of the fields dont exist
        res.status(422).json({error: "add all of the fields please"})
    }
    
    //Checks if the user actually exists or not
    User.findOne({email:email}).then(async savedUser=> {
        if (!savedUser) {
            return await res.status(422).json({error: "Invalid email or password, please sign up!"})
        }
        //Compares the hashed password to the one inputted
        bcrypt.compare(password, savedUser.password).then(doMatch=> {
            if(doMatch == true) {
        
                //If they match, it will create a user token
                const token = jwt.sign({_id:savedUser._id}, JWT_SECRET)
                const {_id, name, email, pic} = savedUser
                //sends in both the token created and the user data
                res.json({token:token, user:{_id, name, email, pic}})
            }
            

            else {
                return res.status(422).json({error: "Invalid email or password"})
            }
        }).catch((err)=> console.log(err))

    }).catch((err) => console.log("Its either that email dont exist, or the following error", err))
})

//May implement this later on
router.get("/protected", requireLogin, (req, res)=> {
    res.send("logging you in")
})

module.exports = router

