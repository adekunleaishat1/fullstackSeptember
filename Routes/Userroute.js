const express = require("express")
const userrouter = express.Router()
const {Validator} = require("../middlewares/validator")
const {uservalidation} = require('../middlewares/uservalidation')
const { Usersignup, userLogin,VerifyUser , uploadProfile} = require("../Controllers/UserController")



userrouter.post('/signup',Validator(uservalidation), Usersignup)
userrouter.post('/login', userLogin)
userrouter.get('/verify', VerifyUser)
userrouter.post('/upload', uploadProfile)


module.exports  = userrouter