"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importDefault(require("typedi"));
const PostController_1 = require("../controllers/PostController");
const express_1 = __importDefault(require("express"));
const verifyAuth_1 = require("../middleware/verifyAuth");
const postRouter = (0, express_1.default)();
const postController = typedi_1.default.get(PostController_1.PostController);
postRouter.post("/", verifyAuth_1.verifyAuth, (req, res) => postController.createPost(req, res));
postRouter.get("/:id", (req, res) => postController.getPostById(req, res));
postRouter.get("/read/:id", (req, res) => postController.readPost(req, res));
postRouter.patch("/like/:id", verifyAuth_1.verifyAuth, (req, res) => postController.likePost(req, res));
postRouter.get("/", (req, res) => postController.getAllPosts(req, res));
postRouter.get("/class/editors", (req, res) => postController.findPostsByEditorsPick(req, res));
postRouter.get("/class/trending", (req, res) => postController.findPostsByMostRead(req, res));
postRouter.get("/class/popular", (req, res) => postController.findPostsByMostInteracted(req, res));
postRouter.get("/class/news-breaking", (req, res) => postController.findPostsByNewsBreaking(req, res));
postRouter.get("/class/featured", (req, res) => postController.findPostsByFeatured(req, res));
postRouter.get("/class/articles", (req, res) => postController.findPostsByArticles(req, res));
postRouter.get("/class/photo-splash", (req, res) => postController.findPostsByPhotoSplash(req, res));
postRouter.get("/class/in-focus", (req, res) => postController.findPostsByInFocus(req, res));
postRouter.get("/class/fantasy", (req, res) => postController.findPostsByFantasy(req, res));
postRouter.put("/:id", (req, res) => postController.updatePost(req, res));
postRouter.delete("/:id", (req, res) => postController.deletePost(req, res));
postRouter.get("/author/:authorId", (req, res) => postController.findPostsByAuthor(req, res));
exports.default = postRouter;
