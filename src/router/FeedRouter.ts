// routes/FeedRouter.ts
import { Router } from "express";
import { Container } from "typedi";
import { FeedController } from "../controllers/FeedController";
import { verifyAuth } from "../middleware/verifyAuth";

const router = Router();
const feedController = Container.get(FeedController);

router.post("/",verifyAuth , (req, res) => feedController.create(req, res));
router.get("/:id" , verifyAuth,  (req, res) => feedController.getById(req, res));
router.get("/", verifyAuth, (req, res) => feedController.getAll(req, res));
router.put("/:id",verifyAuth,  (req, res) => feedController.updateById(req, res));
router.delete("/:id", verifyAuth, (req, res) => feedController.deleteById(req, res));

export default router;
