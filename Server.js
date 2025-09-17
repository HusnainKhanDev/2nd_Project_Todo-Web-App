const express = require("express")
const env = require("dotenv").config()
const mongoose = require("mongoose")
const path = require('path')//helps in defining the path of views directory
const emailSendService = require("./5 MiddleWares/ScheduleEmail")


// Server---------------------
let app = express()
let port = 4080;
app.listen(port, ()=>{
    console.log("server Started")
})


// DataBase----------------------process.env.MONGO_URI use it while making docker image
mongoose.connect(process.env.MONGO_URI ||`mongodb://localhost/TO_DO_List`).then(()=>{
    console.log("Data Base Connected: ")
}).catch(()=>{
    console.log("Data Base Not Connected: ")
})

// MiddleWare--------------------
app.use(express.json())
app.use(express.urlencoded({extended: true})) //extended: false,  Uses querystring library, allows only simple, non-nested data. to be encoded
app.set("view engine", "ejs")// here we tell express  whihc view engine we are using
app.set('views', path.resolve("./4 views")) // set the directory 
app.use(express.static(path.join(__dirname, 'public'))) // for extra files like JS or CSS

// routes------------------------
let userRoute = require("./3 Routes/UserRoutes")
let viewRoute = require("./3 Routes/viewsRoutes")
let listRoute = require("./3 Routes/ListRoutes")
viewRoute(app)
userRoute(app)
listRoute(app)