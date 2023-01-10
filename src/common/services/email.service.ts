import nodemailer from 'nodemailer';

  export const sendEmail = async function(option: object,email: string): Promise<any> {
      var transporter = nodemailer.createTransport({
          // config mail server
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: 'thideptrai123tq@gmail.com',
            pass: 'asmfjykwiexxckkg',
          },
        });
        var mainOptions = option
        let mg;
        transporter.sendMail(
          mainOptions,
          await function (err, info) {
            if (err) {
              throw new Error(err.message);
            } else {
              console.log('Message sent: ' + info.response);
              mg = 'Message sent: ' + info.response;
              return mg
            }
          },
        );
  }
