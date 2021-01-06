const express = require("express")
const app = express()
const mongoose = require("mongoose")
const {MONGOURI} = require("./config/keys")

require('dotenv').config()
const PORT = process.env.PORT || 4949
const cors = require('cors')
const path = require("path")

app.use(cors())
//We dont need cors anymore because we are using the proxy command

app.use(express.static('client/build'))

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


//Now we can use json features to respond and request with the server. DONT TOUCH
app.use(express.json())

//Connecting routes to the router folder
app.use(require("./routes/auth"))
app.use(require("./routes/post"))


app.use(express.static('client/build'))

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname,'client','build', 'index.html')));

// Allows the server to use static files during production

app.listen(PORT, () => {
    console.log("listening on port", PORT)
})


