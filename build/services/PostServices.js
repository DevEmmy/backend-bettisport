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
const mongoose_1 = __importDefault(require("mongoose"));
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
    likePost(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let post = yield this.repo.findById(id);
                if (post) {
                    post.likes.push(new mongoose_1.default.Types.ObjectId(userId));
                    let data = { likes: post.likes };
                    post = yield this.repo.update(id, data);
                    let user = yield this.userRepo.findById(userId);
                    user === null || user === void 0 ? void 0 : user.likes.push(new mongoose_1.default.Types.ObjectId(id));
                    this.userRepo.update(userId, user);
                    return post;
                }
                return null;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
};
exports.PostService = PostService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [PostRepository_1.default, UserRepository_1.default])
], PostService);
