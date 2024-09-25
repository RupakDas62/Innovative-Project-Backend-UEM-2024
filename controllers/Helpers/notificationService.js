const nodemailer = require('nodemailer');

require('dotenv').config();
transporterUserID = process.env.TRANSPORTER_USERID;
transporterPassword = process.env.TRANSPORTER_PASS

const sendNotification = async (office, message) => {
  let testAccount = await nodemailer.createTestAccount();

  // connect with the smtp
  let transporter = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: transporterUserID,
      pass: transporterPassword,
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
