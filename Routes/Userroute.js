const express = require("express")
const userrouter = express.Router()

const { Usersignup } = require("../Controllers/UserController")



userrouter.post('/signup', Usersignup)


module.exports  = userrouter