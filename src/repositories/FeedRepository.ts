// repositories/FeedRepository.ts
import { Service } from "typedi";
import Feed, { IFeed } from "../models/feed";

@Service()
export class FeedRepository {
    constructor(
        private readonly model = Feed,
    ){}

    async create(feed: IFeed): Promise<IFeed> {
        const newFeed = new this.model(feed);
        return await newFeed.save();
    }

    async findById(id: string): Promise<IFeed | null> {
        return await this.model.findById(id).populate('postedBy').populate('likes').exec();
    }

    async findAll(): Promise<IFeed[]> {
        return await this.model.find().populate('postedBy').populate('likes').exec();
    }

    async updateById(id: string, feed: Partial<IFeed>): Promise<IFeed | null> {
        return await this.model.findByIdAndUpdate(id, feed, { new: true }).exec();
    }

    async deleteById(id: string): Promise<IFeed | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
