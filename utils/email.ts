import postmark from 'postmark';
const postmarkClient = new postmark.ServerClient(process.env.POSTMARK_SERVER_TOKEN);

export async function sendEmail ({to, from, subject, message}){
     const emailData={
        From: from,
        To: to,
        Subject: subject,
        HtmlBody: message,
      }

      try {
        const result = await postmarkClient.sendEmail(emailData)
        console.log("Email sent successfully")
        return result
      } catch (error) {
        console.error("Error Sending Email", error)
        throw error
      }
}