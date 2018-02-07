import nodemailer from 'nodemailer'

const from = '"AlHub" <info@alhub.com>';

function setup() {
    return nodemailer.createTransport({
        service: process.env.EMAIL_HOST,
        secure: false,
        port: process.env.EMAIL_PORT,
        auth: {
            //type: 'OAuth2',
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
            // clientId: process.env.clientId,
            // clientSecret: process.env.clientSecret,
            // refreshToken: process.env.refreshToken
        },
        tls: {
            rejectUnauthorized: false
        }
    });
}

export function sendConfirmationEmail(user) {
    const transport = setup();
    const email ={
        from,
        to: user.email,
        subject: 'Welcome to OnTopic',
        text: `
        welcome to OnTopic please confirm your email.
        
        ${user.generateConfirmationUrl()}
        `
    };

    transport.sendMail(email);
}

export function sendResetPasswordEmail(user) {
    const transport = setup();
    const email ={
        from,
        to: user.email,
        subject: 'Reset Password',
        text: `
        To reset password follow the link
        
        ${user.generateResetPasswordLink()}
        `
    };

    transport.sendMail(email);
}