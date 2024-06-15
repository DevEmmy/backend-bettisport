import Container from "typedi";
import { PostController } from "../controllers/PostController";
import Router, { Request, Response } from "express";

const postRouter = Router();
const postController = Container.get(PostController);

postRouter.post("/", (req: Request, res: Response) => postController.createPost(req, res));
postRouter.get("/:id", (req: Request, res: Response) => postController.getPostById(req, res));
postRouter.get("/", (req: Request, res: Response) => postController.getAllPosts(req, res));
postRouter.put("/:id", (req: Request, res: Response) => postController.updatePost(req, res));
postRouter.delete("/:id", (req: Request, res: Response) => postController.deletePost(req, res));
postRouter.get("/author/:authorId", (req: Request, res: Response) => postController.findPostsByAuthor(req, res));

export default postRouter;
