const usermodel = require("../Model/Usermodel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cloudinary = require("../utils/cloudinary")
const Sendmail = require("../utils/mailer")


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
            Sendmail(firstname,email)
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
          let secretKey = "secretKey"
          const token =  await jwt.sign({email}, secretKey , {expiresIn:"1d"})
          res.status(200).send({message:"Login successful", status:true, token}) 
         }else{
          res.status(405).send({message:"Invalid Password", status:false}) 
         }
       }
      }
      
    } catch (error) {
      res.status(500).send({message:error.message, status:false}) 
    }
}

const VerifyUser = async (req, res)=>{
  try {
    let token = req.headers.authorization.split(" ")[1]
  console.log(token);
   const verifytoken = await jwt.verify(token, "secretKey")
   console.log(verifytoken);
    if (!verifytoken) {
    res.status(405).send({message:"token verifucation failed", status:false})
   }else{
     res.status(200).send({message:"token Verified", status:true})
   }

  } catch (error) {
    console.log(error);
    if (error.JsonWebTokenError) {
      res.status(407).send({message:error.JsonWebTokenError, status:false}) 
    }
    
  }
}

const uploadProfile = async(req, res) =>{
   try {
    console.log(req.body);
    let token = req.headers.authorization.split(" ")[1]
   const verifytoken = await jwt.verify(token, "secretKey")
   console.log(verifytoken.email);
   if (!verifytoken) {
    res.status(402).send({message:"error verifying token", status:false})
   }else{
    const {image} = req.body
    const uplodimage =  await cloudinary.uploader.upload(image)
   

     if (uplodimage) {
     const update =  await usermodel.findOneAndUpdate(
        {email:verifytoken.email},
        {profileimage:uplodimage.secure_url},
        {new:true}
       )

       if (update) {
        res.status(200).send({message:"profile updated successfully", status:true})
       }else{
        res.status(400).send({message:"error updating profile", status:false})
       }
       
     }
   }
    
   } catch (error) {
    res.status(500).send({message:error.message, status:false})
   }
}


module.exports = {Usersignup, userLogin, VerifyUser, uploadProfile}