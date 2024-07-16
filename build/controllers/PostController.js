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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const typedi_1 = require("typedi");
require("reflect-metadata");
const PostServices_1 = require("../services/PostServices");
const response_1 = require("../utils/response");
let PostController = exports.PostController = class PostController {
    constructor(service) {
        this.service = service;
    }
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                body.author = req.body.user;
                const post = yield this.service.createPost(body);
                return (0, response_1.success)(post, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    getPostById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const post = yield this.service.getPostById(id);
                if (!post) {
                    return (0, response_1.error)("Post not found", res, 404);
                }
                return (0, response_1.success)(post, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    getAllPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.service.getAllPosts();
                return (0, response_1.success)(posts, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const body = req.body;
                const post = yield this.service.updatePost(id, body);
                if (!post) {
                    return (0, response_1.error)("Post not found", res, 404);
                }
                return (0, response_1.success)(post, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield this.service.deletePost(id);
                if (!result) {
                    return (0, response_1.error)("Post not found", res, 404);
                }
                return (0, response_1.success)({ message: "Post deleted successfully" }, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    findPostsByAuthor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorId } = req.params;
                const posts = yield this.service.findPostsByAuthor(authorId);
                return (0, response_1.success)(posts, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    findPostsByEditorsPick(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.service.findPostsByEditorsPick();
                return (0, response_1.success)(posts, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    findPostsByNewsBreaking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.service.findPostsByEditorsPick();
                return (0, response_1.success)(posts, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    findPostsByFeatured(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.service.findPostsByFeatured();
                return (0, response_1.success)(posts, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    findPostsByArticles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.service.findPostsByArticles();
                return (0, response_1.success)(posts, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    findPostsByPhotoSplash(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.service.findPostsByPhotoSplash();
                return (0, response_1.success)(posts, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    findPostsByInFocus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.service.findPostsByInFocus();
                return (0, response_1.success)(posts, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    findPostsByMostRead(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.service.findPostsByMostRead();
                return (0, response_1.success)(posts, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    findPostsByMostInteracted(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.service.findPostsByMostInteracted();
                return (0, response_1.success)(posts, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    findPostsByFantasy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.service.findPostsByFantasy();
                return (0, response_1.success)(posts, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    readPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.params;
                const posts = yield this.service.readPost(id);
                return (0, response_1.success)(posts, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
};
exports.PostController = PostController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [PostServices_1.PostService])
], PostController);
