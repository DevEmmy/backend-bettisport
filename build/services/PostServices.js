"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const typedi_1 = require("typedi");
const PostRepository_1 = __importDefault(require("../repositories/PostRepository"));
require("reflect-metadata");
const uploader_1 = require("../utils/uploader");
const mongoose_1 = __importDefault(require("mongoose")); // Import Types for ObjectId
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
let PostService = exports.PostService = class PostService {
    constructor(repo, userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
    }
    createPost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (data.media) {
                    data.media = yield (0, uploader_1.uploader)(data.media);
                }
                if (data.featuredImage) {
                    data.featuredImage = yield (0, uploader_1.uploader)(data.featuredImage);
                }
                const post = yield this.repo.create(data);
                return post;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield this.repo.findById(id);
                if (!post) {
                    return { message: "Post not found" };
                }
                return post;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.repo.findAll();
                return posts;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    updatePost(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield this.repo.update(id, data);
                if (!post) {
                    return { message: "Post not found" };
                }
                return post;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repo.delete(id);
                if (!result) {
                    return { message: "Post not found" };
                }
                return { message: "Post deleted successfully" };
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    findPostsByAuthor(authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.repo.findByAuthor(authorId);
                return posts;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    findPostsByEditorsPick() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.repo.getPostsByEditorsPick();
                return posts;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    findPostsByNewsBreaking() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.repo.getPostsByNewsBreaking();
                return posts;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    findPostsByMostRead() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.repo.findMostRead();
                return posts;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    findPostsByMostInteracted() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.repo.findMostInteracted();
                return posts;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    findPostsByFeatured() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.repo.findFeatured();
                return posts;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    findPostsByArticles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.repo.findArticles();
                return posts;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    findPostsByPhotoSplash() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.repo.findPhotoSplash();
                return posts;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    findPostsByInFocus() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.repo.findInFocus();
                return posts;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    findPostsByFantasy() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.repo.findFantasy();
                return posts;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    findPostsByCategories(categories) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.repo.getPostsByCategories(categories);
                return posts;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    readPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let post = yield this.repo.findById(id);
                if (post) {
                    post.reads = post.reads + 1;
                    console.log(post.reads);
                    let data = { reads: post.reads };
                    post = yield this.repo.update(id, data);
                    return post;
                }
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    likePost(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield this.repo.findById(postId);
                if (post) {
                    const user = yield this.userRepo.findById(userId);
                    if (!user) {
                        return { message: "User not found" };
                    }
                    const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
                    const postObjectId = new mongoose_1.default.Types.ObjectId(postId);
                    // Check if the user already liked the post
                    const isLiked = post.likes.some((id) => id.equals(userObjectId));
                    if (isLiked) {
                        // Unlike post
                        post.likes = post.likes.filter((id) => !id.equals(userObjectId));
                        user.likes = user.likes.filter((id) => !id.equals(postObjectId));
                        // Save the updated post and user
                        yield this.repo.update(postId, { likes: post.likes });
                        yield this.userRepo.update(userId, { likes: user.likes });
                        return { message: "Post unliked" };
                    }
                    else {
                        // Like post
                        post.likes.push(userObjectId);
                        user.likes.push(postObjectId);
                        // Save the updated post and user
                        yield this.repo.update(postId, { likes: post.likes });
                        yield this.userRepo.update(userId, { likes: user.likes });
                        return { message: "Post liked" };
                    }
                }
                return { message: "Post not found" };
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    savePost(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepo.findById(userId);
                if (!user) {
                    return { message: "User not found" };
                }
                const postObjectId = new mongoose_1.default.Types.ObjectId(postId);
                // Check if the user already saved the post
                const isSaved = user.saved.some((id) => id.equals(postObjectId));
                if (isSaved) {
                    // Unsave post
                    user.saved = user.saved.filter((id) => !id.equals(postObjectId));
                    // Save the updated user
                    yield this.userRepo.update(userId, { saved: user.saved });
                    return { message: "Post unsaved" };
                }
                else {
                    // Save post
                    user.saved.push(postObjectId);
                    // Save the updated user
                    yield this.userRepo.update(userId, { saved: user.saved });
                    return { message: "Post saved" };
                }
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
};
exports.PostService = PostService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [PostRepository_1.default,
        UserRepository_1.default])
], PostService);
