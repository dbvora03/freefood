const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const Post = mongoose.model("Post")

//We need the requirelogin middleware to make sure that we are authenticating the user when they go to this url
const requireLogin = require("../middlewares/requireLogin")

router.get("/feed", (req, res)=> {
    Post.find(/* Finds all posts*/).populate("author", "_id name").then((posts)=> {
        res.json({posts})
    }).catch((err) => {
        console.log(err)
    })
})

router.post("/createposting", requireLogin, (req,res)=> {
    const {title, body} = req.body
    if(!title || !body){
        //Checks to see if the post fields are filled
        res.status(422).json({error: "fill in the fields"})
    }
    //Creating a new post for the database

    //Ensures the response doesn't include the password
    req.user.password = undefined

    const post = new Post({
        title,
        body,
        author:req.user
    })
    //Saves, then returns the json of the saved object
    post.save().then(result=> {
        res.json({post:result})
    }).catch(err=> {
        console.log(err)
    }) 
})

router.get("/mypost",requireLogin, (req, res)=> {
    Post.find({author:req.user._id}).populate("author", "name _id").then((mypost)=> {
        res.json({mypost})
    }).catch((err)=> {
        console.log(err)
    })
})

module.exports = router