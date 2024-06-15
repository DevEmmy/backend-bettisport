import { Service } from "typedi";
import CommentRepository from "../repositories/CommentRepository";
import { CommentDto, UpdateCommentDto } from "../dto/comment-dto";
import "reflect-metadata";

@Service()
export class CommentService {
    constructor(private readonly repo: CommentRepository) { }

    async createComment(data: CommentDto) {
        try {
            const comment = await this.repo.create(data);
            return comment;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async getCommentById(id: string) {
        try {
            const comment = await this.repo.findById(id);
            if (!comment) {
                return { message: "Comment not found" };
            }
            return comment;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async getAllComments() {
        try {
            const comments = await this.repo.findAll();
            return comments;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async updateComment(id: string, data: UpdateCommentDto) {
        try {
            const comment = await this.repo.update(id, data);
            if (!comment) {
                return { message: "Comment not found" };
            }
            return comment;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async deleteComment(id: string) {
        try {
            const result = await this.repo.delete(id);
            if (!result) {
                return { message: "Comment not found" };
            }
            return { message: "Comment deleted successfully" };
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async findCommentsByAuthor(authorId: string) {
        try {
            const comments = await this.repo.findByAuthor(authorId);
            return comments;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async findCommentsByPost(postId: string) {
        try {
            const comments = await this.repo.findByPost(postId);
            return comments;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async updatePartialComment(id: string, data: Partial<UpdateCommentDto>) {
        try {
            const comment = await this.repo.updatePartial(id, data);
            if (!comment) {
                return { message: "Comment not found" };
            }
            return comment;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
