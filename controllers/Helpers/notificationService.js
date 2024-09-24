const nodemailer = require('nodemailer');

const sendNotification = async (office, message) => {
  let testAccount = await nodemailer.createTestAccount();

  // connect with the smtp
  let transporter = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "monique.hand13@ethereal.email",
      pass: "s8wNSVVs4r1N7YFYpH",
    },
  });

  let info = await transporter.sendMail({
    from: '"Rupak Das" <dasr16983@gmail.com>', // sender address
    to: office.email, // list of receivers
    subject: "Fire Incident", // Subject line
    text: message, // plain text body
    html: `<b>${message}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);

};

module.exports = { sendNotification };
