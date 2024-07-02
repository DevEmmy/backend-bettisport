import { Router, Request, Response } from "express";
import Container from "typedi";
import NewsletterController from "../controllers/NewsletterController";

const router = Router();
const controller = Container.get(NewsletterController);

router.post("/subscribe", (req: Request, res: Response) => controller.subscribe(req, res));
router.get("/subscribers", (req: Request, res: Response) => controller.getAllSubscribers(req, res));
router.post("/unsubscribe", (req: Request, res: Response) => controller.unsubscribe(req, res));

export default router;
