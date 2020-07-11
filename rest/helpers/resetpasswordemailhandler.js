const resetPasswordEmailTemp = require("./resetPasswordEmailTemp");
const nodemailer = require('nodemailer'); 
module.exports = (token, email) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  nodemailer.createTestAccount((err, mailAcc) => {
    return new Promise((resolve, reject) => {
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 1025,
        auth: {
            user: 'project.1',
            pass: 'secret.1'
        }
      });

      // setup email data with unicode symbols
      const mailOptions = {
        from: process.env.nodemailerEmail, // sender address
        to: email, // list of receivers
        subject: `reset password`, // Subject line
        html: resetPasswordEmailTemp('http://localhost:3000', token, email)
      };
      
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject({
            message: "ERR",
            error
          });
        }
        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });
      resolve({
        msg: "check your email"
      });
    });
  });
};
