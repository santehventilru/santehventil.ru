

// const transporter = nodemailer.createTransport({
//     service: 'mail', // Используйте свой почтовый сервис
//     auth: {
//         user: 'ilya.pavlenkotio@mail.ru',
//         pass: 'Gorillaz12'
//     }
// });

// function sendEmail(to, subject, text) {
//     const mailOptions = {
//         from: 'fadi.khalil@yandex.ru',
//         to: to,
//         subject: subject,
//         text: text
//     };
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log('Error: ', error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });
// }