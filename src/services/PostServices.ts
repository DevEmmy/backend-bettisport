import { Service } from "typedi";
import PostRepository from "../repositories/PostRepository";
import { PostDto, UpdatePostDto } from "../dto/post-dto";
import "reflect-metadata";
import { uploader } from "../utils/uploader";
import { listeners } from "process";
import mongoose from "mongoose";
import UserRepository from "../repositories/UserRepository";

@Service()
export class PostService {
    constructor(private readonly repo: PostRepository, private readonly userRepo: UserRepository) { }

    async createPost(data: PostDto) {
        try {
            if (data.media) {
                data.media = await uploader(data.media as string)
            }

            if (data.featuredImage) {
                data.featuredImage = await uploader(data.featuredImage as string)
            }
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

    async readPost(id: string) {
        try {
            let post = await this.repo.findById(id);
            if (post) {
                post.reads = post.reads + 1
                console.log(post.reads)
                let data = { reads: post.reads }

                post = await this.repo.update(id, data)
                return post;
            }
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async likePost(id: string, userId: string){
        try{
            let post = await this.repo.findById(id);

            if(post){
                post.likes.push(new mongoose.Types.ObjectId(userId));
                let data = {likes: post.likes};
                post = await this.repo.update(id, data);
                let user = await this.userRepo.findById(userId)
                user?.likes.push(new mongoose.Types.ObjectId(id))
                this.userRepo.update(userId, user )
                return post
            }

            return null
        }
        catch(err: any){
            throw new Error(err.message);
        }
    }
}
