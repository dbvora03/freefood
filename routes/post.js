const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const Post = mongoose.model("Post")

//We need the requirelogin middleware to make sure that we are authenticating the user when they go to this url
const requireLogin = require("../middlewares/requireLogin")

router.get("/feed", requireLogin, (req, res)=> {
    Post.find().populate("author", "_id title").then((posts)=> {
        res.json({posts})
    }).catch((err) => {
        console.log(err)
    })
})




router.post("/createpost", requireLogin, (req,res)=> {
    const {title, description, photo} = req.body
    console.log(title, description, photo)
    if(!title || !description || !photo){
        //Checks to see if the post fields are filled
        res.status(422).json({error: "fill in the fields"})
    }
    //Creating a new post for the database

    //Ensures the response doesn't include the password
    req.user.password = undefined

    const post = new Post({
        title,
        description,
        photo,
        author:req.user
    })
    //Saves, then returns the json of the saved object
    post.save().then(result=> {
        res.json({post:result})
    }).catch(err=> {
        console.log(err)
    }) 
})

router.get("/profile",requireLogin, (req, res)=> {
    Post.find({author:req.user._id}).populate("author", "name _id").then((mypost)=> {
        res.json({mypost})
        console.log({mypost})
    }).catch((err)=> {
        console.log(err)
    })
})

router.delete("/deletepost/:postid", (req, res)=> {
    Post.findOne({_id:req.params.postid})
    .populate("author", "_id")
    .then((err, post)=> {
        if (err || !post) {
            return res.status(422).json({error:err})
        } 
        if (post.author._id.toString() === req.user._id.toString()) {
            post.remove().then((res)=> {
                res.json(res)
            }).catch(err=> {
                console.log(err, "it wont delete ur post")
            })
        }
    })
})

module.exports = router