const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config/keys")
const mongoose = require("mongoose")

const User = mongoose.model("User")


module.exports = (req, res, next)=> {
    const {authorization} = req.headers
    if (!authorization) {
        //Render the login page
        return res.status(401).json({error: "you need to be logged in"})
    }
        //Grabs the token from the front end
        const token = authorization.replace("Bearer ", "")

        //Checks to see if the tokens are matched and not tampered with
        jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
            if(err) {
                return res.status(401).json({error: "you must be logged in"})
            }
            //Sets the payload of the token to whoever is logged in
            const {_id} = payload
            User.findById(_id).then(userdata=> {
                req.user = userdata

                //Ensures that express can move on to the next middleware, instead of staying hanging
                next()
            })
            
        })
}


