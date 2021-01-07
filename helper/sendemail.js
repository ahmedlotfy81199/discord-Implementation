const nodemailer= require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ahmedlotfy81199@gmail.com',
      pass: '3636487!a'
    }
  });
  const sendemail =
   (to,subject,message)=>{
    const mailOptions={
        from : 'ahmed2013zx2013@gmail.com',
        to : to,
        subject : subject,
        html :message
    }
    transporter.sendMail(mailOptions, function(error, info){

        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({
              message:'email sent'
          })
        }
    })
  }
 
module.exports={
    sendemail,
}