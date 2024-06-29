import Container from "typedi";
import { UserController } from "../controllers/UserController";
import Router, { Request, Response } from "express";
const router = Router();

const userController = Container.get(UserController);
router.post("/sign-in", (req: Request, res:Response)=> userController.signIn(req, res))
router.post("/sign-up", (req: Request, res:Response)=> userController.signUp(req, res))
router.patch("/like/:postId", (req: Request, res: Response) => userController.likePost(req, res))
router.patch("/save/:postId", (req: Request, res: Response) => userController.savePost(req, res))
router.get("/likes-and-saved/:userId", (req: Request, res: Response) => userController.getLikedAndSaved(req, res))
router.get("/:role", (req: Request, res: Response) => userController.filterByRole(req, res))

export default router;