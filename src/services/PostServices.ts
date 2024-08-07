import { Service } from "typedi";
import PostRepository from "../repositories/PostRepository";
import { PostDto, UpdatePostDto } from "../dto/post-dto";
import "reflect-metadata";
import { uploader } from "../utils/uploader";
import mongoose, { Types } from "mongoose"; // Import Types for ObjectId
import UserRepository from "../repositories/UserRepository";

@Service()
export class PostService {
    constructor(
        private readonly repo: PostRepository,
        private readonly userRepo: UserRepository
    ) {}

    async createPost(data: PostDto) {
        try {
            if (data.media) {
                data.media = await uploader(data.media as string);
            }

            if (data.featuredImage) {
                data.featuredImage = await uploader(data.featuredImage as string);
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
                post.reads = post.reads + 1;
                console.log(post.reads);
                let data = { reads: post.reads };

                post = await this.repo.update(id, data);
                return post;
            }
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async likePost(postId: string, userId: string) {
        try {
            const post = await this.repo.findById(postId);
    
            if (post) {
                const user = await this.userRepo.findById(userId);
                if (!user) {
                    return { message: "User not found" };
                }
    
                const userObjectId = new mongoose.Types.ObjectId(userId);
                const postObjectId = new mongoose.Types.ObjectId(postId);
    
                // Check if the user already liked the post
                const isLiked = post.likes.some((id: Types.ObjectId) =>
                    id.equals(userObjectId)
                );
    
                if (isLiked) {
                    // Unlike post
                    post.likes = post.likes.filter(
                        (id: Types.ObjectId) => !id.equals(userObjectId)
                    );
                    user.likes = user.likes.filter(
                        (id: Types.ObjectId) => !id.equals(postObjectId)
                    );
    
                    // Save the updated post and user
                    await this.repo.update(postId, { likes: post.likes });
                    await this.userRepo.update(userId, { likes: user.likes });
    
                    return { message: "Post unliked" };
                } else {
                    // Like post
                    post.likes.push(userObjectId);
                    user.likes.push(postObjectId);
    
                    // Save the updated post and user
                    await this.repo.update(postId, { likes: post.likes });
                    await this.userRepo.update(userId, { likes: user.likes });
    
                    return { message: "Post liked" };
                }
            }
    
            return { message: "Post not found" };
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    

    async savePost(postId: string, userId: string) {
        try {
            const user = await this.userRepo.findById(userId);
            if (!user) {
                return { message: "User not found" };
            }
    
            const postObjectId = new mongoose.Types.ObjectId(postId);
    
            // Check if the user already saved the post
            const isSaved = user.saved.some((id: Types.ObjectId) =>
                id.equals(postObjectId)
            );
    
            if (isSaved) {
                // Unsave post
                user.saved = user.saved.filter(
                    (id: Types.ObjectId) => !id.equals(postObjectId)
                );
    
                // Save the updated user
                await this.userRepo.update(userId, { saved: user.saved });
    
                return { message: "Post unsaved" };
            } else {
                // Save post
                user.saved.push(postObjectId);
    
                // Save the updated user
                await this.userRepo.update(userId, { saved: user.saved });
    
                return { message: "Post saved" };
            }
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    
}
