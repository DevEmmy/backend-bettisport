"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importDefault(require("typedi"));
const PollController_1 = require("../controllers/PollController");
const express_1 = __importDefault(require("express"));
const verifyAuth_1 = require("../middleware/verifyAuth");
const pollRouter = (0, express_1.default)();
const pollController = typedi_1.default.get(PollController_1.PollController);
pollRouter.post("/", verifyAuth_1.verifyAuth, (req, res) => pollController.createPoll(req, res));
pollRouter.get("/:id", (req, res) => pollController.getPollById(req, res));
pollRouter.get("/", (req, res) => pollController.getAllPolls(req, res));
pollRouter.put("/:id", (req, res) => pollController.updatePoll(req, res));
pollRouter.delete("/:id", (req, res) => pollController.deletePoll(req, res));
pollRouter.post("/vote", (req, res) => pollController.voteOnPoll(req, res));
pollRouter.get("/author/:authorId", (req, res) => pollController.findPollsByAuthor(req, res));
pollRouter.get("/question/:query", (req, res) => pollController.findPollsByQuestion(req, res));
exports.default = pollRouter;
