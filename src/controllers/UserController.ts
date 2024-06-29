import { Service } from "typedi";
import "reflect-metadata";
import { UserServices } from "../services/UserServices";
import { Request, Response } from "express";
import { UserLoginDto, userDto } from "../dto/user-dto";
import { error, success } from "../utils/response";

@Service()
export class UserController{
    constructor(
        private readonly service : UserServices,
    ){}

    async signUp(req: Request, res: Response){
        try{
            const body : userDto = req.body;
            let {payload, message} = await this.service.signUp(body);
            if(!payload && message){
                return error(message, res, 400)
            }
            return success(payload, res);
        }   
        catch(err: any){
            error(err.message, res, err.status||400);
        }
    }

    async signIn(req: Request, res: Response){
        try{
            const body : UserLoginDto = req.body;
            console.log(body)
            let {payload, message} = await this.service.signIn(body);
            
            if(!payload && message){
                return error(message, res, 400)
            }
            return success(payload, res);
        }   
        catch(err: any){
            error(err.message, res, err.status||400);
        }
    }

    async likePost(req: Request, res: Response){
        try{
            const {postId} = req.params;
            const {userId} = req.body;
            let {payload} = await this.service.likePost(postId, userId);
            return success(payload, res);
        }   
        catch(err: any){
            error(err.message, res, err.status||400);
        }
    }

    async savePost(req: Request, res: Response){
        try{
            const {postId} = req.params;
            const {userId} = req.body;
            let {payload} = await this.service.savePost(postId, userId);
            return success(payload, res);
        }   
        catch(err: any){
            error(err.message, res, err.status||400);
        }
    }

    async getLikedAndSaved(req: Request, res: Response){
        try{
            const {userId} = req.params;
            let {payload} = await this.service.getLikedAndSaved(userId);
            return success(payload, res);
        }   
        catch(err: any){
            error(err.message, res, err.status||400);
        }
    }

    async filterByRole(req: Request, res: Response){
        try{
            const {role} = req.params;
            let {payload} = await this.service.getUsersByRoles(role);
            return success(payload, res);
        }   
        catch(err: any){
            error(err.message, res, err.status||400);
        }
    }
}