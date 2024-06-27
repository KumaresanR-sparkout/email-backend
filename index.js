const express = require('express')
const cors = require('cors')
const nodemailer = require("nodemailer");
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())
const port = 5000
app.post('/send-email', async (req, res) => {
  try {
  
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL, //replace your email address
        pass: process.env.PASSWORD //replace your password
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL,//replace from email
      to: 'kumaresan1234@yopmail.com', // replace to email
      subject: req.subject, // your subject
      html: req.message, // your content
    });
    // console.log(info)
    if (!info.accepted?.length) {
      return res.json({ 'staus': false, 'message': 'message send fail' })

    }
    return res.json({ 'staus': true, 'messageId': 'mail sended for provided email' })
  }
  catch (error) {
    console.log("error:", error)
  }
})

app.get('/get', async (req, res) => {
  res.json({ 'staus': 'ok' })
})

app.listen(port, () => {
  console.log(`server started at port ${port}`)
})