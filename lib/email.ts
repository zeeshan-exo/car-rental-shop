import nodemailer from "nodemailer"

interface SendEmailProps{
   to: string,
   subject: string,
   message: string
}

export async  function sendMail ({to, subject, message}: SendEmailProps){

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
}