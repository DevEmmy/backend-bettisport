
import { Service } from "typedi";
import { FeedRepository } from "../repositories/FeedRepository";
import { IFeed } from "../models/feed";

@Service()
export class FeedService {
    constructor(private feedRepository: FeedRepository) {}

    async create(feed: IFeed): Promise<IFeed> {
        return this.feedRepository.create(feed);
    }

    async findById(id: string): Promise<IFeed | null> {
        return this.feedRepository.findById(id);
    }

    async findAll(): Promise<IFeed[]> {
        return this.feedRepository.findAll();
    }

    async updateById(id: string, feed: Partial<IFeed>): Promise<IFeed | null> {
        return this.feedRepository.updateById(id, feed);
    }

    async deleteById(id: string): Promise<IFeed | null> {
        return this.feedRepository.deleteById(id);
    }
}
