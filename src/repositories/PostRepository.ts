import { Service } from "typedi";
import "reflect-metadata";
import Post from "../models/post";
import { PostDto, UpdatePostDto } from "../dto/post-dto";

@Service()
class PostRepository {
    constructor(
        private readonly model = Post,
    ){}

    async create(data: PostDto) {
        const result = await new this.model(data).save();
        return result;
    }

    async findById(id: string) {
        const result = await this.model.findById(id).populate("author");
        return result;
    }

    async findAll() {
        const result = await this.model.find().populate("author");
        return result;
    }

    async update(id: string, data: UpdatePostDto) {
        const result = await this.model.findByIdAndUpdate(id, data, { new: true });
        return result;
    }

    async delete(id: string) {
        const result = await this.model.findByIdAndDelete(id);
        return result;
    }

    async findByAuthor(authorId: string) {
        const result = await this.model.find({ author: authorId }).populate("author");
        return result;
    }

    async searchByTitleOrContent(query: string) {
        const regex = new RegExp(query, 'i'); // Case-insensitive regex
        const result = await this.model.find({ $or: [{ title: regex }, { content: regex }] }).populate("author");
        return result;
    }

    async findPublishedPosts() {
        const result = await this.model.find({ publish: true }).populate("author");
        return result;
    }

    async updatePartial(id: string, data: Partial<UpdatePostDto>) {
        const result = await this.model.findByIdAndUpdate(id, { $set: data }, { new: true }).populate("author");
        return result;
    }

    async addCategory(postId: string, categoryId: string) {
        const result = await this.model.findByIdAndUpdate(
            postId,
            { $addToSet: { categories: categoryId } },
            { new: true }
        );
        return result;
    }

    async removeCategory(postId: string, categoryId: string) {
        const result = await this.model.findByIdAndUpdate(
            postId,
            { $pull: { categories: categoryId } },
            { new: true }
        );
        return result;
    }

    async getPostsByCategories(categories: string[]) {
        const result = await this.model.find({ categories: { $in: categories } }).populate("author");
        return result;
    }

    async getPostsByNewsBreaking() {
        const result = await this.model.find({newsBreaking: true }).populate("author");
        return result;
    }

    async getPostsByEditorsPick() {
        const result = await this.model.find({editorsPick: true }).populate("author");
        return result;
    }

    async findMostRead() {
        return await this.model.find().populate("author").sort({ reads: -1 }).exec();
    }

    async findMostInteracted() {
        return await this.model.find().populate("author").sort({ comments: -1 }).exec();
    }

    async findFeatured() {
        return await this.model.find({featured: true}).populate("author")
    }

    async findArticles() {
        return await this.model.find({article: true}).populate("author")
    }

    async findPhotoSplash() {
        return await this.model.find({photoSplash: true}).populate("author")
    }

    async findInFocus() {
        return await this.model.find({inFocus: true}).populate("author")
    }

    async findFantasy() {
        return await this.model.find({fantasy: true}).populate("author")
    }
}

export default PostRepository;
