const express = require("express")
const userrouter = express.Router()

const { Usersignup, userLogin } = require("../Controllers/UserController")



userrouter.post('/signup', Usersignup)
userrouter.post('/login', userLogin)


module.exports  = userrouter