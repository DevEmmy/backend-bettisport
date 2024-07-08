import { Service } from "typedi";
import "reflect-metadata";
import { Request, Response } from "express";
import { CommentService } from "../services/CommentServices";
import { CommentDto, UpdateCommentDto } from "../dto/comment-dto";
import { error, success } from "../utils/response";

@Service()
export class CommentController {
    constructor(
        private readonly service: CommentService,
    ) { }

    async createComment(req: Request, res: Response) {
        try {
            const body: CommentDto = req.body;
            body.author = req.body.user
            const comment = await this.service.createComment(body);
            return success(comment, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async getCommentById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const comment = await this.service.getCommentById(id);
            if (!comment) {
                return error("Comment not found", res, 404);
            }
            return success(comment, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async getAllComments(req: Request, res: Response) {
        try {
            const comments = await this.service.getAllComments();
            return success(comments, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async updateComment(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const body: UpdateCommentDto = req.body;
            const comment = await this.service.updateComment(id, body);
            if (!comment) {
                return error("Comment not found", res, 404);
            }
            return success(comment, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async deleteComment(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await this.service.deleteComment(id);
            if (!result) {
                return error("Comment not found", res, 404);
            }
            return success({ message: "Comment deleted successfully" }, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async findCommentsByAuthor(req: Request, res: Response) {
        try {
            const { authorId } = req.params;
            const comments = await this.service.findCommentsByAuthor(authorId);
            return success(comments, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async findCommentsByPost(req: Request, res: Response) {
        try {
            const { postId } = req.params;
            const comments = await this.service.findCommentsByPost(postId);
            return success(comments, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async updatePartialComment(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const body: Partial<UpdateCommentDto> = req.body;
            const comment = await this.service.updatePartialComment(id, body);
            if (!comment) {
                return error("Comment not found", res, 404);
            }
            return success(comment, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }
}
