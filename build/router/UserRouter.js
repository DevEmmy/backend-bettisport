"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importDefault(require("typedi"));
const UserController_1 = require("../controllers/UserController");
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const userController = typedi_1.default.get(UserController_1.UserController);
router.post("/sign-in", (req, res) => userController.signIn(req, res));
router.post("/sign-up", (req, res) => userController.signUp(req, res));
// router.patch("/like/:postId", (req: Request, res: Response) => userController.likePost(req, res))
// router.patch("/save/:postId", (req: Request, res: Response) => userController.savePost(req, res))
// router.get("/likes-and-saved/:userId", (req: Request, res: Response) => userController.getLikedAndSaved(req, res))
// router.get("/:role", (req: Request, res: Response) => userController.filterByRole(req, res))
exports.default = router;
