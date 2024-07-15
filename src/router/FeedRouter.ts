// routes/FeedRouter.ts
import { Router } from "express";
import { Container } from "typedi";
import { FeedController } from "../controllers/FeedController";

const router = Router();
const feedController = Container.get(FeedController);

router.post("/", (req, res) => feedController.create(req, res));
router.get("/:id", (req, res) => feedController.getById(req, res));
router.get("/", (req, res) => feedController.getAll(req, res));
router.put("/:id", (req, res) => feedController.updateById(req, res));
router.delete("/:id", (req, res) => feedController.deleteById(req, res));

export default router;
