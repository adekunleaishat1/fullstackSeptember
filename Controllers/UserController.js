const usermodel = require("../Model/Usermodel")
const bcryptjs = require("bcryptjs")


const Usersignup = async (req, res) =>{
    try {
        console.log(req.body)
        const {firstname, lastname, email, password} = req.body
        if (!firstname || !lastname || !email || !password) {
           res.status(400).send({message:"All fields are mandatory", status:false}) 
        }else{
         const hashedpassword = await bcryptjs.hash(password, 10)
          const user =  await usermodel.create({
            firstname,
            lastname,
            email,
            password:hashedpassword
          })
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


const userLogin = async(req, res)=>{
    try {
        const {email , password} = req.body
      console.log(req.body);
      if (!email || !password) {
        res.status(400).send({message:"All fields are mandatory", status:false}) 
      }else{
       const existemail =  await usermodel.findOne({email})
       console.log(existemail);
       
       if (!existemail) {
        res.status(402).send({message:"Not a registered User ; Please sign Up", status:false}) 
       }else{
         const correctpassword =  await bcryptjs.compare(password, existemail.password )
         if (correctpassword) {
          res.status(200).send({message:"Login successful", status:true}) 
         }else{
          res.status(405).send({message:"Invalid Password", status:false}) 
         }
       }
      }
      
    } catch (error) {
      res.status(500).send({message:error.message, status:false}) 
    }
}


module.exports = {Usersignup, userLogin}