import { Service } from "typedi";
import "reflect-metadata";
import Category from "../models/category";

@Service()
class CategoryRepository {
    constructor(
        private readonly model = Category,
    ){}

    async create(data: any) {
        const result = await new this.model(data).save();
        return result;
    }

    async findById(id: string) {
        const result = await this.model.findById(id);
        return result;
    }

    async findAll() {
        const result = await this.model.find();
        return result;
    }

    async update(id: string, data: any) {
        const result = await this.model.findByIdAndUpdate(id, data, { new: true });
        return result;
    }

    async delete(id: string) {
        const result = await this.model.findByIdAndDelete(id);
        return result;
    }

    async findBySlug(slug: string) {
        const result = await this.model.findOne({ slug });
        return result;
    }

    async findByParentCategory(parentCategory: string) {
        const result = await this.model.find({ parentCategory });
        return result;
    }

    async updatePartial(id: string, data: Partial<any>) {
        const result = await this.model.findByIdAndUpdate(id, { $set: data }, { new: true });
        return result;
    }
}

export default CategoryRepository;
