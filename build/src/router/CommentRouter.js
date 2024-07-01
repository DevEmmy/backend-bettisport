"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importDefault(require("typedi"));
const CommentController_1 = require("../controllers/CommentController");
const express_1 = __importDefault(require("express"));
const commentRouter = (0, express_1.default)();
const commentController = typedi_1.default.get(CommentController_1.CommentController);
commentRouter.post("/", (req, res) => commentController.createComment(req, res));
commentRouter.get("/:id", (req, res) => commentController.getCommentById(req, res));
commentRouter.get("/", (req, res) => commentController.getAllComments(req, res));
commentRouter.put("/:id", (req, res) => commentController.updateComment(req, res));
commentRouter.delete("/:id", (req, res) => commentController.deleteComment(req, res));
commentRouter.get("/author/:authorId", (req, res) => commentController.findCommentsByAuthor(req, res));
commentRouter.get("/post/:postId", (req, res) => commentController.findCommentsByPost(req, res));
commentRouter.patch("/:id", (req, res) => commentController.updatePartialComment(req, res));
exports.default = commentRouter;
