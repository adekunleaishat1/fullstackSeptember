const express = require("express")
const userrouter = express.Router()

const { Usersignup, userLogin,VerifyUser , uploadProfile} = require("../Controllers/UserController")



userrouter.post('/signup', Usersignup)
userrouter.post('/login', userLogin)
userrouter.get('/verify', VerifyUser)
userrouter.post('/upload', uploadProfile)


module.exports  = userrouter