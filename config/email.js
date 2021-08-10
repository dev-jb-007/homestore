require('dotenv').config();
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SANDGRID_APIKEY); 
const sendotpemail=(email,otp)=>
{
sgMail
  .send({
    to: email, // Change to your recipient
    from: 'homestore8907@gmail.com', // Change to your verified sender
    subject: 'Otp',
    text: `Your Otp is ${otp}`,
  })
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}
module.exports=sendotpemail;