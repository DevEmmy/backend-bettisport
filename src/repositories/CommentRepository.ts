import { Service } from "typedi";
import mongoose from "mongoose";
import "reflect-metadata";
import Comment from "../models/comment";

@Service()
class CommentRepository {
    constructor(
        private readonly model = Comment,
    ){}

    async create(data: any) {
        const result = await new this.model(data).save();
        return result;
    }

    async findById(id: string) {
        const objectId = new mongoose.Types.ObjectId(id);
        const result = await this.model.findById(objectId).populate('author inResponse');
        return result;
    }

    async findAll() {
        const result = await this.model.find().populate('author inResponse');
        return result;
    }

    async update(id: string, data: any) {
        const objectId = new mongoose.Types.ObjectId(id);
        const result = await this.model.findByIdAndUpdate(objectId, data, { new: true });
        return result;
    }

    async delete(id: string) {
        const objectId = new mongoose.Types.ObjectId(id);
        const result = await this.model.findByIdAndDelete(objectId);
        return result;
    }

    async findByAuthor(authorId: string) {
        const authorObjectId = new mongoose.Types.ObjectId(authorId);
        const result = await this.model.find({ author: authorObjectId }).populate('inResponse');
        return result;
    }

    async findByPost(postId: string) {
        const postObjectId = new mongoose.Types.ObjectId(postId);
        const result = await this.model.find({ inResponse: postObjectId }).populate('author');
        return result;
    }

    async updatePartial(id: string, data: Partial<any>) {
        const objectId = new mongoose.Types.ObjectId(id);
        const result = await this.model.findByIdAndUpdate(objectId, { $set: data }, { new: true });
        return result;
    }
}

export default CommentRepository;
