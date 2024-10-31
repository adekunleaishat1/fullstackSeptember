const mongoose = require("mongoose")


const chatshema = mongoose.Schema({
    sender:{type:String, required:true},
    message:{type:String, required:true}
})


const chatmodel = mongoose.model("chatmodel", chatshema)

module.exports = chatmodel