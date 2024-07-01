"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const typedi_1 = require("typedi");
const CategoryRepository_1 = __importDefault(require("../repositories/CategoryRepository"));
require("reflect-metadata");
const slugify_1 = require("../utils/slugify");
let CategoryService = exports.CategoryService = class CategoryService {
    constructor(repo) {
        this.repo = repo;
    }
    createCategory(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                data.slug = (0, slugify_1.slugify)(data.title);
                const category = yield this.repo.create(data);
                return category;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield this.repo.findById(id);
                if (!category) {
                    return { message: "Category not found" };
                }
                return category;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this.repo.findAll();
                return categories;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    updateCategory(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield this.repo.update(id, data);
                if (!category) {
                    return { message: "Category not found" };
                }
                return category;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repo.delete(id);
                if (!result) {
                    return { message: "Category not found" };
                }
                return { message: "Category deleted successfully" };
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    findCategoryBySlug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield this.repo.findBySlug(slug);
                if (!category) {
                    return { message: "Category not found" };
                }
                return category;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    findCategoriesByParentCategory(parentCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this.repo.findByParentCategory(parentCategory);
                return categories;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    updatePartialCategory(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield this.repo.updatePartial(id, data);
                if (!category) {
                    return { message: "Category not found" };
                }
                return category;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
};
exports.CategoryService = CategoryService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [CategoryRepository_1.default])
], CategoryService);
