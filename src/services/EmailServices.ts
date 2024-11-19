import nodemailer from "nodemailer"
import "reflect-metadata"
import { Service } from "typedi";
require("dotenv").config()

const transporter = nodemailer.createTransport({
    service:"gmail",
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: String(process.env.EMAIL_ADDRESS),
      pass: String(process.env.EMAIL_TEST_PASSWORD)
    }
  });

const registerHtml = (otp: number)=>{
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Rubik&display=swap" rel="stylesheet">

        <style>
    
        .bold{
            color: black;
            font-weight: 600;
            padding: 0;
        }
    
    </style>
    </head>
    
    <body>
       <p> Here's your OTP : <span class="bold">${otp}</span> </p>
        
    </body>
    </html>
    `
}

const loginDetails = (email:string, password: string)=>{
    return `
        <html>
            <body>
                <p>You have been invited to Bettisports as a user, here are your credentials:</p>
                <p>Email: ${email}</p>
                <p>Password: ${password}</p>
            </body>
        </html>
    `
}

const sendForgottenPasswordLink = (token: string) => {
    const resetLink = `https://bettisports-blue.vercel.app/update-password?token=${token}`;
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333333;
                margin: 0;
                padding: 0;
                background-color: #f9f9f9;
            }
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                border: 1px solid #dddddd;
                border-radius: 8px;
                box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .email-header {
                background: #0044cc;
                color: #ffffff;
                text-align: center;
                padding: 20px;
            }
            .email-header h1 {
                margin: 0;
                font-size: 24px;
            }
            .email-body {
                padding: 20px;
                text-align: center;
            }
            .email-body p {
                margin-bottom: 20px;
                font-size: 16px;
                color: #555555;
            }
            .email-body a {
                display: inline-block;
                padding: 10px 20px;
                background: #0044cc;
                color: #ffffff;
                text-decoration: none;
                border-radius: 4px;
                font-weight: bold;
            }
            .email-body a:hover {
                background: #003399;
            }
            .email-footer {
                font-size: 12px;
                text-align: center;
                color: #888888;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <h1>Bettisports</h1>
            </div>
            <div class="email-body">
                <p>Hello,</p>
                <p>We received a request to reset your password. Click the button below to proceed:</p>
                <a href="${resetLink}" target="_blank">Reset Password</a>
                <p>If you didn’t request a password reset, please ignore this email or contact support.</p>
            </div>
            <div class="email-footer">
                <p>&copy; ${new Date().getFullYear()} Bettisports. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};


@Service()
class EmailService{
    constructor(){

    }

    async mail(receiver: string, sender: string, subject: string, html: string){
        const mailOptions = {
            from: `${sender}<${process.env.EMAIL_ADDRESS}>`,
            to: receiver,
            subject: subject,
            html: html
          };
          
    
          transporter.sendMail(mailOptions, (error: any, info: any) => {
            console.log("sending...")
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
    }

    async sendSignUpOTP(email: string, otp: number){
        this.mail(email, "Emmy", "OTP - Confirm your Bettisport User verification!", registerHtml(otp))
    }

    async sendResetToken(email: string, token: string){
        this.mail(email, "Emmy", "Reset Password!", sendForgottenPasswordLink(token))
    }

    async getLoginCredentials(email: string, password: string){
        this.mail(email, "Admin", "You have been to Bettisport", loginDetails(email, password))
    }
}

export default EmailService