import { Service } from "typedi"
import User from "../models/user"
import { UpdateUserDto, userDto } from "../dto/user-dto";
import "reflect-metadata";
import { Roles } from "../enums/role-enums";

@Service()
class UserRepository{
    constructor(
        private readonly model = User,
    ){}

    async create(data: userDto){
        const result = await new this.model(data).save();
        return result;
    }

    async findById(id: string){
        const result = await this.model.findById(id);
        return result;
    }

    async findByEmail(email: string){
        const result = await this.model.findOne({email});
        return result;
    }

    async findAll(){
        const result : userDto[] = await this.model.find();
        return result;
    }

    async update(id: string, data: any){
        const result = await this.model.findByIdAndUpdate(id, data, {new: true});
        return result;
    }

    async getLikedAndSavedPosts(userId: string){
        const user = await this.model.findById(userId).populate("likes").populate("saved")
        let saved = user?.saved
        let likes = user?.likes

        return {saved, likes}
    }

    async findByRoles(role: string | null){
        const users : userDto[] =await this.model.find({role});
        return users
    }

    async findByToken(token: string){
        const user = await this.model.findOne({resetToken: token});
        return user
    }
}

export default UserRepository;