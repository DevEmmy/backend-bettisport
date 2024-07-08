import Container from "typedi";
import { PollController } from "../controllers/PollController";
import Router, { Request, Response } from "express";
import { verifyAuth } from "../middleware/verifyAuth";

const pollRouter = Router();
const pollController = Container.get(PollController);

pollRouter.post("/", verifyAuth, (req: Request, res: Response) => pollController.createPoll(req, res));
pollRouter.get("/:id", (req: Request, res: Response) => pollController.getPollById(req, res));
pollRouter.get("/", (req: Request, res: Response) => pollController.getAllPolls(req, res));
pollRouter.put("/:id", (req: Request, res: Response) => pollController.updatePoll(req, res));
pollRouter.delete("/:id", (req: Request, res: Response) => pollController.deletePoll(req, res));
pollRouter.post("/vote", (req: Request, res: Response) => pollController.voteOnPoll(req, res));
pollRouter.get("/author/:authorId", (req: Request, res: Response) => pollController.findPollsByAuthor(req, res));
pollRouter.get("/question/:query", (req: Request, res: Response) => pollController.findPollsByQuestion(req, res));

export default pollRouter;