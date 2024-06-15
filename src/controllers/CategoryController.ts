import { Service } from "typedi";
import "reflect-metadata";
import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryServices";
import { CategoryDto, UpdateCategoryDto } from "../dto/category-dto";
import { error, success } from "../utils/response";

@Service()
export class CategoryController {
    constructor(
        private readonly service: CategoryService,
    ) { }

    async createCategory(req: Request, res: Response) {
        try {
            const body: CategoryDto = req.body;
            const category = await this.service.createCategory(body);
            return success(category, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async getCategoryById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const category = await this.service.getCategoryById(id);
            if (!category) {
                return error("Category not found", res, 404);
            }
            return success(category, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async getAllCategories(req: Request, res: Response) {
        try {
            const categories = await this.service.getAllCategories();
            return success(categories, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async updateCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const body: UpdateCategoryDto = req.body;
            const category = await this.service.updateCategory(id, body);
            if (!category) {
                return error("Category not found", res, 404);
            }
            return success(category, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async deleteCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await this.service.deleteCategory(id);
            if (!result) {
                return error("Category not found", res, 404);
            }
            return success({ message: "Category deleted successfully" }, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async findCategoryBySlug(req: Request, res: Response) {
        try {
            const { slug } = req.params;
            const category = await this.service.findCategoryBySlug(slug);
            if (!category) {
                return error("Category not found", res, 404);
            }
            return success(category, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async findCategoriesByParentCategory(req: Request, res: Response) {
        try {
            const { parentCategory } = req.params;
            const categories = await this.service.findCategoriesByParentCategory(parentCategory);
            return success(categories, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }

    async updatePartialCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const body: Partial<UpdateCategoryDto> = req.body;
            const category = await this.service.updatePartialCategory(id, body);
            if (!category) {
                return error("Category not found", res, 404);
            }
            return success(category, res);
        } catch (err: any) {
            error(err.message, res, err.status || 400);
        }
    }
}
