import { UserLoginDto, userDto } from "../dto/user-dto";
import UserRepository from "../repositories/UserRepository";
import jwt from "jsonwebtoken"
require("dotenv").config();
import bcrypt from "bcrypt"
import "reflect-metadata";
import { Service } from "typedi";
import mongoose from "mongoose";
import EmailService from "./EmailServices";

let jwtSecret = process.env.JWT_SECRET as string;

@Service()
export class UserServices {
    constructor(private readonly repo: UserRepository, private readonly emailService: EmailService) { };

    async createUser(user: any) {
        let { email, password } = user;
        let checkUser = await this.repo.findByEmail(email);
        if (checkUser) {
            return { message: "User with this email already exists.", payload: null }
        }
        
        user.password = await bcrypt.hash(password, 8);
        user = await this.repo.create(user);
        await this.emailService.getLoginCredentials(email, password)
        return {payload: user, message: "User Created"}
    }

    generateToken(id: string) {
        let token = jwt.sign({ id }, jwtSecret)
        return token;
    }

    async signUp(data: userDto) {
        try {
            let { email, password } = data;

            let checkUser = await this.repo.findByEmail(email);
            if (checkUser) {
                return { message: "User with this email already exists." }
            }

            data.password = await bcrypt.hash(password, 8);
            let user = await this.repo.create(data);
            let token = this.generateToken(String(user._id))
            return {
                payload: { user, token }
            }
        }
        catch (err: any) {
            throw Error(err.message);
        }
    }

    async signIn(data: UserLoginDto) {
        try {
            let { email, password } = data;
            let user = await this.repo.findByEmail(email)

            if (!user) {
                return { message: "User with this email does not exist" }
            }

            let doMatch = await bcrypt.compare(password, user.password,);
            if (!doMatch) {
                return { message: "Incorrect Password" }
            }
            let token = this.generateToken(String(user._id))
            return {
                payload: { user, token }
            }
        }

        catch (err: any) {
            throw Error(err.message);
        }
    }

    async likePost(postId: string, userId: string) {
        try {
            let user = await this.repo.findById(userId);
            user?.likes.push(new mongoose.Types.ObjectId(postId));
            user = await this.repo.update(userId, user)
            return {
                payload: user,
                message: "Post Saved"
            }
        }
        catch (err: any) {
            throw Error(err.message);
        }
    }

    async savePost(postId: string, userId: string) {
        try {
            let user = await this.repo.findById(userId);
            user?.saved.push(new mongoose.Types.ObjectId(postId));
            user = await this.repo.update(userId, user)
            return {
                payload: user,
                message: "Post Saved"
            }
        }
        catch (err: any) {
            throw Error(err.message);
        }
    }

    async getLikedAndSaved(userId: string) {
        try {
            let payload = await this.repo.getLikedAndSavedPosts(userId);
            return { payload };
        }
        catch (err: any) {
            throw Error(err.message);
        }
    }

    async getUsersByRoles(role: string | null) {
        try {
            let payload: userDto[] = await this.repo.findByRoles(role);
            return { payload }
        }
        catch (err: any) {
            throw Error(err.message);
        }
    }


    async findAll() {
        try {
            let payload: userDto[] = await this.repo.findAll();
            return { payload }
        }
        catch (err: any) {
            throw Error(err.message);
        }
    }

    async getUserById(id: string){
        try {
            let payload = await this.repo.findById(id);
            return { payload }
        }
        catch (err: any) {
            throw Error(err.message);
        }
    }
}