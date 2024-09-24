const nodemailer = require('nodemailer');

async function sendNotification(office, message) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: office.email,
    subject: 'Fire Report',
    text: message,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendNotification };
