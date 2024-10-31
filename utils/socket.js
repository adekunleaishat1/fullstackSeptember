const {io} = require("../index")
const  chatmodel = require("../Model/chatmodel")


io.on("connection", async(socket)=>{
    try {
        console.log("A user connected successfully");
    socket.on("sendmessage",async(chat)=>{
      console.log(chat);
      socket.emit("receivemessage", chat)
         await chatmodel.create({sender:chat.email, message:chat.message})
       
    })
    const allchat = await chatmodel.find()
    socket.emit("allmessage", allchat)

    } catch (error) {
        console.log(error);
        
    }
    
})

module.exports = io