const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const Post = mongoose.model("Post")

//We need the requirelogin middleware to make sure that we are authenticating the user when they go to this url
const requireLogin = require("../middlewares/requireLogin")
const addressConverter = require("../middlewares/addressconverter")
const { default: Axios } = require("axios")



// Back end for the feed
router.get("/feed", requireLogin, (req, res)=> {
    //Gets all posts in the mongoDB collection
    Post.find().populate("author", "_id name pic").then((posts)=> {
        //Responds the json to be used in the front end
        console.log(posts)
        res.json({posts})
    }).catch((err) => {
        console.log(err)
    })
})

router.get("/guestfeed", (req, res)=> {
    //Gets all posts in the mongoDB collection
    Post.find().populate("author", "_id name pic").then((posts)=> {
        //Responds the json to be used in the front end
        res.json({posts})
    }).catch((err) => {
        console.log(err)
    })
})



router.post("/createpost", requireLogin, (req,res)=> {
    console.log("b1")
    const {title, description, photo, address, dietaryRestrict} = req.body
    if(!title || !description || !photo || !address){
        //Checks to see if the post fields are filled
        res.status(422).json({error: "fill in the fields"})
    }
    //Creating a new post for the database
    console.log("b2")
    API_KEY="AIzaSyBcknGYr_7njtmcRrPgJLy9lYmsaaC1-xk"

    //Converts address into coordinates
    const response = Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`)

    const data = response.data
    console.log("b3")
    // Checks if the data really exists
    if (!data || data.status === 'ZERO_RESULTS') {
        console.error("does not exist");
    }
    console.log("b4")
    // Gets both lat and lng

    const lat = 0
    const lng = 0
    //const lat = data.results[0].geometry.location.lat
    //const lng = data.results[0].geometry.location.lng


    console.log("b5")
    //Ensures the response doesn't include the password
    req.user.password = undefined

    //Sends the new post to the database
    const post = new Post({
        title,
        description,
        photo,
        lat,
        lng,
        dietaryRestrict,
        author:req.user
    })
    //Saves, then returns the json of the saved object
    post.save().then(result=> {
        res.json({post:result})
    }).catch(err=> {
        console.log(err)
    }) 
})

//Populates posts only from the user
router.get("/profile",requireLogin, (req, res)=> {
    Post.find({author:req.user._id}).populate("author", "name _id").then((mypost)=> {
        res.json({mypost})
        console.log({mypost})
    }).catch((err)=> {
        console.log(err)
    })
})


router.delete("/deletepost/:postid", requireLogin, (req, res)=> {

        console.log("c1")
    //Finds the post with the parameter mentioned in the URL
    Post.findOne({_id:req.params.postid})
    .populate("author", "_id")
    .exec((err, post)=> {
        console.log(post)
        if (err || !post) {
            console.log("c2.0")

            return res.status(422).json({error:err})
        } 
        console.log("c2")

        //Checks to see if the post is actually from the person who posted it
        if (post.author._id.toString() === req.user._id.toString()) {
            console.log("c3")

            //If so, then permit delete
            post.remove().then(result=> {
                console.log("c4")

                res.json(result)
            }).catch(err=> {
                console.log("c4.1")

                console.log(err, "it wont delete ur post")
            })
        }
    })
})

module.exports = router