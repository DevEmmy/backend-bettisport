import { Service } from "typedi";
import "reflect-metadata";
import { Request, Response } from "express";
import { PostService } from "../services/PostServices";
import { error, success } from "../utils/response";
import { PostDto, UpdatePostDto } from "../dto/post-dto";

@Service()
export class PostController {
    constructor(
        private readonly service: PostService,
    ) { }

    async createPost(req: Request, res: Response) {
        try {
            const body: PostDto = req.body;
            body.author = req.body.user
            const post = await this.service.createPost(body);
            return success(post, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async getPostById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const post = await this.service.getPostById(id);
            if (!post) {
                return error("Post not found", res, 404);
            }
            return success(post, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async getAllPosts(req: Request, res: Response) {
        try {
            const posts = await this.service.getAllPosts();
            return success(posts, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async updatePost(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const body: UpdatePostDto = req.body;
            const post = await this.service.updatePost(id, body);
            if (!post) {
                return error("Post not found", res, 404);
            }
            return success(post, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async deletePost(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await this.service.deletePost(id);
            if (!result) {
                return error("Post not found", res, 404);
            }
            return success({ message: "Post deleted successfully" }, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async findPostsByAuthor(req: Request, res: Response) {
        try {
            const { authorId } = req.params;
            const posts = await this.service.findPostsByAuthor(authorId);
            return success(posts, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async findPostsByEditorsPick(req: Request, res: Response) {
        try {
            const posts = await this.service.findPostsByEditorsPick();
            return success(posts, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async findPostsByNewsBreaking(req: Request, res: Response) {
        try {
            const posts = await this.service.findPostsByEditorsPick();
            return success(posts, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async findPostsByFeatured(req: Request, res: Response) {
        try {
            const posts = await this.service.findPostsByFeatured();
            return success(posts, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async findPostsByArticles(req: Request, res: Response) {
        try {
            const posts = await this.service.findPostsByArticles();
            return success(posts, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async findPostsByPhotoSplash(req: Request, res: Response) {
        try {
            const posts = await this.service.findPostsByPhotoSplash();
            return success(posts, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async findPostsByInFocus(req: Request, res: Response) {
        try {
            const posts = await this.service.findPostsByInFocus();
            return success(posts, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async findPostsByMostRead(req: Request, res: Response) {
        try {
            const posts = await this.service.findPostsByMostRead();
            return success(posts, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async findPostsByMostInteracted(req: Request, res: Response) {
        try {
            const posts = await this.service.findPostsByMostInteracted();
            return success(posts, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async findPostsByFantasy(req: Request, res: Response) {
        try {
            const posts = await this.service.findPostsByFantasy();
            return success(posts, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    // Uncomment and implement this method if you want to find posts by slug
    // async findPostsBySlug(req: Request, res: Response) {
    //     try {
    //         const { slug } = req.params;
    //         const posts = await this.service.findPostsBySlug(slug);
    //         return success(posts, res);
    //     } catch (err: any) {
    //         error(err.message, res, err.status || 400);
    //     }
    // }
}
