const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()
const userrouter = require("./Routes/Userroute")
const cors = require("cors")

//middlewares
app.use(express.json())
app.use(cors({origin:"*"}))
app.use('/user', userrouter)



// app.get('/',(req, res)=>{
//     res.send("welcome to modularization")
// })







 const uri =  process.env.URI


const connect = async() =>{
    try {
      const connection = await mongoose.connect(uri) 
      if (connection) {
        console.log("connected to database");
        
      }
    } catch (error) {
        console.log(error);
        
    }
}
connect()

const port = 5002

app.listen(port,()=>{
    console.log("app started on port " + port);
    
})