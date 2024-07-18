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
router.patch("/like/:postId", (req, res) => userController.likePost(req, res));
router.patch("/save/:postId", (req, res) => userController.savePost(req, res));
router.get("/likes-and-saved/:userId", (req, res) => userController.getLikedAndSaved(req, res));
router.get("/:role", (req, res) => userController.filterByRole(req, res));
router.get("/", (req, res) => userController.getAllUsers(req, res));
exports.default = router;
