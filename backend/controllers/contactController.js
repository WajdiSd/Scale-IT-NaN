const asyncHandler = require("express-async-handler");
const transporter = require("../config/nodemailer");

const sendMail = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  var mailOptions = {
    from: email, // sender address
    to: process.env.EMAIL, // list of receivers
    subject: subject,
    template: "contact", // the name of the template file i.e email.handlebars
    context: {
      body: message,
      name: name,
      subject: subject,
      from : email,
    },
  };

  // trigger the sending of the E-mail
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(400);
      throw new Error(error);
    } else {
      res.status(201).json({
        message : 'sent',
      });
    }
  });
});

module.exports = {
  sendMail,
};
