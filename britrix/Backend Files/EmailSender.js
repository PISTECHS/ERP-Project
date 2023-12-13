const sendmail = require('sendmail');
const nodemailer = require('nodemailer');

const SendEmail = async(obj) => {
  
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: `${obj.Sender}`,
        //   pass: 'yourpassword' 
        pass: 'pwoaexsuvjfuukdd'
        }
      });
      var mailOptions = {
        from: `${obj.Sender}`,
        to:  `${obj.Reciever}`,
        subject: `${obj.Subject}`,
        text: `${obj.Message}`
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          // console.log(error);
          return(error)
        } else {
          console.log('Email sent: ' + info.response);
          return('mes send')
        }
      });


 

//     sendmail({
//     from: `${obj.Sender}`,
//     to: `${obj.Reciever}`,
//     subject:  `${obj.Subject}`,
//     html: `${obj.Message}`,
//   }, function(err, reply) {
//     console.log(err && err.stack);
//     console.dir(reply);
// });
}

module.exports = {
    SendEmail
}