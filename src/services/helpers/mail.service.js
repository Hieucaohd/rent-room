import nodemailer from 'nodemailer';
import { MAIL_PASSWORD, MAIL_USER } from '../../config/index';

//create smtp transport
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD,
    },
});

const emailService = {
    send: ({ to, subject, text, html }) => {
        transporter
            .sendMail({
                from: `"Tìm Phòng Trọ" ${MAIL_USER}`, // sender address
                to: to, // list of receivers
                subject: subject, // Subject line
                text: text, // plain text body
                html: html, // html body
            })
            .catch((e) => {
                throw new Error(e.message);
            });
    },
};

//make to create only 1 object
Object.freeze(emailService);

export default emailService;