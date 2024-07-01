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
exports.CommentService = void 0;
const typedi_1 = require("typedi");
const CommentRepository_1 = __importDefault(require("../repositories/CommentRepository"));
require("reflect-metadata");
let CommentService = exports.CommentService = class CommentService {
    constructor(repo) {
        this.repo = repo;
    }
    createComment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield this.repo.create(data);
                return comment;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    getCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield this.repo.findById(id);
                if (!comment) {
                    return { message: "Comment not found" };
                }
                return comment;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    getAllComments() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield this.repo.findAll();
                return comments;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    updateComment(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield this.repo.update(id, data);
                if (!comment) {
                    return { message: "Comment not found" };
                }
                return comment;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    deleteComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repo.delete(id);
                if (!result) {
                    return { message: "Comment not found" };
                }
                return { message: "Comment deleted successfully" };
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    findCommentsByAuthor(authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield this.repo.findByAuthor(authorId);
                return comments;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    findCommentsByPost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield this.repo.findByPost(postId);
                return comments;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    updatePartialComment(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield this.repo.updatePartial(id, data);
                if (!comment) {
                    return { message: "Comment not found" };
                }
                return comment;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
};
exports.CommentService = CommentService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [CommentRepository_1.default])
], CommentService);
