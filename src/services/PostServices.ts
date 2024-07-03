import { Service } from "typedi";
import PostRepository from "../repositories/PostRepository";
import { PostDto, UpdatePostDto } from "../dto/post-dto";
import "reflect-metadata";

@Service()
export class PostService {
    constructor(private readonly repo: PostRepository) { }

    async createPost(data: PostDto) {
        try {
            const post = await this.repo.create(data);
            return post;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async getPostById(id: string) {
        try {
            const post = await this.repo.findById(id);
            if (!post) {
                return { message: "Post not found" };
            }
            return post;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async getAllPosts() {
        try {
            const posts = await this.repo.findAll();
            return posts;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async updatePost(id: string, data: UpdatePostDto) {
        try {
            const post = await this.repo.update(id, data);
            if (!post) {
                return { message: "Post not found" };
            }
            return post;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async deletePost(id: string) {
        try {
            const result = await this.repo.delete(id);
            if (!result) {
                return { message: "Post not found" };
            }
            return { message: "Post deleted successfully" };
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async findPostsByAuthor(authorId: string) {
        try {
            const posts = await this.repo.findByAuthor(authorId);
            return posts;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async findPostsByEditorsPick() {
        try {
            const posts = await this.repo.getPostsByEditorsPick();
            return posts;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async findPostsByNewsBreaking() {
        try {
            const posts = await this.repo.getPostsByNewsBreaking();
            return posts;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async findPostsByMostRead() {
        try {
            const posts = await this.repo.findMostRead();
            return posts;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async findPostsByMostInteracted() {
        try {
            const posts = await this.repo.findMostInteracted();
            return posts;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async findPostsByFeatured() {
        try {
            const posts = await this.repo.findFeatured();
            return posts;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async findPostsByArticles() {
        try {
            const posts = await this.repo.findArticles();
            return posts;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async findPostsByPhotoSplash() {
        try {
            const posts = await this.repo.findPhotoSplash();
            return posts;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }   

    async findPostsByInFocus() {
        try {
            const posts = await this.repo.findInFocus();
            return posts;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async findPostsByFantasy() {
        try {
            const posts = await this.repo.findFantasy();
            return posts;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async findPostsByCategories(categories: string[]) {
        try {
            const posts = await this.repo.getPostsByCategories(categories);
            return posts;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
