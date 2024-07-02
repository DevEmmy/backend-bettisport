import { Service } from "typedi";
import Newsletter, { INewsletter } from "../models/news-letter";

@Service()
class NewsletterRepository {
    private model = Newsletter;

    async create(email: string): Promise<INewsletter> {
        const newsletter = new this.model({ email });
        return await newsletter.save();
    }

    async findAll(): Promise<INewsletter[]> {
        return await this.model.find().exec();
    }

    async findByEmail(email: string): Promise<INewsletter | null> {
        return await this.model.findOne({ email }).exec();
    }

    async deleteByEmail(email: string): Promise<INewsletter | null> {
        return await this.model.findOneAndDelete({ email }).exec();
    }
}

export default NewsletterRepository;
