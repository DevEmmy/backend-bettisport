"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
require("reflect-metadata");
const typedi_1 = require("typedi");
require("dotenv").config();
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: String(process.env.EMAIL_ADDRESS),
        pass: String(process.env.EMAIL_TEST_PASSWORD)
    }
});
const registerHtml = (otp) => {
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
    `;
};
const loginDetails = (email, password) => {
    return `
        <html>
            <body>
                <p>You have been invited to Bettisports as a user, here are your credentials:</p>
                <p>Email: ${email}</p>
                <p>Password: ${password}</p>
            </body>
        </html>
    `;
};
const sendForgottenPasswordLink = (token) => {
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
let EmailService = class EmailService {
    constructor() {
    }
    mail(receiver, sender, subject, html) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: `${sender}<${process.env.EMAIL_ADDRESS}>`,
                to: receiver,
                subject: subject,
                html: html
            };
            transporter.sendMail(mailOptions, (error, info) => {
                console.log("sending...");
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });
        });
    }
    sendSignUpOTP(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            this.mail(email, "Emmy", "OTP - Confirm your Bettisport User verification!", registerHtml(otp));
        });
    }
    sendResetToken(email, token) {
        return __awaiter(this, void 0, void 0, function* () {
            this.mail(email, "Emmy", "Reset Password!", sendForgottenPasswordLink(token));
        });
    }
    getLoginCredentials(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            this.mail(email, "Admin", "You have been to Bettisport", loginDetails(email, password));
        });
    }
};
EmailService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], EmailService);
exports.default = EmailService;
