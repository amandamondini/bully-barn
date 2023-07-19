const nodemailer = require('nodemailer')
const username = process.env.MAILTRAP_USERNAME
const pwd = process.env.MAILTRAP_PASSWORD

const sendValidationEmail = async (userEmail, validationLink)  => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: username,
        pass: pwd
      },
      authMethod: "LOGIN"
    })

    const emailContent = {
      from: "bullybarntest@gmail.com",
      to: userEmail,
      subject: "Verify Your Email",
      html: `<p>Hello, please click the following link to verify your email:</p><a href="${validationLink}">Verify Email</a>`,
    }

    const info = await transporter.sendMail(emailContent);
    console.log("Email sent:", info.response)
  } catch (err) {
    console.error("Error sending email: ", err)
  }
}

module.exports = { sendValidationEmail }