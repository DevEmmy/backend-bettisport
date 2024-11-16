import Container from "typedi";
import { UserController } from "../controllers/UserController";
import Router, { Request, Response } from "express";
import { verifyAuth } from "../middleware/verifyAuth";
const router = Router();

const userController = Container.get(UserController);
router.post("/sign-in", (req: Request, res:Response)=> userController.signIn(req, res))
router.post("/sign-up", (req: Request, res:Response)=> userController.signUp(req, res))
router.patch("/like/:postId", verifyAuth, (req: Request, res: Response) => userController.likePost(req, res))
router.patch("/save/:postId", verifyAuth, (req: Request, res: Response) => userController.savePost(req, res))
router.get("/likes-and-saved/:userId", verifyAuth ,(req: Request, res: Response) => userController.getLikedAndSaved(req, res))
router.get("/:role", verifyAuth, (req: Request, res: Response) => userController.filterByRole(req, res))
router.get("/", verifyAuth, (req: Request, res: Response) => userController.getAllUsers(req, res))
router.get("/my-details",verifyAuth, (req: Request, res: Response) => userController.getUserDetails(req, res))
router.post("/",verifyAuth, (req: Request, res: Response) => userController.createUser(req, res))
router.patch("/forgotten-password", (req: Request, res: Response) => userController.forgottenPassword(req, res))
router.patch("/update-password", (req: Request, res: Response) => userController.resetPassword(req, res))
router.patch("/update-profile", verifyAuth, (req: Request, res: Response) => userController.updateProfile(req, res))

export default router;