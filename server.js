const express = require("express")
const app = express()
const mongoose = require("mongoose")
const {MONGOURI} = require("./keys")
const PORT = 5000

//Connecting mongoDB to the site
mongoose.connect(
    MONGOURI, 
    { useNewUrlParser: true,
    useUnifiedTopology: true
     }).then(()=> {
    console.log('MongoDB Connected')
}).catch((err)=> {
    console.log(err)
})
//Letting the computer know that these models exist
require("./models/user")
require("./models/post")

app.use(express.json())

//Connecting routes to the router folder
app.use(require("./routes/auth"))
app.use(require("./routes/post"))

app.listen(PORT, () => {
    console.log("listening on port", PORT)
})


