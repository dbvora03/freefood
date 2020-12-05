const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const Post = mongoose.model("Post")

//We need the requirelogin middleware to make sure that we are authenticating the user when they go to this url
const requireLogin = require("../middlewares/requireLogin")

router.get("/feed", (req, res)=> {
    Post.find().populate("author", "_id title").then((posts)=> {
        res.json({posts})
    }).catch((err) => {
        console.log(err)
    })
})




router.post("/createpost", requireLogin, (req,res)=> {
    const {title, body, pic} = req.body
    console.log(title, body, pic)
    if(!title || !body || !pic){
        //Checks to see if the post fields are filled
        res.status(422).json({error: "fill in the fields"})
    }
    //Creating a new post for the database

    //Ensures the response doesn't include the password
    req.user.password = undefined

    const post = new Post({
        title,
        body,
        photo:pic,
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