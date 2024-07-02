import { Service } from "typedi";
import NewsletterRepository from "../repositories/NewsletterRepository";

@Service()
class NewsletterService {
    constructor(private readonly repo: NewsletterRepository) {}

    async subscribe(email: string) {
        const existing = await this.repo.findByEmail(email);
        if (existing) {
            throw new Error("Email already subscribed");
        }
        return await this.repo.create(email);
    }

    async getAllSubscribers() {
        return await this.repo.findAll();
    }

    async unsubscribe(email: string) {
        const existing = await this.repo.findByEmail(email);
        if (!existing) {
            throw new Error("Email not found");
        }
        return await this.repo.deleteByEmail(email);
    }
}

export default NewsletterService;
