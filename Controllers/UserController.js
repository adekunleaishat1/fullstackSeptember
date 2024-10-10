const usermodel = require("../Model/Usermodel")


const Usersignup = async (req, res) =>{
    try {
        console.log(req.body)
        const {firstname, lastname, email, password} = req.body
        if (!firstname || !lastname || !email || !password) {
           res.status(400).send({message:"All fields are mandatory", status:false}) 
        }else{
          const user =  await usermodel.create(req.body)
          if (user) {
            res.status(200).send({message:"Signup successful", status:true}) 
          }else{
            res.status(403).send({message:"error occur while creating user", status:false}) 
          }
        }  
        
    } catch (error) {
        res.status(500).send({message:error.message, status:false}) 
    }
}


module.exports = {Usersignup}