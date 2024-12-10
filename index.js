// simple mail send using gmail 

const nodemailer = require('nodemailer');
const config = require('./config');
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:config.email.user, //email from .env
        pass:config.email.pass, // password from .env
    }
});


const mailOptions = {
    from: config.email.user, 
    to: 'kirtan.394160@gmail.com', 
    subject: 'NodeMailer Practice Email',
    text: 'Hello! This is a test email sent using NodeMailer.',
    html: '<b>Hello!</b> This is a test email sent using NodeMailer.',
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error:', error);
    }
    console.log('Email sent:', info.response);
  });