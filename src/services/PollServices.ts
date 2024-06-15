import { Service } from "typedi";
import PollRepository from "../repositories/PollRepository";
import { PollDto, UpdatePollDto, VoteDto } from "../dto/poll-dto";
import "reflect-metadata";

@Service()
export class PollService {
    constructor(private readonly repo: PollRepository) { }

    async createPoll(data: PollDto) {
        try {
            const poll = await this.repo.create(data);
            return poll;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async getPollById(id: string) {
        try {
            const poll = await this.repo.findById(id);
            if (!poll) {
                return { message: "Poll not found" };
            }
            return poll;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async getAllPolls() {
        try {
            const polls = await this.repo.findAll();
            return polls;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async updatePoll(id: string, data: UpdatePollDto) {
        try {
            const poll = await this.repo.update(id, data);
            if (!poll) {
                return { message: "Poll not found" };
            }
            return poll;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async deletePoll(id: string) {
        try {
            const result = await this.repo.delete(id);
            if (!result) {
                return { message: "Poll not found" };
            }
            return { message: "Poll deleted successfully" };
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async voteOnPoll(data: VoteDto) {
        try {
            const { pollId, choiceIndex, userId } = data;
            const poll = await this.repo.vote(pollId, choiceIndex, userId);
            return poll;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async findPollsByAuthor(authorId: string) {
        try {
            const polls = await this.repo.findByAuthor(authorId);
            return polls;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async findPollsByQuestion(query: string) {
        try {
            const polls = await this.repo.findByQuestion(query);
            return polls;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
