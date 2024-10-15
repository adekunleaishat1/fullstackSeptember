const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")

const userschema = mongoose.Schema({
    firstname:{type:String,trim:true,required:true },
    lastname:{type:String,trim:true,required:true},
    email:{type:String, unique:true, trim:true,required:true},
    password:{type:String, trim:true, required:true}
})

// let saltRound = 10
// userschema.pre("save", function (next) {
//     console.log(this);
//     bcryptjs.hash(this.password , saltRound).then((hashed)=>{
//         console.log(hashed);
//         this.password = hashed
//        next() 
//     }).catch((err)=>{
//         console.log(err);
        
//     })
       
// })

const usermodel = mongoose.model("user_collection", userschema)


module.exports = usermodel