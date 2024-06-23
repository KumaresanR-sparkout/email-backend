const express=require('express')
const cors=require('cors')
const nodemailer = require("nodemailer");

const app=express()
app.use(express.json())
app.use(cors())
const port=6000
app.post('/send-email',async(req,res)=>{
    try{
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, 
            auth: {
              user:'', //replace your email address
              pass:'' //replace your password
            },
          });

          const info = await transporter.sendMail({
            from: '',//replace from email
            to: '', // replace to email
            subject: 'sample email sending', // your subject
            text: 'have you enjoy your day', // your text
            html: '<h1>This is sample email checking</h1>', // your content
          });
        
          console.log("Message sent: %s", info);
          res.json({'staus':'ok','message':info})
    }
    catch(error){
        console.log(error.mesage)
    }
})

app.listen(port,()=>{
    console.log(`server started at port ${port}`)
})