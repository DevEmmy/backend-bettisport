import { Service } from "typedi";
import "reflect-metadata";
import { Request, Response } from "express";
import { PollService } from "../services/PollServices";
import { PollDto, UpdatePollDto, VoteDto } from "../dto/poll-dto";
import { error, success } from "../utils/response";

@Service()
export class PollController {
    constructor(
        private readonly service: PollService,
    ) { }

    async createPoll(req: Request, res: Response) {
        try {
            const body: PollDto = req.body;
            body.author = req.body.user
            const poll = await this.service.createPoll(body);
            return success(poll, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async getPollById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const poll = await this.service.getPollById(id);
            if (!poll) {
                return error("Poll not found", res, 404);
            }
            return success(poll, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async getAllPolls(req: Request, res: Response) {
        try {
            const polls = await this.service.getAllPolls();
            return success(polls, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async updatePoll(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const body: UpdatePollDto = req.body;
            const poll = await this.service.updatePoll(id, body);
            if (!poll) {
                return error("Poll not found", res, 404);
            }
            return success(poll, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async deletePoll(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await this.service.deletePoll(id);
            if (!result) {
                return error("Poll not found", res, 404);
            }
            return success({ message: "Poll deleted successfully" }, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async voteOnPoll(req: Request, res: Response) {
        try {
            const body: VoteDto = req.body;
            const poll = await this.service.voteOnPoll(body);
            return success(poll, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async findPollsByAuthor(req: Request, res: Response) {
        try {
            const { authorId } = req.params;
            const polls = await this.service.findPollsByAuthor(authorId);
            return success(polls, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async findPollsByQuestion(req: Request, res: Response) {
        try {
            const { query } = req.params;
            const polls = await this.service.findPollsByQuestion(query);
            return success(polls, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }
}
