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

    async createUser(req: Request, res: Response){
        try{
            const body : userDto = req.body;
            let {payload, message} = await this.service.createUser(body);
            if(!payload && message){
                return error(message, res, 400)
            }
            return success(payload, res);
        }   
        catch(err: any){
            error(err.message, res, err.status||400);
        }
    }
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

    async getUserDetails(req: Request, res: Response){
        try{
            const {userId} = req.body;
            let {payload} = await this.service.getUserById(userId);
            return success(payload, res);
        }   
        catch(err: any){
            error(err.message, res, err.status||400);
        }
    }

    async getLikedAndSaved(req: Request, res: Response){
        try{
            const userId = req.body.user

            let {payload} = await this.service.getLikedAndSaved(String(userId));
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

    async getLoggedInUser(req: Request, res: Response){
        try{
            const {user} = req.body;
            
            // return success(payload, res);
        }   
        catch(err: any){
            error(err.message, res, err.status||400);
        }
    }

    async getAllUsers(req: Request, res: Response){
        try{
            
            let {payload} = await this.service.findAll();
            return success(payload, res);
        }   
        catch(err: any){
            error(err.message, res, err.status||400);
        }
    }

    async forgottenPassword(req: Request, res: Response){
        try{
            let data = req.body;
            let resp = await this.service.forgotPassword(data.email);
            if(resp.status == 400){
                return error(resp.message, res, resp.status)
            }
            return res.json({message: resp.message})
        }
        catch(err: any){
            error(err.message, res, err.status||400);
        }
    }

    async resetPassword(req: Request, res: Response){
        try{
            let data = req.body;
            let resp = await this.service.updatePassword(data.token, data.newPassword);
            if(resp.status == 400){
                return error(resp.message, res, resp.status)
            }
            return res.json({message: resp.message})
        }
        catch(err: any){
            error(err.message, res, err.status||400);
        }
    }

    async updateProfile(req: Request, res: Response){
        try{
            let data = req.body;
            let userId = req.body.user
            let resp = await this.service.updateProfile(userId, data);
            if(resp.status == 400){
                return error(resp.message, res, resp.status)
            }
            return res.json({message: resp.message})
        }
        catch(err: any){
            error(err.message, res, err.status||400);
        }
    }


}