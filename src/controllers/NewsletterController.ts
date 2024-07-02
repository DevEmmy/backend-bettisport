import { Service } from "typedi";
import { Request, Response } from "express";
import NewsletterService from "../services/NewsletterServices";
import { success, error } from "../utils/response"; // Assuming you have these utility functions

@Service()
class NewsletterController {
    constructor(private readonly service: NewsletterService) {}

    async subscribe(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const subscriber = await this.service.subscribe(email);
            return success(subscriber, res);
        } catch (err: any) {
            return error(err.message, res, 400);
        }
    }

    async getAllSubscribers(req: Request, res: Response) {
        try {
            const subscribers = await this.service.getAllSubscribers();
            return success(subscribers, res);
        } catch (err: any) {
            return error(err.message, res, 400);
        }
    }

    async unsubscribe(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const result = await this.service.unsubscribe(email);
            return success(result, res);
        } catch (err: any) {
            return error(err.message, res, 400);
        }
    }
}

export default NewsletterController;
