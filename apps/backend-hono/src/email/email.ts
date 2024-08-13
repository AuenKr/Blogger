import * as nodemailer from 'nodemailer';

export async function sendEmail(to: string, subject: string, body: string) {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_ENDPOINT,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `cto@${process.env.SMTP_DOMAIN}`,
    sender: `cto@${process.env.SMTP_DOMAIN}`,
    subject: subject,
    text: body,
    to: to
  })
  console.log(`Email send to ${to}`)
}

const emailTest = {
  to: "hemang.pathak2003@gmail.com",
  subject: "testSubject from smtp 2",
  body: "hello this is a test email"
}

sendEmail(emailTest.to, emailTest.subject, emailTest.body);