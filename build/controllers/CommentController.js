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
exports.CommentController = void 0;
const typedi_1 = require("typedi");
require("reflect-metadata");
const CommentServices_1 = require("../services/CommentServices");
const response_1 = require("../utils/response");
let CommentController = class CommentController {
    constructor(service) {
        this.service = service;
    }
    createComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                body.author = req.body.user;
                const comment = yield this.service.createComment(body);
                return (0, response_1.success)(comment, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    getCommentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const comment = yield this.service.getCommentById(id);
                if (!comment) {
                    return (0, response_1.error)("Comment not found", res, 404);
                }
                return (0, response_1.success)(comment, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    getAllComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield this.service.getAllComments();
                return (0, response_1.success)(comments, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    updateComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const body = req.body;
                const comment = yield this.service.updateComment(id, body);
                if (!comment) {
                    return (0, response_1.error)("Comment not found", res, 404);
                }
                return (0, response_1.success)(comment, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    deleteComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield this.service.deleteComment(id);
                if (!result) {
                    return (0, response_1.error)("Comment not found", res, 404);
                }
                return (0, response_1.success)({ message: "Comment deleted successfully" }, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    findCommentsByAuthor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorId } = req.params;
                const comments = yield this.service.findCommentsByAuthor(authorId);
                return (0, response_1.success)(comments, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    findCommentsByPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { postId } = req.params;
                const comments = yield this.service.findCommentsByPost(postId);
                return (0, response_1.success)(comments, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    updatePartialComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const body = req.body;
                const comment = yield this.service.updatePartialComment(id, body);
                if (!comment) {
                    return (0, response_1.error)("Comment not found", res, 404);
                }
                return (0, response_1.success)(comment, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
};
CommentController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [CommentServices_1.CommentService])
], CommentController);
exports.CommentController = CommentController;
