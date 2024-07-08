import Container from "typedi";
import { CommentController } from "../controllers/CommentController";
import Router, { Request, Response } from "express";
import { verifyAuth } from "../middleware/verifyAuth";

const commentRouter = Router();
const commentController = Container.get(CommentController);

commentRouter.post("/", verifyAuth, (req: Request, res: Response) => commentController.createComment(req, res));
commentRouter.get("/:id", (req: Request, res: Response) => commentController.getCommentById(req, res));
commentRouter.get("/", (req: Request, res: Response) => commentController.getAllComments(req, res));
commentRouter.put("/:id", (req: Request, res: Response) => commentController.updateComment(req, res));
commentRouter.delete("/:id", (req: Request, res: Response) => commentController.deleteComment(req, res));
commentRouter.get("/author/:authorId", (req: Request, res: Response) => commentController.findCommentsByAuthor(req, res));
commentRouter.get("/post/:postId", (req: Request, res: Response) => commentController.findCommentsByPost(req, res));
commentRouter.patch("/:id", (req: Request, res: Response) => commentController.updatePartialComment(req, res));

export default commentRouter;
