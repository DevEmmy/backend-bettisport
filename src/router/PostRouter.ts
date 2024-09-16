import Container from "typedi";
import { PostController } from "../controllers/PostController";
import Router, { Request, Response } from "express";
import { verifyAuth } from "../middleware/verifyAuth";

const postRouter = Router();
const postController = Container.get(PostController);

postRouter.post("/", verifyAuth ,(req: Request, res: Response) => postController.createPost(req, res));
postRouter.get("/:id", (req: Request, res: Response) => postController.getPostById(req, res));
postRouter.get("/read/:id", (req: Request, res: Response) => postController.readPost(req, res));
postRouter.patch("/like/:id", verifyAuth ,(req: Request, res: Response) => postController.likePost(req, res));
postRouter.patch("/save/:id", verifyAuth ,(req: Request, res: Response) => postController.savePost(req, res));
postRouter.get("/", (req: Request, res: Response) => postController.getAllPosts(req, res));
postRouter.get("/class/editors", (req: Request, res: Response) => postController.findPostsByEditorsPick(req, res));
postRouter.get("/format/:format", (req: Request, res: Response) => postController.findPostsByFormat(req, res));
postRouter.get("/class/trending", (req: Request, res: Response) => postController.findPostsByMostRead(req, res));
postRouter.get("/class/popular", (req: Request, res: Response) => postController.findPostsByMostInteracted(req, res));
postRouter.get("/class/news-breaking", (req: Request, res: Response) => postController.findPostsByNewsBreaking(req, res));
postRouter.get("/class/featured", (req: Request, res: Response) => postController.findPostsByFeatured(req, res));
postRouter.get("/class/articles", (req: Request, res: Response) => postController.findPostsByArticles(req, res));
postRouter.get("/class/photo-splash", (req: Request, res: Response) => postController.findPostsByPhotoSplash(req, res));
postRouter.get("/class/in-focus", (req: Request, res: Response) => postController.findPostsByInFocus(req, res));
postRouter.get("/class/fantasy", (req: Request, res: Response) => postController.findPostsByFantasy(req, res));
postRouter.put("/:id", (req: Request, res: Response) => postController.updatePost(req, res));
postRouter.delete("/:id", (req: Request, res: Response) => postController.deletePost(req, res));
postRouter.get("/author/:authorId", (req: Request, res: Response) => postController.findPostsByAuthor(req, res));


export default postRouter;