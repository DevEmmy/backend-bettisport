
import { Service } from "typedi";
import { FeedRepository } from "../repositories/FeedRepository";
import { IFeed } from "../models/feed";
import { uploader } from "../utils/uploader";

@Service()
export class FeedService {
    constructor(private feedRepository: FeedRepository) {}

    async create(feed: IFeed): Promise<IFeed> {
        try{
            if (feed.media) {
                feed.media = await uploader(feed.media as string);
            }
        }
        catch(err: any){
            return err
        }
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
