import { Service } from "typedi";
import "reflect-metadata";
import mongoose from "mongoose";
import Poll from "../models/poll";

@Service()
class PollRepository {
    constructor(
        private readonly model = Poll,
    ){}

    async create(data: any) {
        const result = await new this.model(data).save();
        return result;
    }

    async findById(id: string) {
        const objectId = new mongoose.Types.ObjectId(id);
        const result = await this.model.findById(objectId).populate('author choices.voters');
        return result;
    }

    async findAll() {
        const result = await this.model.find().populate('author');
        return result;
    }

    async update(id: string, data: any) {
        const objectId = new mongoose.Types.ObjectId(id);
        const result = await this.model.findByIdAndUpdate(objectId, data, { new: true });
        return result;
    }

    async delete(id: string) {
        const objectId = new mongoose.Types.ObjectId(id);
        const result = await this.model.findByIdAndDelete(objectId);
        return result;
    }

    async vote(pollId: string, choiceIndex: number, userId: string) {
        const pollObjectId = new mongoose.Types.ObjectId(pollId);
        const userObjectId = new mongoose.Types.ObjectId(userId);

        const poll = await this.model.findById(pollObjectId);
        if (!poll) throw new Error("Poll not found");

        const choice = poll.choices[choiceIndex];
        if (!choice) throw new Error("Choice not found");

        if (choice.voters.some((voterId: mongoose.Types.ObjectId) => voterId.equals(userObjectId))) {
            throw new Error("User has already voted for this choice");
        }

        choice.votes += 1;
        choice.voters.push(userObjectId);

        await poll.save();
        return poll;
    }

    async findByAuthor(authorId: string) {
        const authorObjectId = new mongoose.Types.ObjectId(authorId);
        const result = await this.model.find({ author: authorObjectId });
        return result;
    }

    async findByQuestion(query: string) {
        const regex = new RegExp(query, 'i'); // Case-insensitive regex
        const result = await this.model.find({ question: regex });
        return result;
    }
}

export default PollRepository;
