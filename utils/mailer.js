const nodemailer = require("nodemailer")

const Sendmail = async (username, email) =>{

   const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
         user:process.env.USER_EMAIL,
         pass:process.env.USER_PASS
        }
    })
     const messageTemplate = `
       <div>
        <h2>Welcome message</h2>
        <ul>
            <li>Name: ${username}</li>
            <li>Email: ${email}</li>
        </ul>
        <div>
            <p>Dear ${username}, </p>
            <p>Welcome to Sqi Alumni Association , You are highly welcome.</p>
        </div>
    </div>
     `

     const mailOptions ={
        from:process.env.USER_EMAIL,
        to:email,
        subject:"Welcome Message",
        html:messageTemplate
     }
   try {
    const sentmail = await transporter.sendMail(mailOptions)
    if (sentmail) {
       console.log("mail sent successfully");
        
    }
   } catch (error) {
    console.log(error);
    
   }
}


module.exports = Sendmail