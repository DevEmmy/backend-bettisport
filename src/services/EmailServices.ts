import nodemailer from "nodemailer"
import "reflect-metadata"
import { Service } from "typedi";
require("dotenv").config()

const transporter = nodemailer.createTransport({
    service:"gmail",
    host: 'smtp.zoho.com',
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

const sendForgottenPasswordLink = (token:string)=>{
    return `
        <html>
            <body>
                <p>Click on the link below to reset your password</p>
                <p> <a href="https://bettisports-blue.vercel.app/update-password?token=${token}">click here</> </p>
            </body>
        </html>
    `
}


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
        this.mail(email, "Emmy", "OTP - Confirm your Eexily User verification!", registerHtml(otp))
    }

    async sendResetToken(email: string, token: string){
        this.mail(email, "Emmy", "Reset Password!", sendForgottenPasswordLink(token))
    }

    async getLoginCredentials(email: string, password: string){
        this.mail(email, "Admin", "You have been to Bettisport", loginDetails(email, password))
    }
}

export default EmailService