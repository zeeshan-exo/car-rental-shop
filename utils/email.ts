import nodemailer from "nodemailer"

export async  function sendMail ({to, subject, message}){

  const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth:{
          user: process.env.ETHEREAL_MAIL,
          pass: process.env.ETHEREAL_APP_PASSWAORD
         }
      })
                
   const info = await transporter.sendMail({
      from: process.env.ETHEREAL_MAIL,
      to: to,
      subject: subject,
      html: message
    })
    console.log("Email sent :", info)
}