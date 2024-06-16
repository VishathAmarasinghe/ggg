import nodemailer from 'nodemailer';

const sendEmail = (email, subject, textMessage) => {
    return new Promise((resolve, reject) => {
        try {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'projectvishath@gmail.com',
                    pass: 'ovdi uiox jqvd avai'
                }
            });

            var mailOptions = {
                from: 'teamsyntaxslayers@gmail.com',
                to: email,
                subject: subject,
                text: textMessage
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    reject(error); 
                } else {
                    console.log('Email sent: ', info.response);
                    resolve(1); 
                }
            });
        } catch (error) {
            console.log("Error sending email: ", error);
            reject(error); 
        }
    });
}

export default sendEmail;