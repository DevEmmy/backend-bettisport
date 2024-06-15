import { Service } from "typedi";
import CategoryRepository from "../repositories/CategoryRepository";
import { CategoryDto, UpdateCategoryDto } from "../dto/category-dto";
import "reflect-metadata";

@Service()
export class CategoryService {
    constructor(private readonly repo: CategoryRepository) { }

    async createCategory(data: CategoryDto) {
        try {
            const category = await this.repo.create(data);
            return category;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async getCategoryById(id: string) {
        try {
            const category = await this.repo.findById(id);
            if (!category) {
                return { message: "Category not found" };
            }
            return category;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async getAllCategories() {
        try {
            const categories = await this.repo.findAll();
            return categories;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async updateCategory(id: string, data: UpdateCategoryDto) {
        try {
            const category = await this.repo.update(id, data);
            if (!category) {
                return { message: "Category not found" };
            }
            return category;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async deleteCategory(id: string) {
        try {
            const result = await this.repo.delete(id);
            if (!result) {
                return { message: "Category not found" };
            }
            return { message: "Category deleted successfully" };
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async findCategoryBySlug(slug: string) {
        try {
            const category = await this.repo.findBySlug(slug);
            if (!category) {
                return { message: "Category not found" };
            }
            return category;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async findCategoriesByParentCategory(parentCategory: string) {
        try {
            const categories = await this.repo.findByParentCategory(parentCategory);
            return categories;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async updatePartialCategory(id: string, data: Partial<UpdateCategoryDto>) {
        try {
            const category = await this.repo.updatePartial(id, data);
            if (!category) {
                return { message: "Category not found" };
            }
            return category;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
