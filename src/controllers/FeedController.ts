// controllers/FeedController.ts
import { Request, Response } from "express";
import { Service } from "typedi";
import { FeedService } from "../services/FeedServices";
import { IFeed } from "../models/feed";

@Service()
export class FeedController {
    constructor(private feedService: FeedService) {}

    async create(req: Request, res: Response): Promise<void> {
        try {
            const feed: IFeed = req.body;
            feed.postedBy = req.body.user
            const newFeed = await this.feedService.create(feed);
            res.status(201).json(newFeed);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const feed = await this.feedService.findById(req.params.id);
            if (!feed) {
                res.status(404).json({ error: "Feed not found" });
            } else {
                res.status(200).json(feed);
            }
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const feeds = await this.feedService.findAll();
            res.status(200).json(feeds);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateById(req: Request, res: Response): Promise<void> {
        try {
            const feed = await this.feedService.updateById(req.params.id, req.body);
            if (!feed) {
                res.status(404).json({ error: "Feed not found" });
            } else {
                res.status(200).json(feed);
            }
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteById(req: Request, res: Response): Promise<void> {
        try {
            const feed = await this.feedService.deleteById(req.params.id);
            if (!feed) {
                res.status(404).json({ error: "Feed not found" });
            } else {
                res.status(204).json();
            }
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
